import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Frequently Asked Questions</h1>
                <p className="text-lg text-slate-400 mb-12">
                    Common questions and answers about using Hits.
                </p>

                <div className="space-y-8">
                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">Is Hits free to use?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Yes, Hits is completely free to use for both personal and commercial projects. There are no hidden fees or premium tiers.
                        </p>
                    </div>

                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">How do I reset my counter?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            To prevent abuse, we do not support resetting counters.
                        </p>
                    </div>

                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">What is extraCount?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            You can use <code>extraCount</code> to add a starting value to your counter. This is useful if you are migrating from another service or want to start with a specific number.
                            See <a href="https://github.com/silentsoft/hits" target="_blank" className="text-purple-400 hover:text-purple-300">our repository</a> for more details.
                        </p>
                    </div>

                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">Does it work on private repositories?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Yes! Since Hits works by loading an image, it can track views on any page that can load external images, including private GitHub repositories (in the README) or internal documentation sites.
                        </p>
                    </div>

                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">What data do you collect?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            We respect your privacy. We only count the number of times the image is loaded. We do not track IP addresses, user agents, or any other personal information.
                        </p>
                    </div>

                    <div className="bg-[#151925]/50 border border-white/5 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-3">Can I customize the badge?</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Absolutely. You can customize the label, colors, style, and even add a logo. Check out our <Link to="/docs" className="text-purple-400 hover:text-purple-300">Documentation</Link> for all available options.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
