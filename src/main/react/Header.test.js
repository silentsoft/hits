import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Header from "./Header";
import axios from "axios";

jest.mock("axios");

describe("Header", () => {
    it("should request hits.sh.svg for counting hits", () => {
        axios.get.mockRejectedValue(new Error());

        render(<BrowserRouter><Header/></BrowserRouter>);

        expect(axios.get).toHaveBeenCalledWith("/hits.sh.svg");
    });
});