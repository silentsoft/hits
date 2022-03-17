import {render, screen} from "@testing-library/react";
import SimpleDropdown from "./SimpleDropdown";

describe("SimpleDropdown", () => {
    it("should render without items", () => {
        render(<SimpleDropdown />);
        expect(screen.getByTestId("select")).toBeEmptyDOMElement();
    });
    it("should render with items", () => {
        const firstValue = "hello";
        const secondValue = "world";

        render(<SimpleDropdown items={[firstValue, secondValue]} />);

        const firstOption = screen.getByText(firstValue);
        expect(firstOption).toBeInTheDocument();
        expect(firstOption).toHaveValue(firstValue);

        const secondOption = screen.getByText(secondValue);
        expect(secondOption).toBeInTheDocument();
        expect(secondOption).toHaveValue(secondValue);

        const select = screen.getByTestId("select");
        expect(select).toContainElement(firstOption);
        expect(select).toContainElement(secondOption);
        expect(select).toHaveValue(firstValue);
        expect(select).not.toHaveValue(secondValue);
        expect(select).not.toBeEmptyDOMElement();
    });
});