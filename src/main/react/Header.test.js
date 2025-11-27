import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

jest.mock("axios");

describe("Header", () => {
    it("should request hits.sh.svg for counting hits and render navigation links", () => {
        axios.get.mockRejectedValue(new Error());

        render(<BrowserRouter><Header /></BrowserRouter>);

        expect(axios.get).toHaveBeenCalledWith("/hits.sh.svg");

        expect(screen.getByText("Docs")).toBeInTheDocument();
        expect(screen.getByText("Showcase")).toBeInTheDocument();
        expect(screen.getByText("Changelog")).toBeInTheDocument();
        expect(screen.getByText("FAQ")).toBeInTheDocument();
    });
});