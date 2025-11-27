import { render, screen } from "@testing-library/react";
import ColorPicker from "./ColorPicker";
import userEvent from "@testing-library/user-event";

test("ColorPicker", () => {
    const onChange = jest.fn();
    render(<ColorPicker color="#123456" onChange={onChange} />);
    expect(screen.getByPlaceholderText("#123456")).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    userEvent.type(screen.getByPlaceholderText("#123456"), "#654321");
    expect(onChange).toHaveBeenCalledWith("#654321");

    expect(screen.queryByTestId("sketch-picker-wrapper")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cover")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("swatch"));
    expect(screen.queryByTestId("cover")).toBeInTheDocument();
    expect(screen.queryByTestId("sketch-picker-wrapper")).toBeInTheDocument();

    const sketchPickerInput = screen.getByDisplayValue("654321");
    expect(sketchPickerInput).toBeInTheDocument();
    userEvent.clear(sketchPickerInput);
    userEvent.type(sketchPickerInput, "123456");
    expect(screen.getByPlaceholderText("#123456")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("cover"));

    expect(screen.queryByTestId("sketch-picker-wrapper")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cover")).not.toBeInTheDocument();
});