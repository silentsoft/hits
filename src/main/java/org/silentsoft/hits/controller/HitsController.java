package org.silentsoft.hits.controller;

import org.silentsoft.badge4j.Badge;
import org.silentsoft.hits.service.HitsService;
import org.silentsoft.hits.utils.UniformedResourceNameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.util.UrlPathHelper;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

@Controller
public class HitsController {

    @Autowired
    private HitsService hitsService;

    private LinkedBlockingQueue<Item> queue = new LinkedBlockingQueue<>();

    class Item {
        DeferredResult<String> deferredResult;
        String urn;
        String view;
        String style;
        String label;
        String color;
        String labelColor;
        String[] links;
        String logo;
        int logoWidth;
        Long extraCount;

        public Item(DeferredResult<String> deferredResult, String urn, String view, String style, String label, String color, String labelColor, String[] links, String logo, int logoWidth, Long extraCount) {
            this.deferredResult = deferredResult;
            this.urn = urn;
            this.view = view;
            this.style = style;
            this.label = label;
            this.color = color;
            this.labelColor = labelColor;
            this.links = links;
            this.logo = logo;
            this.logoWidth = logoWidth;
            this.extraCount = extraCount;
        }
    }

    @PostConstruct
    public void postConstruct() {
        Thread thread = new Thread(() -> {
            boolean keepAlive = true;
            while (keepAlive) {
                try {
                    Item item = queue.take();
                    hits(item.deferredResult, item.urn, item.view, item.style, item.label, item.color, item.labelColor, item.links, item.logo, item.logoWidth, item.extraCount);
                } catch (InterruptedException e) {
                    keepAlive = false;
                }
            }
        });
        thread.setName("Hits Queue Worker Thread");
        thread.start();
    }

    public void hits(DeferredResult<String> deferredResult, String urn, String view, String style, String label, String color, String labelColor, String[] links, String logo, int logoWidth, Long extraCountFromRequestParam) {
        try {
            deferredResult.setResult(hitsService.hits(urn, view, style, label, color, labelColor, links, logo, logoWidth, extraCountFromRequestParam));
        } catch (Throwable e) {
            sendError(deferredResult, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/**/*.svg", method = RequestMethod.GET, produces = "image/svg+xml;charset=UTF-8")
    @ResponseBody
    public DeferredResult<String> hits(HttpServletRequest request,
                                       @RequestParam(name = "view", required = false, defaultValue = "total") String view,
                                       @RequestParam(name = "style", required = false, defaultValue = "flat") String style,
                                       @RequestParam(name = "label", required = false, defaultValue = "hits") String label,
                                       @RequestParam(name = "color", required = false, defaultValue = "#4c1") String color,
                                       @RequestParam(name = "labelColor", required = false, defaultValue = "#555") String labelColor,
                                       @RequestParam(name = "link", required = false) String[] links,
                                       @RequestParam(name = "logo", required = false) String logo,
                                       @RequestParam(name = "logoWidth", required = false, defaultValue = "0") Integer logoWidth,
                                       @RequestParam(name = "extraCount", required = false) Long extraCount,
                                       HttpServletResponse response) throws Exception {
        final DeferredResult<String> deferredResult = new DeferredResult<>(TimeUnit.SECONDS.toMillis(10));
        deferredResult.onTimeout(() -> {
            sendError(deferredResult, HttpStatus.INTERNAL_SERVER_ERROR);
        });
        deferredResult.onError(throwable -> {
            sendError(deferredResult, HttpStatus.SERVICE_UNAVAILABLE);
        });

        String uri = URLDecoder.decode(String.valueOf(request.getAttribute(UrlPathHelper.PATH_ATTRIBUTE)), StandardCharsets.UTF_8.name());
        String urn = UniformedResourceNameUtils.normalize(uri.substring(0, uri.lastIndexOf(".svg")));
        String expectedUri = String.format("/%s.svg", urn);
        if (expectedUri.equals(uri)) {
            if (urn.length() == 0 || urn.contains(".") == false) {
                sendError(deferredResult, HttpStatus.BAD_REQUEST, "Not a valid URI");
            } else if (urn.length() > 250) {
                sendError(deferredResult, HttpStatus.URI_TOO_LONG);
            } else {
                response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
                response.setDateHeader("Expires", 0);

                queue.put(new Item(deferredResult, urn, view, style, label, color, labelColor, links, logo, logoWidth, extraCount));
            }
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(expectedUri));
            deferredResult.setErrorResult(new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY));
        }

        return deferredResult;
    }

    private void sendError(DeferredResult<String> deferredResult, HttpStatus httpStatus) {
        sendError(deferredResult, httpStatus, httpStatus.getReasonPhrase());
    }

    private void sendError(DeferredResult<String> deferredResult, HttpStatus httpStatus, String message) {
        deferredResult.setErrorResult(ResponseEntity.status(httpStatus).body(Badge.builder().label("hits").message(message).color("inactive").build()));
    }

}
