export default function SimpleDropdown(props) {
    return (
        <div className="w-full relative">
            <select
                data-testid="select"
                onChange={props.onChange}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/70 transition-colors"
            >
                {props.items?.map((item, index) => {
                    return <option key={index} value={item} className="bg-slate-900 text-white">{item}</option>;
                })}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}