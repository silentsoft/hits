import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className="flex h-screen">
            <div className="w-full h-full">
                <div className="h-screen min-h-fit">
                    <Header/>
                    <div className="container mx-auto flex flex-col items-center py-12">
                        <div className="w-11/12 xl:w-8/12 md:w-5/6 sm:w-3/4 lg:flex justify-center items-center flex-col">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-gray-800 font-black leading-7 md:leading-10">
                                Hit Counter for Your GitHub or Any Kind of <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-violet-600">Websites</span> You Want
                            </h1>
                            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-medium text-center text-md sm:text-lg">Now it's time to hit's. Happy hacking !</p>
                        </div>
                    </div>
                    <Content/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}