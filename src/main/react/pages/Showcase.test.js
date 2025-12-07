import { render, screen } from "@testing-library/react";
import Showcase from "./Showcase";
import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

describe("Showcase", () => {
    it("should render showcase heading", () => {
        render(<HelmetProvider><BrowserRouter><Showcase /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Community Showcase")).toBeInTheDocument();
    });

    it("should render showcase description", () => {
        render(<HelmetProvider><BrowserRouter><Showcase /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("See how others are using Hits to track their projects.")).toBeInTheDocument();
    });
});
