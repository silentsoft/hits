package org.silentsoft.hits.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ColorUtilsTest {

    @Test
    public void adjustTest() {
        Assertions.assertEquals("#fff", ColorUtils.adjust(null, "#fff"));
        Assertions.assertEquals("#fff", ColorUtils.adjust("", "#fff"));
        Assertions.assertEquals("4c1", ColorUtils.adjust("4c1", "#fff"));
        Assertions.assertEquals("#4c1", ColorUtils.adjust("#4c1", "#fff"));
        Assertions.assertEquals("rgb(25,25,25)", ColorUtils.adjust("rgb(25,25,25)", "#fff"));
        Assertions.assertEquals("rgb(25, 25, 25)", ColorUtils.adjust("rgb(25, 25, 25)", "#fff"));
    }

}
