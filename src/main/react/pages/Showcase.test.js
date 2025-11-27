import { render, screen } from "@testing-library/react";
import Showcase from "./Showcase";
import { BrowserRouter } from "react-router-dom";

describe("Showcase", () => {
    it("should render showcase heading", () => {
        render(<BrowserRouter><Showcase /></BrowserRouter>);

        expect(screen.getByText("Community Showcase")).toBeInTheDocument();
    });

    it("should render showcase description", () => {
        render(<BrowserRouter><Showcase /></BrowserRouter>);

        expect(screen.getByText("See how others are using Hits to track their projects.")).toBeInTheDocument();
    });
});
