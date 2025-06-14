import {render, screen} from "@testing-library/react";
import BadgeCard from "./BadgeCard";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

describe("BadgeCard", () => {
    it("should be displayed the success icon after copy", async () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined)
            }
        })

        jest.useFakeTimers();

        render(<BadgeCard title="foo" render={() => "bar"} />);

        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.getByText("bar")).toBeInTheDocument();

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();

        await userEvent.click(screen.getByTitle("Copy"));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("bar");

        expect(screen.queryByTitle("Copy")).not.toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();
    });
    it("should fallback to execCommand when clipboard API is not available", async () => {
        delete navigator.clipboard;

        document.execCommand = jest.fn();

        render(<BadgeCard title="foo" render={() => "bar"} />);

        await userEvent.click(screen.getByTitle("Copy"));

        expect(document.execCommand).toHaveBeenCalledWith("copy");

        expect(await screen.findByTitle("Copied!")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();
    });
});