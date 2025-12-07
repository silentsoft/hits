import React, { useEffect, useState } from 'react';
import showcaseData from '../data/showcase.json';
import Header from "../Header";
import SEO from "../utils/SEO";

export default function Showcase() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Load projects from static JSON data (no API calls)
        const loadedProjects = showcaseData.map((item, index) => ({
            id: `project-${index}`,
            name: item.name,
            description: item.description,
            homepage: item.homepage,
            dashboard: item.dashboard,
            owner: item.owner,
            avatar: `https://github.com/${item.owner}.png`,
            badge: `${process.env.REACT_APP_URI}${item.badge}`
        }));

        setProjects(loadedProjects);
    }, []);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
            <SEO
                title="Community Showcase"
                description="Discover awesome projects using Hits to track their views. From open source tools to personal portfolios."
                path="/showcase/"
            />
            {/* Aurora Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Community Showcase</h1>
                    <p className="text-slate-400">See how others are using Hits to track their projects.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <a key={project.id} href={project.dashboard} target="_blank" rel="noopener noreferrer" className="block group">
                            <div className="bg-[#151925]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-all h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={project.avatar} alt={project.owner} className="w-10 h-10 rounded-full border border-white/10" />
                                    <div>
                                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors decoration-purple-500/30 hover:underline underline-offset-4">
                                            {project.name}
                                        </a>
                                        <p className="text-xs text-slate-500">by {project.owner}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <img src={project.badge} alt="Hits" />
                                </div>

                                <p className="text-slate-400 text-sm flex-grow line-clamp-3">
                                    {project.description || "No description available."}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}
