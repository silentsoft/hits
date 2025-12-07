import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URI}/hits.sh.svg`).catch(error => {
            console.error(error);
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="relative z-50 container max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
            <div aria-label="Header. logo" role="img" className="z-50">
                <Link to="/" onClick={closeMenu}>
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

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
                <Link to="/about/" className="hover:text-white transition-colors">About</Link>
                <Link to="/docs/" className="hover:text-white transition-colors">Docs</Link>
                <Link to="/showcase/" className="hover:text-white transition-colors">Showcase</Link>
                <Link to="/changelog/" className="hover:text-white transition-colors">Changelog</Link>
                <Link to="/faq/" className="hover:text-white transition-colors">FAQ</Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 text-slate-300 hover:text-white focus:outline-none transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#0B0F19] z-40 flex flex-col justify-center items-center space-y-8 md:hidden">
                    <Link to="/about/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>About</Link>
                    <Link to="/docs/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>Docs</Link>
                    <Link to="/showcase/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>Showcase</Link>
                    <Link to="/changelog/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>Changelog</Link>
                    <Link to="/faq/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>FAQ</Link>
                    <Link to="/privacy/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>Privacy Policy</Link>
                    <Link to="/terms/" className="text-2xl font-medium text-slate-300 hover:text-white transition-colors" onClick={closeMenu}>Terms of Service</Link>
                </div>
            )}
        </nav>
    );
}