import React from "react";
import Header from "../Header";

export default function Docs() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">Documentation</h1>
                    <p className="text-lg text-slate-400 mb-12">
                        Everything you need to know about creating, customizing and tracking your Hits.
                    </p>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-purple-400">Usage</h2>
                            <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                                https://hits.sh/github.com/username/repo.svg
                            </div>
                            <p className="mt-4 text-slate-400">
                                Simply append your target URL to <code className="text-purple-300">https://hits.sh/</code> and add <code className="text-purple-300">.svg</code> at the end.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-purple-400">Options</h2>
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

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-purple-400">Dashboard</h2>
                            <p className="text-slate-400 mb-4">
                                You can view detailed statistics by visiting the dashboard.
                                Simply append a trailing slash <code className="text-purple-300">/</code> to your project URL.
                            </p>
                            <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-x-auto mb-4">
                                https://hits.sh/github.com/username/repo/
                            </div>
                            <ul className="list-disc list-inside text-slate-400 space-y-2 ml-2">
                                <li>View weekly, monthly and total hits statistics.</li>
                                <li>Visualize traffic trends with hits calendar.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
