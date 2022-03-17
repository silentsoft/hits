export default function SimpleDropdown(props) {
    return (
        <div className="w-full border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
            <select data-testid="select" type="text" onChange={props.onChange} className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-1.5 w-full border border-transparent focus:outline-none focus:border-indigo-700  text-gray-800 dark:text-gray-100 rounded">
                {props.items?.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>;
                })}
            </select>
            <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none ">
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 15 12 9 18 15" />
                </svg>
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </div>
    );
}