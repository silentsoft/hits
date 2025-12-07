import { render, screen } from "@testing-library/react";
import Docs from "./Docs";
import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

describe("Docs", () => {
    it("should render documentation heading", () => {
        render(<HelmetProvider><BrowserRouter><Docs /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Documentation")).toBeInTheDocument();
    });

    it("should contain quick start section", () => {
        render(<HelmetProvider><BrowserRouter><Docs /></BrowserRouter></HelmetProvider>);

        expect(screen.getAllByText("Quick Start")[0]).toBeInTheDocument();
    });

    it("should contain dashboard section", () => {
        render(<HelmetProvider><BrowserRouter><Docs /></BrowserRouter></HelmetProvider>);

        expect(screen.getAllByText("Dashboard Analytics")[0]).toBeInTheDocument();
    });

    it("should contain options section", () => {
        render(<HelmetProvider><BrowserRouter><Docs /></BrowserRouter></HelmetProvider>);

        expect(screen.getAllByText("Configuration Options")[0]).toBeInTheDocument();
    });
});
