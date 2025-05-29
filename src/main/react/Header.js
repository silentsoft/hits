import {Link} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Header() {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URI}/hits.sh.svg`).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div className="bg-white overflow-y-hidden" >
            <nav className="w-full border-b">
                <div className="py-3 container mx-auto px-6 flex items-center justify-between max-w-screen-lg">
                    <div aria-label="Header. logo" role="img">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="90.25" height="28" role="img" aria-label="HITS: &#8734;">
                                <title>HITS: &#8734;</title>
                                <g shapeRendering="crispEdges">
                                    <rect width="54.00" height="28" fill="#555"/>
                                    <rect x="54.00" width="36.25" height="28" fill="#4c1"/>
                                </g>
                                <g fill="#fff" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" textRendering="geometricPrecision" fontSize="100">
                                    <text transform="scale(.1)" x="270" y="175" textLength="300" fill="#fff">HITS</text>
                                    <text transform="scale(.1)" x="721.25" y="175" textLength="122.5" fill="#fff" fontWeight="bold">&#8734;</text>
                                </g>
                            </svg>
                        </Link>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <button style={{color: '#000000'}}>
                            <a href="https://x.com/silentsoft_" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                                        fill="currentColor"/>
                                </svg>
                            </a>
                        </button>
                        <button style={{color: '#181717'}}>
                            <a href="https://github.com/silentsoft/hits" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 1.5C6.20156 1.5 1.5 6.32344 1.5 12.2672C1.5 17.025 4.50937 21.0562 8.68125 22.4812C8.73977 22.494 8.79949 22.5002 8.85938 22.5C9.24844 22.5 9.39844 22.2141 9.39844 21.9656C9.39844 21.7078 9.38906 21.0328 9.38437 20.1328C9.03705 20.2142 8.68173 20.2567 8.325 20.2594C6.30469 20.2594 5.84531 18.6891 5.84531 18.6891C5.36719 17.4469 4.67813 17.1141 4.67813 17.1141C3.76406 16.4719 4.67344 16.4531 4.74375 16.4531H4.74844C5.80313 16.5469 6.35625 17.5687 6.35625 17.5687C6.88125 18.4875 7.58437 18.7453 8.2125 18.7453C8.62783 18.737 9.03673 18.6412 9.4125 18.4641C9.50625 17.7703 9.77812 17.2969 10.0781 17.025C7.74844 16.7531 5.29688 15.8297 5.29688 11.7047C5.29688 10.5281 5.70469 9.56719 6.375 8.81719C6.26719 8.54531 5.90625 7.44844 6.47812 5.96719C6.55483 5.94883 6.63368 5.94095 6.7125 5.94375C7.09219 5.94375 7.95 6.08906 9.36563 7.07344C11.0857 6.59218 12.9049 6.59218 14.625 7.07344C16.0406 6.08906 16.8984 5.94375 17.2781 5.94375C17.357 5.94095 17.4358 5.94883 17.5125 5.96719C18.0844 7.44844 17.7234 8.54531 17.6156 8.81719C18.2859 9.57187 18.6937 10.5328 18.6937 11.7047C18.6937 15.8391 16.2375 16.7484 13.8984 17.0156C14.2734 17.3484 14.6109 18.0047 14.6109 19.0078C14.6109 20.4469 14.5969 21.6094 14.5969 21.9609C14.5969 22.2141 14.7422 22.5 15.1312 22.5C15.1942 22.5003 15.2571 22.494 15.3187 22.4812C19.4953 21.0562 22.5 17.0203 22.5 12.2672C22.5 6.32344 17.7984 1.5 12 1.5Z"
                                        fill="currentColor"/>
                                </svg>
                            </a>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}