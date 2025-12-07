import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import SEO from "../utils/SEO";

export default function About() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            <SEO
                title="About"
                description="Building the most transparent, privacy-friendly and simple analytics tool for the developer community."
                path="/about/"
            />
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Hits</h1>
                </div>

                <div className="space-y-12">
                    <section>
                        <div className="bg-[#151925]/50 border border-white/5 rounded-2xl p-8 md:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white">The Story Behind Hits</h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                When the tools you rely on disappear, sometimes the only option is to build them yourself.
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                It started early 2021. The visitor counter I had been using on my GitHub profile suddenly vanished. At first, I saw a broken image icon and thought, "It'll probably be back soon." But days turned into weeks and the broken image remained.
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                I was worried about losing the visitor count I had accumulated over time. I went to the service's GitHub repository to open an issue, only to find that others had already reported it. The maintainer mentioned they were investigating, but months passed with no resolution.
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                I ultimately gave up and started looking for alternatives. But I couldn't find a service that offered migration tools for users in my situation.
                            </p>

                            <h3 className="text-xl font-bold mb-4 text-white">So, I Built My Own</h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                That's how <Link to="/" className="text-purple-400 hover:text-purple-300">Hits</Link> was born.
                            </p>

                            <h3 className="text-xl font-bold mb-4 text-white">Building the Ecosystem</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Since my backend of choice is Java, I faced a unique challenge: the libraries I needed didn't exist in the Java ecosystem. So, I ended up creating several open-source libraries to make Hits possible:
                            </p>
                            <ul className="list-disc list-inside text-slate-400 space-y-2 mb-6 ml-2">
                                <li>
                                    <strong className="text-white">Badge Library:</strong> Ported the official JavaScript badge-maker to Java (<a href="https://github.com/silentsoft/badge4j" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">badge4j</a>).
                                </li>
                                <li>
                                    <strong className="text-white">CSS Color Parsing:</strong> Built a library to handle Named Colors, Hex, RGB, CMYK and HSL (<a href="https://github.com/silentsoft/csscolor4j" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">csscolor4j</a>).
                                </li>
                                <li>
                                    <strong className="text-white">Simple Icons:</strong> Created a library to support brand logos in badges (<a href="https://github.com/silentsoft/simpleicons4j" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">simpleicons4j</a>).
                                </li>
                            </ul>

                            <p className="text-slate-400 leading-relaxed mb-6">
                                What started as a frustration with a broken image link turned into a full-fledged project and a suite of open-source libraries.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                If you're looking for a visitor counter that <strong className="text-white">can migrate your old visitor count</strong>, try <Link to="/" className="text-purple-400 hover:text-purple-300">Hits</Link>.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
