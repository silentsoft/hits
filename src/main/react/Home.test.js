import { render } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
    it("should contain an introductory message", () => {
        render(<BrowserRouter><Home /></BrowserRouter>);
        expect(document.body).toHaveTextContent("Make your impact");
        expect(document.body).toHaveTextContent("visible");
    });
});