import { render, screen } from "@testing-library/react";
import Privacy from "./Privacy";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

describe("Privacy", () => {
    it("should render Privacy Policy heading", () => {
        render(<HelmetProvider><BrowserRouter><Privacy /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    });

    it("should contain definitions section", () => {
        render(<HelmetProvider><BrowserRouter><Privacy /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Interpretation and Definitions")).toBeInTheDocument();
    });

    it("should contain data collection section", () => {
        render(<HelmetProvider><BrowserRouter><Privacy /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Collecting and Using Your Personal Data")).toBeInTheDocument();
    });

    it("should contain hit counter section", () => {
        render(<HelmetProvider><BrowserRouter><Privacy /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("1. Hit Counter")).toBeInTheDocument();
    });

    it("should contain website section", () => {
        render(<HelmetProvider><BrowserRouter><Privacy /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("2. Website")).toBeInTheDocument();
    });
});
