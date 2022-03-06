import Utils from "./Utils";

test("toQueryString", () => {
    expect(Utils.toQueryString(null)).toBe("");
    expect(Utils.toQueryString(undefined)).toBe("");
    expect(Utils.toQueryString({})).toBe("");
    expect(Utils.toQueryString({foo: "bar"})).toBe("");

    expect(Utils.toQueryString({view: "today-total"})).toBe("?view=today-total");
    expect(Utils.toQueryString({style: "flat-square"})).toBe("?style=flat-square");
    expect(Utils.toQueryString({label: "foo"})).toBe("?label=foo");
    expect(Utils.toQueryString({extraCount: 1000})).toBe("?extraCount=1000");
    expect(Utils.toQueryString({color: "black"})).toBe("?color=black");
    expect(Utils.toQueryString({color: "123"})).toBe("?color=123");
    expect(Utils.toQueryString({color: "#123"})).toBe("?color=123");
    expect(Utils.toQueryString({color: "123456"})).toBe("?color=123456");
    expect(Utils.toQueryString({color: "#123456"})).toBe("?color=123456");
    expect(Utils.toQueryString({labelColor: "black"})).toBe("?labelColor=black");
    expect(Utils.toQueryString({labelColor: "123"})).toBe("?labelColor=123");
    expect(Utils.toQueryString({labelColor: "#123"})).toBe("?labelColor=123");
    expect(Utils.toQueryString({labelColor: "123456"})).toBe("?labelColor=123456");
    expect(Utils.toQueryString({labelColor: "#123456"})).toBe("?labelColor=123456");
    expect(Utils.toQueryString({link: "https://hits.sh"})).toBe("?link=https%3A%2F%2Fhits.sh");
    expect(Utils.toQueryString({link: ["https://hits.sh", "https://hits.sh"]})).toBe("?link=https%3A%2F%2Fhits.sh&link=https%3A%2F%2Fhits.sh");
    expect(Utils.toQueryString({logo: "logo"})).toBe("?logo=logo");
    expect(Utils.toQueryString({logoWidth: 48})).toBe("?logoWidth=48");
    expect(Utils.toQueryString({
        view: "today-total",
        style: "flat-square",
        label: "foo",
        extraCount: 1000,
        color: "black",
        labelColor: "black",
        link: "https://hits.sh",
        logo: "logo",
        logoWidth: 48
    })).toBe("?view=today-total&style=flat-square&label=foo&extraCount=1000&color=black&labelColor=black&link=https%3A%2F%2Fhits.sh&logo=logo&logoWidth=48");
});

test("toQueryString with default value", () => {
    expect(Utils.toQueryString({view: "total"})).toBe("");
    expect(Utils.toQueryString({style: "flat"})).toBe("");
    expect(Utils.toQueryString({label: "hits"})).toBe("");
    expect(Utils.toQueryString({color: "4c1"})).toBe("");
    expect(Utils.toQueryString({color: "#4c1"})).toBe("");
    expect(Utils.toQueryString({color: "44cc11"})).toBe("");
    expect(Utils.toQueryString({color: "#44cc11"})).toBe("");
    expect(Utils.toQueryString({color: "brightgreen"})).toBe("");
    expect(Utils.toQueryString({labelColor: "555"})).toBe("");
    expect(Utils.toQueryString({labelColor: "#555"})).toBe("");
    expect(Utils.toQueryString({labelColor: "555555"})).toBe("");
    expect(Utils.toQueryString({labelColor: "#555555"})).toBe("");
    expect(Utils.toQueryString({labelColor: "grey"})).toBe("");
    expect(Utils.toQueryString({labelColor: "gray"})).toBe("");
});