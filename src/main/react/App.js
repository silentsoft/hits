import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Dashboard/>}/>
        </Routes>
    );
}