import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
    it("should render the Home", () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        expect(document.body).toHaveTextContent("Make your impact");
    });
    it("should render the Dashboard", () => {
        render(<MemoryRouter initialEntries={["/github.com/silentsoft/hits/"]}><App /></MemoryRouter>);
        expect(document.body).toHaveTextContent("github.com/silentsoft/hits");
    });
});