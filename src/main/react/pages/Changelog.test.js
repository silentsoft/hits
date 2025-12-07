import { render, screen, waitFor } from "@testing-library/react";
import Changelog from "./Changelog";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

global.fetch = jest.fn();

describe("Changelog", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it("should render changelog heading", () => {
        fetch.mockResolvedValue({
            text: () => Promise.resolve("# 1.0.0 (2024-01-01)\n\nTest changelog")
        });

        render(
            <HelmetProvider>
                <BrowserRouter>
                    <Changelog />
                </BrowserRouter>
            </HelmetProvider>
        );

        expect(screen.getByRole('heading', { name: 'Changelog', level: 1 })).toBeInTheDocument();
    });

    it("should display loading state initially", () => {
        fetch.mockResolvedValue({
            text: () => Promise.resolve("")
        });

        render(
            <HelmetProvider>
                <BrowserRouter>
                    <Changelog />
                </BrowserRouter>
            </HelmetProvider>
        );

        expect(screen.getByText(/Loading changelog/i)).toBeInTheDocument();
    });

    it("should render changelog entries when data is loaded", async () => {
        const mockChangelog = "# 1.0.0 (2024-01-01)\n## Changes\n- Initial release";
        fetch.mockResolvedValue({
            text: () => Promise.resolve(mockChangelog)
        });

        render(
            <HelmetProvider>
                <BrowserRouter>
                    <Changelog />
                </BrowserRouter>
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText(/Loading changelog/i)).not.toBeInTheDocument();
        });

        expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    });
});
