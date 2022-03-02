import React, {useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {useLocation} from "react-router-dom";
import {normalize} from "./utils/UniformedResourceNameUtils";
import {ResponsiveCalendar} from '@nivo/calendar'
import Content from "./Content";

export default function Dashboard() {
    const {pathname} = useLocation();
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
        <div className="flex h-screen">
            <div className="w-full h-full">
                <div className="h-screen min-h-fit">
                    <Header/>
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap pb-3">
                            <div className="container mx-auto flex flex-col items-center space-y-8 sm:space-y-12 py-8 sm:py-12">
                                <div className="w-11/12 xl:w-8/12 md:w-5/6 sm:w-3/4 lg:flex justify-center items-center flex-col">
                                    <h1 className="text-2xl text-center text-gray-800 font-bold leading-7">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-violet-600">{urn}</span>
                                    </h1>
                                </div>
                                {items.length > 0 ? (
                                    <div className="mx-auto container flex justify-center items-center">
                                        <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8">
                                            <div className="flex justify-center flex-col items-center bg-white shadow rounded-2xl w-24 h-20 sm:w-32 sm:h-24 md:w-44 md:h-28">
                                                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-10 text-center text-gray-800">{weekly}</h2>
                                                <p className="mt-1 sm:mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">Weekly</p>
                                            </div>
                                            <div className="flex justify-center flex-col items-center bg-white shadow rounded-2xl w-24 h-20 sm:w-32 sm:h-24 md:w-44 md:h-28">
                                                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-10 text-center text-gray-800">{monthly}</h2>
                                                <p className="mt-1 sm:mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">Monthly</p>
                                            </div>
                                            <div className="flex justify-center flex-col items-center bg-white shadow rounded-2xl w-24 h-20 sm:w-32 sm:h-24 md:w-44 md:h-28">
                                                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-10 text-center text-gray-800">{total}</h2>
                                                <p className="mt-1 sm:mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">Total</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            {items.length > 0 ? (
                                items.reduce((acc, item, index) => {
                                    acc.push(
                                        <div key={index} className="mx-auto container flex justify-center items-center w-full h-28 sm:h-32 md:h-40 lg:h-44 max-w-screen-lg">
                                            <ResponsiveCalendar
                                                data={item.data}
                                                from={item.from}
                                                to={item.to}
                                                emptyColor="#ebedf0"
                                                colors={[ '#9be9a8', '#40c463', '#30a14e', '#216e39' ]}
                                                margin={{ top: 0, right: 24, bottom: 0, left: 44 }}
                                                monthBorderWidth={0}
                                                dayBorderWidth={2}
                                                dayBorderColor="#ffffff"
                                            />
                                        </div>
                                    );
                                    return acc;
                                }, [])) : (
                                <div className="mx-auto container flex justify-center items-center w-full h-28 sm:h-32 md:h-40 lg:h-44 max-w-screen-lg">
                                    <ResponsiveCalendar
                                        data={[]}
                                        from={new Date().getFullYear() + '-01-01'}
                                        to={new Date().getFullYear() + '-12-31'}
                                        emptyColor="#ebedf0"
                                        colors={[ '#9be9a8', '#40c463', '#30a14e', '#216e39' ]}
                                        margin={{ top: 0, right: 24, bottom: 0, left: 44 }}
                                        monthBorderWidth={0}
                                        dayBorderWidth={2}
                                        dayBorderColor="#ffffff"
                                    />
                                </div>
                            )}
                        </div>
                        <Content url={urn} />
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}