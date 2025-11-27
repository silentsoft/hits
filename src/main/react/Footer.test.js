import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
    it("should render the copyright notice", () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);
        expect(screen.getByText(`Copyright \u00A9 ${new Date().getFullYear()} silentsoft.org.`)).toBeInTheDocument();
    });
});