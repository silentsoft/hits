export default class Utils {
    static toQueryString(object) {
        let queryString = "";

        const defaultViewType = "total";
        const defaultStyle = "flat";
        const defaultLabel = "hits";
        const defaultColors = ["4c1", "#4c1", "44cc11", "#44cc11", "brightgreen"];
        const defaultLabelColors = ["555", "#555", "555555", "#555555", "grey", "gray"];

        const view = object.view?.trim();
        if (view && view.length > 0 && view !== defaultViewType) {
            queryString = Utils.#appendQueryString(queryString, "view", view);
        }

        const style = object.style?.trim();
        if (style && style.length > 0 && style !== defaultStyle) {
            queryString = Utils.#appendQueryString(queryString, "style", style);
        }

        const label = object.label?.trim();
        if (label && label.length > 0 && label !== defaultLabel) {
            queryString = Utils.#appendQueryString(queryString, "label", label);
        }

        const extraCount = parseInt(object.extraCount?.toString());
        if (extraCount && extraCount > 0) {
            queryString = Utils.#appendQueryString(queryString, "extraCount", extraCount);
        }

        const color = object.color?.replaceAll("#", "").trim();
        if (color && color.length > 0 && defaultColors.indexOf(color) === -1) {
            queryString = Utils.#appendQueryString(queryString, "color", color);
        }

        const labelColor = object.labelColor?.replaceAll("#", "").trim();
        if (labelColor && labelColor.length > 0 && defaultLabelColors.indexOf(labelColor) === -1) {
            queryString = Utils.#appendQueryString(queryString, "labelColor", labelColor);
        }

        const link = object.link;
        if (link) {
            if (Array.isArray(link)) {
                link.forEach(value => {
                    if (value && value.trim().length > 0) {
                        queryString = Utils.#appendQueryString(queryString, "link", value.trim());
                    }
                });
            } else {
                if (link.trim().length > 0) {
                    queryString = Utils.#appendQueryString(queryString, "link", link.trim());
                }
            }
        }

        const logo = object.logo?.trim();
        if (logo && logo.length > 0) {
            queryString = Utils.#appendQueryString(queryString, "logo", logo);
        }

        const logoWidth = parseInt(object.logoWidth?.toString());
        if (logoWidth) {
            queryString = Utils.#appendQueryString(queryString, "logoWidth", logoWidth);
        }

        return queryString.length > 0 ? "?" + queryString : "";
    }

    static #appendQueryString(queryString, key, value) {
        if (queryString.length > 0) {
            queryString += "&";
        }
        queryString += key + "=" + encodeURIComponent(value);
        return queryString;
    }
}