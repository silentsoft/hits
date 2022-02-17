package org.silentsoft.hits.utils;

import org.silentsoft.badge4j.Brightness;
import org.silentsoft.badge4j.NamedColor;
import org.silentsoft.badge4j.NamedColorAlias;
import org.silentsoft.csscolor4j.Color;

public class ColorUtils {

    public static String adjust(String color, String defaultValue) {
        if (color == null) {
            return defaultValue;
        }

        try {
            color = color.trim();
            if (NamedColor.nameOf(color) != null || NamedColorAlias.nameOf(color) != null || org.silentsoft.csscolor4j.NamedColor.nameOf(color) != null) {
                return color;
            }
            Brightness.of(Color.valueOf(color));
            return color;
        } catch (Throwable e) {
            return defaultValue;
        }
    }

}
