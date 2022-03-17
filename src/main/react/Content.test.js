import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Content from "./Content";
import userEvent from "@testing-library/user-event";

test("Content", () => {
    render(<BrowserRouter><Content/></BrowserRouter>);

    const input = screen.getByPlaceholderText("https://github.com/silentsoft/hits");
    expect(input).toBeInTheDocument();

    const viewType = screen.getByDisplayValue("total");
    expect(viewType).toBeInTheDocument();

    const style = screen.getByDisplayValue("flat");
    expect(style).toBeInTheDocument();

    const label = screen.getByPlaceholderText("hits");
    expect(label).toBeInTheDocument();

    const extraCount = screen.getByPlaceholderText("0");
    expect(extraCount).toBeInTheDocument();

    const color = screen.getByPlaceholderText("#4c1");
    expect(color).toBeInTheDocument();

    const labelColor = screen.getByPlaceholderText("#555");
    expect(labelColor).toBeInTheDocument();

    const logo = screen.getByPlaceholderText("slug or base64");
    expect(logo).toBeInTheDocument();

    expect(screen.getAllByText("No URL specified")).toHaveLength(3);

    userEvent.type(input, "https://hits");
    expect(screen.getAllByText("Invalid URL")).toHaveLength(3);

    userEvent.clear(input);
    userEvent.type(input, "https://hits.sh/");
    expect(screen.getByText(`[![Hits](https://hits.sh/hits.sh.svg)](https://hits.sh/hits.sh/)`)).toBeInTheDocument();
    expect(screen.getByText(`<a href="https://hits.sh/hits.sh/"><img alt="Hits" src="https://hits.sh/hits.sh.svg"/></a>`)).toBeInTheDocument();
    expect(screen.getByText(`https://hits.sh/hits.sh.svg`)).toBeInTheDocument();

    userEvent.selectOptions(viewType, "today-total");
    userEvent.selectOptions(style, "flat-square");
    userEvent.type(label, "page views");

    userEvent.type(extraCount, "1");
    fireEvent.keyPress(extraCount, {key: "a", code: "KeyA", charCode: "97", ctrlKey: true});
    fireEvent.keyPress(extraCount, {key: "a", code: "KeyA", charCode: "97"});
    fireEvent.keyPress(extraCount, {key: "0", code: "Digit0", charCode: "48"});
    userEvent.type(extraCount, "000");

    userEvent.type(color, "#000");
    userEvent.type(labelColor, "#fff");
    userEvent.type(logo, "github");
    expect(screen.getByText(`[![Hits](https://hits.sh/hits.sh.svg?view=today-total&style=flat-square&label=page%20views&extraCount=1000&color=000&labelColor=fff&logo=github)](https://hits.sh/hits.sh/)`)).toBeInTheDocument();
    expect(screen.getByText(`<a href="https://hits.sh/hits.sh/"><img alt="Hits" src="https://hits.sh/hits.sh.svg?view=today-total&style=flat-square&label=page%20views&extraCount=1000&color=000&labelColor=fff&logo=github"/></a>`)).toBeInTheDocument();
    expect(screen.getByText(`https://hits.sh/hits.sh.svg?view=today-total&style=flat-square&label=page%20views&extraCount=1000&color=000&labelColor=fff&logo=github`)).toBeInTheDocument();
});