import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

describe("Home", () => {
    it("should render make your impact", () => {
        render(<HelmetProvider><BrowserRouter><Home /></BrowserRouter></HelmetProvider>);
        expect(screen.getByText("Make your impact")).toBeInTheDocument();
        expect(document.body).toHaveTextContent("visible");
    });
});