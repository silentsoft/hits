/*
source : src/main/java/org/silentsoft/hits/utils/UniformedResourceNameUtils.java
 */
export const normalize = (uri) => {
    if (uri == null || uri.length === 0) {
        return "";
    }

    uri = uri.trim();

    if (uri.includes(":/")) {
        uri = uri.substring(uri.indexOf(":/") + ":/".length);
    }

    if (uri.includes("#")) {
        uri = uri.substring(0, uri.indexOf("#"));
    }

    uri = uri.replace("\\\\", "/");
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
