import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Docs from './pages/Docs';
import Showcase from './pages/Showcase';
import Changelog from './pages/Changelog';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Dashboard from './Dashboard';
import Footer from './Footer';

export default function App() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0B0F19]">
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/showcase" element={<Showcase />} />
                    <Route path="/changelog" element={<Changelog />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}