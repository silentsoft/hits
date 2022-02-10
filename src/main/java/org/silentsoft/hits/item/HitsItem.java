package org.silentsoft.hits.item;

import lombok.Getter;
import org.silentsoft.hits.utils.ColorUtils;
import org.springframework.web.context.request.async.DeferredResult;

@Getter
public class HitsItem {

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

    public HitsItem(DeferredResult<String> deferredResult, String urn, String view, String style, String label, String color, String labelColor, String[] links, String logo, int logoWidth, Long extraCount) {
        if (logo != null && logo.length() > 0) {
            logo = logo.replaceAll(" ", "+");
        }

        color = ColorUtils.adjust(color, "#4c1");
        labelColor = ColorUtils.adjust(labelColor, "#555");

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
