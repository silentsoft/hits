import { useRef, useState } from "react";

export default function BadgeCard(props) {
    const valueRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(valueRef.current.textContent).then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1500);
            })
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = valueRef.current.textContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            document.body.removeChild(textarea);
        }
    };
    return (
        <div className="bg-slate-800/50 rounded-lg border border-white/5 overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center bg-slate-800/80">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{props.title}</p>
                <div className="cursor-pointer text-slate-400 hover:text-white transition-colors" onClick={copyToClipboard}>
                    {copied ? (
                        <div className="flex items-center space-x-1 text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs font-medium">Copied</span>
                        </div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </div>
            </div>
            <div className="p-4 bg-slate-900/50">
                <p className="text-sm text-slate-300 font-mono break-all" ref={valueRef}>{props.render()}</p>
            </div>
        </div>
    );
}