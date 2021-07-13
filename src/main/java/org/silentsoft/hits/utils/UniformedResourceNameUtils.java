package org.silentsoft.hits.utils;

public class UniformedResourceNameUtils {

    public static String normalize(String uri) {
        return normalize(null, uri);
    }

    public static String normalize(String except, String uri) {
        if (uri == null || "".equals(uri)) {
            return "";
        }

        uri = uri.trim();

        if (except != null) {
            uri = uri.substring(except.length());
        }

        if (uri.contains("://")) {
            uri = uri.substring(uri.indexOf("://") + "://".length());
        }

        if (uri.contains("#")) {
            uri = uri.substring(0, uri.indexOf("#"));
        }

        uri = uri.replaceAll("\\\\", "/");
        while (uri.startsWith("/")) {
            uri = uri.substring(1);
        }

        while (uri.endsWith("/") || uri.endsWith("?")) {
            if (uri.endsWith("/")) {
                uri = uri.substring(0, uri.lastIndexOf("/"));
            }

            if (uri.endsWith("?")) {
                uri = uri.substring(0, uri.lastIndexOf("?"));
            }
        }

        return uri;
    }

    public static String getHost(String uri) {
        uri = normalize(uri);

        if (uri.contains("/")) {
            uri = uri.substring(0, uri.indexOf("/"));
        }

        if (uri.contains("#")) {
            uri = uri.substring(0, uri.indexOf("#"));
        }

        if (uri.contains("?")) {
            uri = uri.substring(0, uri.indexOf("?"));
        }

        return uri;
    }

}
