import React from 'react';
import Header from "../Header";
import SEO from "../utils/SEO";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            <SEO
                title="Privacy Policy"
                description="We take your privacy seriously. Hits counts views without tracking personal data. No cookies, no IPs, no fingerprinting."
                path="/privacy/"
            />
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-slate-400 mb-4">Last updated: 2025. 11. 27.</p>

                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service.
                </p>

                <h2>Interpretation and Definitions</h2>
                <h3>Definitions</h3>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hits and its creator.</li>
                    <li><strong>Service</strong> refers to the Website and the Hit Counter.</li>
                    <li><strong>Website</strong> refers to Hits, accessible from https://hits.sh</li>
                    <li><strong>Hit Counter</strong> refers to SVG badge, accessible via .svg URL from https://hits.sh</li>
                </ul>

                <h2>Collecting and Using Your Personal Data</h2>

                <h3>1. Hit Counter</h3>
                <p>
                    The Hit Counter <strong>does not collect any personal data</strong>.
                </p>
                <ul>
                    <li>We do not track IP addresses.</li>
                    <li>We do not use cookies.</li>
                    <li>We do not collect user agent strings.</li>
                    <li>The only data processed is the incrementing counter for the specific badge URL.</li>
                </ul>

                <h3>2. Website</h3>
                <p>
                    The Website (https://hits.sh) uses <strong>Google Analytics</strong> to understand how visitors interact with the site.
                </p>
                <p>
                    Please refer to <strong>Google's Privacy Policy</strong> for detailed information on what data is collected and how it is processed.
                </p>
                <p>
                    Google's privacy policy is available at: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400">https://policies.google.com/privacy</a>
                </p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul>
                    <li>By visiting this page on our website: <a href="https://github.com/silentsoft/hits" className="text-purple-400">https://github.com/silentsoft/hits</a></li>
                </ul>
            </main>
        </div>
    );
}
