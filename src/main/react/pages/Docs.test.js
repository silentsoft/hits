import { render, screen } from "@testing-library/react";
import Docs from "./Docs";
import { BrowserRouter } from "react-router-dom";

describe("Docs", () => {
    it("should render documentation heading", () => {
        render(<BrowserRouter><Docs /></BrowserRouter>);

        expect(screen.getByText("Documentation")).toBeInTheDocument();
    });

    it("should contain usage section", () => {
        render(<BrowserRouter><Docs /></BrowserRouter>);

        expect(screen.getByText("Usage")).toBeInTheDocument();
    });

    it("should contain dashboard section", () => {
        render(<BrowserRouter><Docs /></BrowserRouter>);

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should contain options section", () => {
        render(<BrowserRouter><Docs /></BrowserRouter>);

        expect(screen.getByText("Options")).toBeInTheDocument();
    });
});
