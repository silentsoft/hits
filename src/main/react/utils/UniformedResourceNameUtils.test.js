/*
source : src/test/java/org/silentsoft/hits/utils/UniformedResourceNameUtilsTest.java
 */
import {normalize} from "./UniformedResourceNameUtils";

test("normalize", () => {
    expect(normalize(null)).toBe("");
    expect(normalize(undefined)).toBe("");
    expect(normalize("")).toBe("");
    expect(normalize("/")).toBe("");
    expect(normalize("http:/")).toBe("");
    expect(normalize("http://")).toBe("");

    expect(normalize("github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");
    expect(normalize("github.com/silentsoft/hits/")).toBe("github.com/silentsoft/hits");
    expect(normalize("/github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");
    expect(normalize("/github.com/silentsoft/hits/")).toBe("github.com/silentsoft/hits");
    expect(normalize("github.com/silentsoft/hits?")).toBe("github.com/silentsoft/hits");
    expect(normalize("github.com/silentsoft/hits?a=b")).toBe("github.com/silentsoft/hits?a=b");
    expect(normalize("github.com/silentsoft/hits#")).toBe("github.com/silentsoft/hits");
    expect(normalize("github.com/silentsoft/hits#readme")).toBe("github.com/silentsoft/hits");

    expect(normalize("http:/github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");
    expect(normalize("http://github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");
    expect(normalize("https:/github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits")).toBe("github.com/silentsoft/hits");

    expect(normalize("https://github.com/silentsoft/hits########")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits????####")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits??//####")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits#?//####")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits????????")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits////////")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits//??//??")).toBe("github.com/silentsoft/hits");
    expect(normalize("https://github.com/silentsoft/hits??//??//")).toBe("github.com/silentsoft/hits");

    expect(normalize("https://한글도메인.com/가나다라")).toBe("한글도메인.com/가나다라");
    expect(normalize("https://한글도메인.com/가나다라/")).toBe("한글도메인.com/가나다라");
    expect(normalize("https://한글도메인.com/가나다라#")).toBe("한글도메인.com/가나다라");
    expect(normalize("https://한글도메인.com/가나다라?")).toBe("한글도메인.com/가나다라");
    expect(normalize("https://한글도메인.com/가나다라?a=b")).toBe("한글도메인.com/가나다라?a=b");
});