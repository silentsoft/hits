package org.silentsoft.hits.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UniformedResourceNameUtilsTest {

    @Test
    public void normalizeTest() {
        Assertions.assertEquals("", UniformedResourceNameUtils.normalize(null));
        Assertions.assertEquals("", UniformedResourceNameUtils.normalize(""));
        Assertions.assertEquals("", UniformedResourceNameUtils.normalize("/"));
        Assertions.assertEquals("", UniformedResourceNameUtils.normalize("http:/"));
        Assertions.assertEquals("", UniformedResourceNameUtils.normalize("http://"));

        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("", "github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("/", "/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("/test", "/test/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("/test/", "/test/github.com/silentsoft/hits"));

        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits/"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("/github.com/silentsoft/hits/"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits?"));
        Assertions.assertEquals("github.com/silentsoft/hits?a=b", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits?a=b"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits#"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("github.com/silentsoft/hits#readme"));

        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("http:/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("http://github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https:/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits"));

        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits########"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits????####"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits??//####"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits#?//####"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits????????"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits////////"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits//??//??"));
        Assertions.assertEquals("github.com/silentsoft/hits", UniformedResourceNameUtils.normalize("https://github.com/silentsoft/hits??//??//"));

        Assertions.assertEquals("???????????????.com/????????????", UniformedResourceNameUtils.normalize("https://???????????????.com/????????????"));
        Assertions.assertEquals("???????????????.com/????????????", UniformedResourceNameUtils.normalize("https://???????????????.com/????????????/"));
        Assertions.assertEquals("???????????????.com/????????????", UniformedResourceNameUtils.normalize("https://???????????????.com/????????????#"));
        Assertions.assertEquals("???????????????.com/????????????", UniformedResourceNameUtils.normalize("https://???????????????.com/?????????????"));
        Assertions.assertEquals("???????????????.com/?????????????a=b", UniformedResourceNameUtils.normalize("https://???????????????.com/?????????????a=b"));
    }

    @Test
    public void hostTest() {
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits/"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("/github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("/github.com/silentsoft/hits/"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits?"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits?a=b"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits#"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("github.com/silentsoft/hits#readme"));

        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("http://github.com/silentsoft/hits"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits"));

        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits########"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits????####"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits??//####"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits#?//####"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits????????"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits////////"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits//??//??"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com/silentsoft/hits??//??//"));

        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com?a=b"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com#read"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com#read?a=b"));
        Assertions.assertEquals("github.com", UniformedResourceNameUtils.getHost("https://github.com?a=b#read"));

        Assertions.assertEquals("???????????????.com", UniformedResourceNameUtils.getHost("https://???????????????.com/????????????"));
        Assertions.assertEquals("???????????????.com", UniformedResourceNameUtils.getHost("https://???????????????.com/????????????/"));
        Assertions.assertEquals("???????????????.com", UniformedResourceNameUtils.getHost("https://???????????????.com/????????????#"));
        Assertions.assertEquals("???????????????.com", UniformedResourceNameUtils.getHost("https://???????????????.com/?????????????"));
        Assertions.assertEquals("???????????????.com", UniformedResourceNameUtils.getHost("https://???????????????.com/?????????????a=b"));
    }

}
