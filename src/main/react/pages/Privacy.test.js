import { render, screen } from "@testing-library/react";
import Privacy from "./Privacy";
import { BrowserRouter } from "react-router-dom";

describe("Privacy", () => {
    it("should render Privacy Policy heading", () => {
        render(<BrowserRouter><Privacy /></BrowserRouter>);

        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    });

    it("should contain Hit Counter section", () => {
        render(<BrowserRouter><Privacy /></BrowserRouter>);

        expect(screen.getByText("1. Hit Counter")).toBeInTheDocument();
    });

    it("should contain Website section", () => {
        render(<BrowserRouter><Privacy /></BrowserRouter>);

        expect(screen.getByText("2. Website")).toBeInTheDocument();
    });
});
