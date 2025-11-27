import React, { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { normalize } from "./utils/UniformedResourceNameUtils";
import { ResponsiveCalendar } from '@nivo/calendar'
import Content from "./Content";

export default function Dashboard() {
    const { pathname } = useLocation();
    const urn = decodeURI(normalize(pathname));
    const [weekly, setWeekly] = React.useState(0);
    const [monthly, setMonthly] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URI}/api/urns/${urn}`)
            .then(response => {
                setWeekly(response.data.weekly);
                setMonthly(response.data.monthly);
                setTotal(response.data.total);
                setItems(response.data.items);
            }).catch(error => {
                console.error(error);
                setWeekly(0);
                setMonthly(0);
                setTotal(0);
                setItems([]);
            });
    }, [urn]);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
            {/* Aurora Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 py-12">
                <div className="flex flex-col items-center space-y-12">
                    {/* Title Section */}
                    <div className="w-full max-w-4xl text-center">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-violet-600 break-all">
                                {urn}
                            </span>
                        </h1>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-md transition-all hover:bg-slate-800/50 hover:border-emerald-500/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-center">
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Weekly Hits</p>
                                <h2 data-testid="weekly" className="text-4xl md:text-5xl font-bold text-white tracking-tight">{weekly}</h2>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-md transition-all hover:bg-slate-800/50 hover:border-violet-500/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-center">
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Monthly Hits</p>
                                <h2 data-testid="monthly" className="text-4xl md:text-5xl font-bold text-white tracking-tight">{monthly}</h2>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-md transition-all hover:bg-slate-800/50 hover:border-blue-500/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-center">
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Hits</p>
                                <h2 data-testid="total" className="text-4xl md:text-5xl font-bold text-white tracking-tight">{total}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="w-full max-w-4xl space-y-8">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div data-testid="chart" key={index} className="w-full h-40 md:h-48 bg-slate-900/30 border border-white/5 rounded-2xl p-4 overflow-hidden">
                                    <ResponsiveCalendar
                                        data={item.data}
                                        from={item.from}
                                        to={item.to}
                                        emptyColor="#1e293b"
                                        colors={['#064e3b', '#065f46', '#047857', '#059669', '#10b981']}
                                        margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                                        monthBorderWidth={0}
                                        dayBorderWidth={2}
                                        dayBorderColor="#0B0F19"
                                        theme={{
                                            textColor: '#e2e8f0',
                                            tooltip: {
                                                container: {
                                                    background: '#1e293b',
                                                    color: '#f8fafc',
                                                    fontSize: '12px',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div data-testid="chart" className="w-full h-40 md:h-48 bg-slate-900/30 border border-white/5 rounded-2xl p-4 overflow-hidden">
                                <ResponsiveCalendar
                                    data={[]}
                                    from={new Date().getFullYear() + '-01-01'}
                                    to={new Date().getFullYear() + '-12-31'}
                                    emptyColor="#1e293b"
                                    colors={['#064e3b', '#065f46', '#047857', '#059669', '#10b981']}
                                    margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                                    monthBorderWidth={0}
                                    dayBorderWidth={2}
                                    dayBorderColor="#0B0F19"
                                    theme={{
                                        textColor: '#e2e8f0',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Badge Builder Content */}
                    <div className="w-full">
                        <Content url={urn} />
                    </div>
                </div>
            </main>
        </div>
    );
}