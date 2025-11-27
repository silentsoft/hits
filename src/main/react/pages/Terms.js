import React from 'react';
import Header from "../Header";

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-slate-400 mb-4">Last updated: 2025. 11. 27.</p>

                <p>Please read these terms and conditions carefully before using Our Service.</p>

                <h2>Interpretation and Definitions</h2>
                <h3>Interpretation</h3>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

                <h3>Definitions</h3>
                <p>For the purposes of these Terms of Service:</p>
                <ul>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hits.</li>
                    <li><strong>Service</strong> refers to the Website and the Badge API Service.</li>
                    <li><strong>Website</strong> refers to Hits, accessible from https://hits.sh</li>
                    <li><strong>Badge API Service</strong> refers to the hit counter service.</li>
                </ul>

                <h2>Acknowledgment</h2>
                <p>These are the Terms of Service governing the use of this Service and the agreement that operates between You and the Company. These Terms of Service set out the rights and obligations of all users regarding the use of the Service.</p>
                <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms of Service. These Terms of Service apply to all visitors, users and others who access or use the Service.</p>

                <h2>Links to Other Websites</h2>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
                <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
                <p>The Website uses Google Analytics to analyze the use of our website. By using the Website, you agree to the collection and use of information in accordance with Google's Privacy Policy. Note that the Badge API service does not use Google Analytics or collect personal data.</p>

                <h2>Termination</h2>
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms of Service.</p>

                <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms of Service, You can contact us:</p>
                <ul>
                    <li>By visiting this page on our website: <a href="https://github.com/silentsoft/hits" className="text-purple-400">https://github.com/silentsoft/hits</a></li>
                </ul>
            </main>
        </div>
    );
}
