import React from "react";
import Header from "../Header";
import SEO from "../utils/SEO";

export default function Docs() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            <SEO
                title="Documentation"
                description="Complete guide to using Hits. Learn how to track views on GitHub, Notion and websites and customize your badge styles."
                path="/docs/"
            />
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <div className="grid md:grid-cols-[250px_1fr] gap-12">
                    {/* Sidebar / TOC */}
                    <aside className="hidden md:block sticky top-24 h-fit">
                        <nav className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Getting Started</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#introduction" className="hover:text-purple-400 transition-colors">Introduction</a></li>
                                    <li><a href="#quick-start" className="hover:text-purple-400 transition-colors">Quick Start</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Integrations</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#github" className="hover:text-purple-400 transition-colors">GitHub</a></li>
                                    <li><a href="#notion" className="hover:text-purple-400 transition-colors">Notion</a></li>
                                    <li><a href="#website" className="hover:text-purple-400 transition-colors">Website</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Reference</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#options" className="hover:text-purple-400 transition-colors">Configuration Options</a></li>
                                    <li><a href="#dashboard" className="hover:text-purple-400 transition-colors">Dashboard Analytics</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <article className="prose prose-invert prose-purple overflow-x-auto">
                        <section id="introduction" className="mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                Welcome to the Hits documentation. Hits is a simple, privacy-focused way to track views on your GitHub repositories, Notion and websites.
                            </p>
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                    <span className="text-xl">💡</span> Why Hits?
                                </h4>
                                <p className="text-slate-300 text-sm mb-0">
                                    Traditional analytics tools are often heavy, require cookies and track invasive user data. Hits simply counts requests to a svg image. It's fast, free and respects user privacy.
                                </p>
                            </div>
                        </section>

                        <section id="quick-start" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Quick Start</h2>
                            <p className="text-slate-400 mb-6">
                                The fastest way to get started is to use your existing URL. No sign-up is required.
                            </p>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto mb-4">
                                https://hits.sh/your-website.com/page-name.svg
                            </div>
                            <p className="text-slate-400">
                                Simply append any string to <code className="text-purple-300">https://hits.sh/</code> and add <code className="text-purple-300">.svg</code> at the end. The server will automatically create a counter for that URL if it doesn't exist.
                            </p>
                        </section>

                        <section id="github" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Integration: GitHub</h2>
                            <p className="text-slate-400 mb-6">
                                Hits is perfect for GitHub Profile READMEs and repository documentation.
                            </p>

                            <h3 className="text-xl font-bold mb-4 text-white">Repository README</h3>
                            <p className="text-slate-400 mb-4">
                                Add the following Markdown to your <code className="text-purple-300">README.md</code> file:
                            </p>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto mb-8">
                                [![Hits](https://hits.sh/github.com/username/repository.svg)](https://hits.sh/github.com/username/repository/)
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-white">Profile README</h3>
                            <p className="text-slate-400 mb-4">
                                To track views on your main profile (https://github.com/username):
                            </p>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                                [![Hits](https://hits.sh/github.com/username.svg)](https://hits.sh/github.com/username/)
                            </div>
                        </section>

                        <section id="notion" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Integration: Notion</h2>

                            <p className="text-slate-400 mb-4">
                                Notion supports embedding images directly.
                            </p>
                            <ol className="list-decimal list-inside text-slate-400 space-y-2 ml-2">
                                <li>
                                    In your Notion page, type <code className="text-purple-300">/image</code> and select "Embed Link".
                                </li>
                                <li>
                                    Paste your Hits URL (e.g. <code className="text-slate-500">https://hits.sh/notion.so/your-page.svg</code>).
                                </li>
                            </ol>
                        </section>

                        <section id="website" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Integration: Website</h2>

                            <p className="text-slate-400 mb-4">
                                For generic website, you can use a standard HTML anchor and image tag.
                            </p>

                            <h3 className="text-xl font-bold mb-4 text-white">Main Domain</h3>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto mb-6">
                                &lt;a href="https://hits.sh/your-website.com/"&gt;&lt;img alt="Hits" src="https://hits.sh/your-website.com.svg"/&gt;&lt;/a&gt;
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-white">Specific Page</h3>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto mb-6">
                                &lt;a href="https://hits.sh/your-website.com/page-name/"&gt;&lt;img alt="Hits" src="https://hits.sh/your-website.com/page-name.svg"/&gt;&lt;/a&gt;
                            </div>


                        </section>

                        <section id="options" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Configuration Options</h2>
                            <p className="text-slate-400 mb-6">
                                Verify the appearance of your badge using query parameters.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-slate-300">
                                            <th className="py-4 px-4">Parameter</th>
                                            <th className="py-4 px-4">Description</th>
                                            <th className="py-4 px-4">Default</th>
                                            <th className="py-4 px-4">Values / Example</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-400 text-sm">
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">view</td>
                                            <td className="py-4 px-4">Counter view mode</td>
                                            <td className="py-4 px-4 font-mono">total</td>
                                            <td className="py-4 px-4 font-mono">total, today-total</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">style</td>
                                            <td className="py-4 px-4">Badge style</td>
                                            <td className="py-4 px-4 font-mono">flat</td>
                                            <td className="py-4 px-4 font-mono">flat, flat-square, for-the-badge, plastic</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">label</td>
                                            <td className="py-4 px-4">Left side text</td>
                                            <td className="py-4 px-4 font-mono">hits</td>
                                            <td className="py-4 px-4 font-mono">any text</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">extraCount</td>
                                            <td className="py-4 px-4">Add to counter value</td>
                                            <td className="py-4 px-4 font-mono">0</td>
                                            <td className="py-4 px-4 font-mono">number</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">color</td>
                                            <td className="py-4 px-4">Right side background</td>
                                            <td className="py-4 px-4 font-mono">4c1</td>
                                            <td className="py-4 px-4 font-mono">
                                                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">CSS color</a>
                                                <span className="text-slate-500 ml-1">(named, hex, rgb, hsl, etc.)</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">labelColor</td>
                                            <td className="py-4 px-4">Left side background</td>
                                            <td className="py-4 px-4 font-mono">555</td>
                                            <td className="py-4 px-4 font-mono">
                                                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">CSS color</a>
                                                <span className="text-slate-500 ml-1">(named, hex, rgb, hsl, etc.)</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4 px-4 font-mono text-purple-300">logo</td>
                                            <td className="py-4 px-4">Icon to display</td>
                                            <td className="py-4 px-4 font-mono">none</td>
                                            <td className="py-4 px-4 font-mono">
                                                <a href="https://github.com/simple-icons/simple-icons/blob/develop/slugs.md" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">slug</a>
                                                <span className="text-slate-500 ml-1">(e.g. github)</span>
                                                , base64
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section id="dashboard" className="mb-20">
                            <h2 className="text-3xl font-bold mb-6 text-white">Dashboard Analytics</h2>
                            <p className="text-slate-400 mb-2">
                                Every Hits counter comes with a free public dashboard.
                            </p>
                            <ul className="list-disc list-inside text-slate-400 space-y-2 ml-2 mb-4">
                                <li>View weekly, monthly and total hits statistics.</li>
                                <li>Visualize traffic trends with hits calendar.</li>
                            </ul>
                            <p className="text-slate-400 mb-4">
                                To access it, simply append a trailing slash <code className="text-purple-300">/</code> to your project URL.
                            </p>
                            <div className="bg-[#151925] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                                https://hits.sh/github.com/username/repository/
                            </div>
                        </section>


                    </article>
                </div>
            </main>
        </div>
    );
}
