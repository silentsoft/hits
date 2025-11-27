import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import axios from "axios";

jest.mock("axios");

describe("Dashboard", () => {
    it("should render with items", async () => {
        axios.get.mockResolvedValue({
            data: {
                total: 3,
                monthly: 2,
                weekly: 1,
                items: [
                    {
                        from: "2021-01-01",
                        to: "2021-12-31",
                        data: [
                            {
                                value: 1,
                                day: "2021-12-31",
                            },
                        ],
                    },
                    {
                        from: "2022-01-01",
                        to: "2022-12-31",
                        data: [
                            {
                                value: 2,
                                day: "2022-01-01",
                            },
                        ],
                    }
                ]
            }
        });

        await render(<MemoryRouter initialEntries={["/github.com/silentsoft/hits/"]}><Dashboard /></MemoryRouter>);

        expect(screen.getByText("github.com/silentsoft/hits")).toBeInTheDocument();
        expect(screen.getByTestId("weekly")).toHaveTextContent("1");
        expect(screen.getByText("Weekly Hits")).toBeInTheDocument();
        expect(screen.getByTestId("monthly")).toHaveTextContent("2");
        expect(screen.getByText("Monthly Hits")).toBeInTheDocument();
        expect(screen.getByTestId("total")).toHaveTextContent("3");
        expect(screen.getByText("Total Hits")).toBeInTheDocument();
        expect(screen.getAllByTestId("chart")).toHaveLength(2);
    });
    it("should render without items", () => {
        axios.get.mockRejectedValue(new Error());

        render(<MemoryRouter initialEntries={["/github.com/silentsoft/hits/"]}><Dashboard /></MemoryRouter>);

        expect(screen.getByText("github.com/silentsoft/hits")).toBeInTheDocument();
        expect(screen.getByTestId("weekly")).toHaveTextContent("0");
        expect(screen.getByText("Weekly Hits")).toBeInTheDocument();
        expect(screen.getByTestId("monthly")).toHaveTextContent("0");
        expect(screen.getByText("Monthly Hits")).toBeInTheDocument();
        expect(screen.getByTestId("total")).toHaveTextContent("0");
        expect(screen.getByText("Total Hits")).toBeInTheDocument();
        expect(screen.getAllByTestId("chart")).toHaveLength(1);
    });
});