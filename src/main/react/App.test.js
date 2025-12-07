import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";

import { HelmetProvider } from "react-helmet-async";

describe("App", () => {
    it("should render the Home", () => {
        render(<HelmetProvider><BrowserRouter><App /></BrowserRouter></HelmetProvider>);
        expect(document.body).toHaveTextContent("Make your impact");
    });
    it("should render the Dashboard", () => {
        render(<HelmetProvider><MemoryRouter initialEntries={["/github.com/silentsoft/hits/"]}><App /></MemoryRouter></HelmetProvider>);
        expect(document.body).toHaveTextContent("github.com/silentsoft/hits");
    });
});