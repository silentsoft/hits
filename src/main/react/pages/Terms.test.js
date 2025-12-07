import { render, screen } from "@testing-library/react";
import Terms from "./Terms";
import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

describe("Terms", () => {
    it("should render Terms of Service heading", () => {
        render(<HelmetProvider><BrowserRouter><Terms /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    });

    it("should contain Acknowledgment section", () => {
        render(<HelmetProvider><BrowserRouter><Terms /></BrowserRouter></HelmetProvider>);

        expect(screen.getByText("Acknowledgment")).toBeInTheDocument();
    });
});
