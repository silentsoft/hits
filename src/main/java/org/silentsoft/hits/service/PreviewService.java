package org.silentsoft.hits.service;

import org.silentsoft.badge4j.Badge;
import org.silentsoft.badge4j.Style;
import org.silentsoft.hits.item.HitsItem;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;

@Service
public class PreviewService {

    public String preview(HitsItem item) {
        String urn = item.getUrn();
        String view = item.getView();
        String style = item.getStyle();
        String label = item.getLabel();
        String color = item.getColor();
        String labelColor = item.getLabelColor();
        String[] links = item.getLinks();
        String logo = item.getLogo();
        int logoWidth = item.getLogoWidth();
        Long extraCount = item.getExtraCount();

        long todayCount = 1;
        long totalCount = 1;
        if (extraCount != null) {
            totalCount += extraCount;
        }

        String message;
        if ("today-total".equalsIgnoreCase(view)) {
            message = String.format("%s / %s", NumberFormat.getInstance().format(todayCount), NumberFormat.getInstance().format(totalCount));
        } else {
            message = NumberFormat.getInstance().format(totalCount);
        }

        return Badge.builder().style(Style.nameOf(style)).label(label).message(message).color(color).labelColor(labelColor).links(links).logo(logo).logoWidth(logoWidth).build();
    }

}
