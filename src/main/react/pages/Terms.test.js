import { render, screen } from "@testing-library/react";
import Terms from "./Terms";
import { BrowserRouter } from "react-router-dom";

describe("Terms", () => {
    it("should render Terms of Service heading", () => {
        render(<BrowserRouter><Terms /></BrowserRouter>);

        expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    });

    it("should contain Acknowledgment section", () => {
        render(<BrowserRouter><Terms /></BrowserRouter>);

        expect(screen.getByText("Acknowledgment")).toBeInTheDocument();
    });
});
