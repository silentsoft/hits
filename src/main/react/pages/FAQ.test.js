import { render, screen } from "@testing-library/react";
import FAQ from "./FAQ";
import { BrowserRouter } from "react-router-dom";

describe("FAQ", () => {
    it("should render FAQ heading", () => {
        render(<BrowserRouter><FAQ /></BrowserRouter>);

        expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    });
});
