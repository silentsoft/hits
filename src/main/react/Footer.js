import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-center py-8 border-t border-white/5 mt-auto">
            <div className="flex space-x-6 mb-4">
                <a href="https://x.com/silentsoft_" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="currentColor" />
                    </svg>
                </a>
                <a href="https://github.com/silentsoft/hits" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
                    </svg>
                </a>
            </div>
            <div className="flex space-x-6 mb-4 text-sm text-slate-500">
                <Link to="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms/" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p className="text-sm text-slate-500">Copyright &copy; {new Date().getFullYear()} silentsoft.org.</p>
        </div>
    );
}