import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Header() {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URI}/hits.sh.svg`).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <nav className="relative z-10 container max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
            <div aria-label="Header. logo" role="img">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90.25" height="28" role="img" aria-label="HITS: &#8734;">
                        <title>HITS: &#8734;</title>
                        <g shapeRendering="crispEdges">
                            <rect width="54.00" height="28" fill="#555" />
                            <rect x="54.00" width="36.25" height="28" fill="#4c1" />
                        </g>
                        <g fill="#fff" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" textRendering="geometricPrecision" fontSize="100">
                            <text transform="scale(.1)" x="270" y="175" textLength="300" fill="#fff">HITS</text>
                            <text transform="scale(.1)" x="721.25" y="175" textLength="122.5" fill="#fff" fontWeight="bold">&#8734;</text>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="space-x-8 text-sm font-medium text-slate-300">
                <Link to="/docs/" className="hover:text-white transition-colors">Docs</Link>
                <Link to="/showcase/" className="hover:text-white transition-colors">Showcase</Link>
                <Link to="/changelog/" className="hover:text-white transition-colors">Changelog</Link>
                <Link to="/faq/" className="hover:text-white transition-colors">FAQ</Link>
            </div>
        </nav>
    );
}