import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import Content from "./Content";

export default function Home() {
    const scrollToBuilder = (e) => {
        e.preventDefault();
        const element = document.getElementById('badge-builder');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [url, setUrl] = React.useState("");
    const [globalStats, setGlobalStats] = React.useState({ totalBadges: 0, totalHits: 0, loading: true });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URI}/api/stats/global`)
            .then(res => setGlobalStats({ ...res.data, loading: false }))
            .catch(err => {
                console.error("Failed to fetch global stats", err);
                setGlobalStats(prev => ({ ...prev, loading: false }));
            });
    }, []);

    const CountUp = ({ end, duration = 2000 }) => {
        const [count, setCount] = React.useState(0);

        useEffect(() => {
            let startTime = null;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(ease * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, [end, duration]);

        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(count) + "+";
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
            {/* Aurora Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto space-y-8 mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Make your impact
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-violet-600 pb-2">
                            visible.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                        A fast, simple and privacy-friendly way to count hits on your GitHub repositories, websites and more.
                    </p>

                    {/* Global Stats */}
                    {!globalStats.loading && (
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-12 animate-fade-in-up">
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                                    <CountUp end={globalStats.totalBadges} />
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Total Badges</div>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-violet-400 mb-2">
                                    <CountUp end={globalStats.totalHits} />
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Total Hits</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
                    <a href="#badge-builder" onClick={scrollToBuilder} className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer">
                        Get Started
                    </a>
                    <Link to="/showcase/" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                        View Gallery
                    </Link>
                </div>

                {/* Badge Builder Section */}
                <div id="badge-builder" className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Badge Builder</h2>
                    <Content />
                </div>
            </main>
        </div>
    );
}