import {useRef, useState} from "react";

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
        <div className="shadow bg-white dark:bg-gray-800 rounded-md pt-2 border">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1 pl-2">{props.title}</p>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md ">
                <div className="flex w-full">
                    <div className="flex w-full flex-col justify-center pl-3 pr-1 text-gray-800 dark:text-gray-100">
                        <div className="flex justify-between items-baseline pt-1 pb-3">
                            <p className="text-sm text-gray-600 break-all" ref={valueRef}>{props.render()}</p>
                            <div className="inline-flex cursor-pointer" onClick={copyToClipboard}>
                                {copied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <title>Copied!</title>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <title>Copy</title>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}