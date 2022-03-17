import {render, screen} from "@testing-library/react";
import BadgeCard from "./BadgeCard";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import copy from "copy-text-to-clipboard";

jest.mock("copy-text-to-clipboard");

describe("BadgeCard", () => {
    it("should be displayed the success icon after copy", () => {
        jest.useFakeTimers();

        render(<BadgeCard title="foo" render={() => "bar"} />);

        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.getByText("bar")).toBeInTheDocument();

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();

        userEvent.click(screen.getByTitle("Copy"));

        expect(screen.queryByTitle("Copy")).not.toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();
    });
    it("should not be displayed the success icon when an error occurs", () => {
        copy.mockImplementation(() => {
            throw new Error();
        });

        render(<BadgeCard title="foo" render={() => "bar"} />);

        expect(screen.queryByTitle("Copy")).toBeInTheDocument();
        userEvent.click(screen.getByTitle("Copy"));
        expect(screen.queryByTitle("Copied!")).not.toBeInTheDocument();
    });
});