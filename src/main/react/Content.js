import React from "react";
import SimpleDropdown from "./components/SimpleDropdown";
import BadgeCard from "./components/BadgeCard";
import Utils from "./utils/Utils";
import {normalize} from "./utils/UniformedResourceNameUtils";
import ColorPicker from "./components/ColorPicker";
import {Link} from "react-router-dom";

export default function Content(props) {
    const [url, setUrl] = React.useState(props.url ? props.url : "");
    const [view, setView] = React.useState("total");
    const [style, setStyle] = React.useState("flat");
    const [label, setLabel] = React.useState("");
    const [extraCount, setExtraCount] = React.useState("");
    const [color, setColor] = React.useState("");
    const [labelColor, setLabelColor] = React.useState("");
    const [logo, setLogo] = React.useState("");

    const NO_URL_SPECIFIED = "No URL specified";
    const INVALID_URL = "Invalid URL";

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    const handleStyleChange = (e) => {
        setStyle(e.target.value);
    };

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const handleNumberKeyPress = (e) => {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
            return;
        }

        if (!/^[0-9]*$/.test(e.key)) {
            e.preventDefault();
        }
    }

    const handleExtraCountChange = (e) => {
        setExtraCount(e.target.value);
    };

    const handleColorChange = (color) => {
        setColor(color);
    };

    const handleLabelColorChange = (color) => {
        setLabelColor(color);
    };

    const handleLogoChange = (e) => {
        setLogo(e.target.value);
    };

    const toQueryString = () => {
        return Utils.toQueryString({
            view: view,
            style: style,
            label: label,
            extraCount: extraCount,
            color: color,
            labelColor: labelColor,
            logo: logo
        });
    };

    const isValidUrl = () => {
        if (url.trim().length > 0 && url.includes(".") && url[0] !== "." && url[url.length - 1] !== ".") {
            return true;
        }
        return false;
    };

    const toMarkdown = () => {
        if (url.trim().length === 0) {
            return NO_URL_SPECIFIED;
        } else if (!isValidUrl()) {
            return INVALID_URL;
        }
        return `[![Hits](https://hits.sh/${normalize(url)}.svg${toQueryString()})](https://hits.sh/${normalize(url)}/)`;
    };

    const toHTML = () => {
        if (url.trim().length === 0) {
            return NO_URL_SPECIFIED;
        } else if (!isValidUrl()) {
            return INVALID_URL;
        }
        return `<a href="https://hits.sh/${normalize(url)}/"><img alt="Hits" src="https://hits.sh/${normalize(url)}.svg${toQueryString()}"/></a>`;
    };

    const toImageLink = () => {
        if (url.trim().length === 0) {
            return NO_URL_SPECIFIED;
        } else if (!isValidUrl()) {
            return INVALID_URL;
        }
        return `https://hits.sh/${normalize(url)}.svg${toQueryString()}`;
    };

    return (
        <div className="container mx-auto max-w-screen-lg">
            <div className="flex flex-wrap">
                <div className="w-full px-6 pb-5">
                    <div className="relative w-full">
                        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center px-4 border-r dark:border-gray-700 h-full cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input id="url" className="w-full text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-16 text-base border-gray-300 rounded border shadow" placeholder="https://github.com/silentsoft/hits" value={url} onChange={handleUrlChange} />
                    </div>
                </div>
                <div className="md:w-1/2 w-full px-6">
                    <div className="rounded bg-white">
                        <div className="flex flex-row items-center justify-center space-x-2 pb-8 pt-4 font-medium text-gray-600">
                            <div className="w-7 border-b border-gray-400"/>
                            <p>Options</p>
                            <div className="w-7 border-b border-gray-400"/>
                        </div>
                        <div className="flex justify-center pb-4">
                            <div className="flex-col space-y-3">
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">View Type</label>
                                    <div className="w-48">
                                        <SimpleDropdown items={['total', 'today-total']} onChange={handleViewChange}/>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Style</label>
                                    <div className="w-48">
                                        <SimpleDropdown items={['flat', 'flat-square', 'for-the-badge', 'plastic']} onChange={handleStyleChange}/>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Label</label>
                                    <div className="w-48">
                                        <input type="text" className="w-full border border-gray-300 dark:border-gray-700 pl-3 py-1.5 shadow-sm rounded focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="hits" value={label} onChange={handleLabelChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Extra Count</label>
                                    <div className="w-48">
                                        <input type="number" min={0} className="w-full border border-gray-300 dark:border-gray-700 pl-3 py-1.5 shadow-sm rounded focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="0" value={extraCount} onKeyPress={handleNumberKeyPress} onChange={handleExtraCountChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Color</label>
                                    <div className="w-48">
                                        <ColorPicker color="#4c1" onChange={handleColorChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Label Color</label>
                                    <div className="w-48">
                                        <ColorPicker color="#555" onChange={handleLabelColorChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <label className="text-right text-sm font-medium leading-none text-gray-700 pr-3">Logo</label>
                                    <div className="w-48">
                                        <input type="text" className="w-full border border-gray-300 dark:border-gray-700 pl-3 py-1.5 shadow-sm rounded focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="slug or base64" value={logo} onChange={handleLogoChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end">
                                    <div className="w-48 -mt-2">
                                        <a href="https://github.com/simple-icons/simple-icons/blob/develop/slugs.md" target="_blank">
                                            <div className="flex items-center justify-end text-gray-400">
                                                <p className="text-xs">slugs</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full px-6">
                    <div className="rounded bg-white">
                        <div className="flex flex-row items-center justify-center space-x-2 pb-8 pt-4 font-medium text-gray-600">
                            <div className="w-7 border-b border-gray-400"/>
                            <p>Badge</p>
                            <div className="w-7 border-b border-gray-400"/>
                        </div>
                        <div className="flex justify-center pb-3">
                            {isValidUrl() && <Link to={`/${normalize(url)}/`} style={{width: "fit-content"}}><img src={`${process.env.REACT_APP_URI}/${normalize(url)}.preview${toQueryString()}`} /></Link>}
                        </div>
                        <div className="space-y-6 pt-3">
                            <BadgeCard title="Markdown" render={toMarkdown} />
                            <BadgeCard title="HTML" render={toHTML} />
                            <BadgeCard title="Image Link" render={toImageLink} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}