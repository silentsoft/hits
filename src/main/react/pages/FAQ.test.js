import { render, screen } from "@testing-library/react";
import FAQ from "./FAQ";
import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

describe("FAQ", () => {
    it("should render FAQ heading", () => {
        render(<HelmetProvider><BrowserRouter><FAQ /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    });
});
