package org.silentsoft.hits.controller;

import org.silentsoft.badge4j.Badge;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {

    @RequestMapping(value = "/error", produces = "image/svg+xml;charset=UTF-8")
    @ResponseBody
    public String error(HttpServletRequest request) {
        String errorContent;
        try {
            int statusCode = Integer.valueOf(String.valueOf(request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE)));
            String message = HttpStatus.valueOf(statusCode).getReasonPhrase();
            if (shouldShowStatusCode(statusCode)) {
                errorContent = Badge.builder().label(String.valueOf(statusCode)).message(message).color("inactive").build();
            } else {
                errorContent = Badge.builder().label("hits").message(message).color("inactive").build();
            }
        } catch (Throwable e) {
            errorContent = Badge.builder().label("hits").message(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase()).color("inactive").build();
        }
        return errorContent;
    }

    private boolean shouldShowStatusCode(int statusCode) {
        if (statusCode == HttpStatus.NOT_FOUND.value()) {
            return true;
        }

        return false;
    }

}
