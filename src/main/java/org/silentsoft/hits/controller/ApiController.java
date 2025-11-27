package org.silentsoft.hits.controller;

import org.silentsoft.hits.entity.HitsUrnsEntity;
import org.silentsoft.hits.entity.HitsUrnsStatisticsEntity;
import org.silentsoft.hits.repository.HitsUrnsRepository;
import org.silentsoft.hits.repository.HitsUrnsStatisticsRepository;
import org.silentsoft.hits.utils.UniformedResourceNameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;

@Controller
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private HitsUrnsRepository hitsUrnsRepository;

    @Autowired
    private HitsUrnsStatisticsRepository hitsUrnsStatisticsRepository;

    private volatile Map<String, Long> cachedGlobalStats = new HashMap<>();

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateGlobalStats() {
        try {
            long totalBadges = hitsUrnsRepository.count();
            Long totalHits = hitsUrnsStatisticsRepository.getTotalHits();

            Map<String, Long> stats = new HashMap<>();
            stats.put("totalBadges", totalBadges);
            stats.put("totalHits", totalHits != null ? totalHits : 0L);

            cachedGlobalStats = stats;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/stats/global", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public ResponseEntity<Map<String, Long>> getGlobalStats() {
        if (cachedGlobalStats.isEmpty()) {
            updateGlobalStats();
        }
        return ResponseEntity.ok(cachedGlobalStats);
    }

    @RequestMapping(value = "/urns/**/*", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public ResponseEntity<Object> getUrnsStatistics(HttpServletRequest request) throws Exception {
        String uri = URLDecoder.decode(String.valueOf(request.getAttribute(UrlPathHelper.PATH_ATTRIBUTE)),
                StandardCharsets.UTF_8.name()).substring("/api/urns/".length());
        String urn = UniformedResourceNameUtils.normalize(uri);
        if (uri.equals(urn)) {
            if (urn.length() == 0 || urn.contains(".") == false) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else if (urn.length() > 250) {
                return ResponseEntity.status(HttpStatus.URI_TOO_LONG).build();
            } else {
                HitsUrnsEntity urnsEntity = hitsUrnsRepository.findByUrn(urn);
                if (urnsEntity == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                } else {
                    List<HitsUrnsStatisticsEntity> entities = hitsUrnsStatisticsRepository
                            .findById_UrnIdOrderById_DateDesc(urnsEntity.getUrnId());
                    if (entities.size() == 0) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    } else {
                        Map<String, Object> result = new HashMap<>();
                        result.put("total", entities.stream().mapToLong(HitsUrnsStatisticsEntity::getCount).sum());
                        result.put("monthly",
                                entities.stream()
                                        .filter(entity -> entity.getId().getDate().toLocalDate()
                                                .isAfter(LocalDate.now().minusMonths(1)))
                                        .mapToLong(HitsUrnsStatisticsEntity::getCount).sum());
                        result.put("weekly",
                                entities.stream()
                                        .filter(entity -> entity.getId().getDate().toLocalDate()
                                                .isAfter(LocalDate.now().minusWeeks(1)))
                                        .mapToLong(HitsUrnsStatisticsEntity::getCount).sum());
                        Map<String, List<HitsUrnsStatisticsEntity>> yearlyMap = new HashMap<>();
                        for (HitsUrnsStatisticsEntity entity : entities) {
                            String year = entity.getId().getDate().toString().substring(0, 4);
                            if (yearlyMap.containsKey(year)) {
                                yearlyMap.get(year).add(entity);
                            } else {
                                List<HitsUrnsStatisticsEntity> list = new ArrayList<>();
                                list.add(entity);
                                yearlyMap.put(year, list);
                            }
                        }

                        List<Map<String, Object>> items = new ArrayList<>();
                        for (Map.Entry<String, List<HitsUrnsStatisticsEntity>> entry : yearlyMap.entrySet()) {
                            Map<String, Object> item = new HashMap<>();
                            String from = entry.getValue().stream()
                                    .min(Comparator.comparing(value -> value.getId().getDate())).get().getId().getDate()
                                    .toString();
                            String to = entry.getValue().stream()
                                    .max(Comparator.comparing(value -> value.getId().getDate())).get().getId().getDate()
                                    .toString();
                            List<Map<String, Object>> data = new ArrayList<>();
                            for (HitsUrnsStatisticsEntity entity : entry.getValue()) {
                                Map<String, Object> map = new HashMap<>();
                                map.put("value", entity.getCount());
                                map.put("day", entity.getId().getDate().toString());
                                data.add(map);
                            }
                            item.put("from", from);
                            item.put("to", to);
                            item.put("data", data);
                            items.add(item);
                        }
                        result.put("items", items);

                        return ResponseEntity.ok(result);
                    }
                }
            }
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/urns/".concat(urn)));
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY).headers(headers).build();
    }

}
