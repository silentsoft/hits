import { render, screen } from "@testing-library/react";
import BadgeCard from "./BadgeCard";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("BadgeCard", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should be displayed the success icon after copy", async () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined)
            }
        });

        const { container } = render(<BadgeCard title="foo" render={() => "bar"} />);

        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.getByText("bar")).toBeInTheDocument();

        expect(screen.queryByText("Copied")).not.toBeInTheDocument();

        const copyButton = container.querySelector('.cursor-pointer');
        await userEvent.click(copyButton);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("bar");

        expect(await screen.findByText("Copied")).toBeInTheDocument();

        act(() => {
            jest.runOnlyPendingTimers();
            jest.advanceTimersByTime(1500);
        });

        expect(screen.queryByText("Copied")).not.toBeInTheDocument();
    });

    it("should fallback to execCommand when clipboard API is not available", async () => {
        delete navigator.clipboard;

        document.execCommand = jest.fn();

        const { container } = render(<BadgeCard title="foo" render={() => "bar"} />);

        const copyButton = container.querySelector('.cursor-pointer');
        await userEvent.click(copyButton);

        expect(document.execCommand).toHaveBeenCalledWith("copy");

        expect(await screen.findByText("Copied")).toBeInTheDocument();

        act(() => {
            jest.runOnlyPendingTimers();
            jest.advanceTimersByTime(1500);
        });

        expect(screen.queryByText("Copied")).not.toBeInTheDocument();
    });
});