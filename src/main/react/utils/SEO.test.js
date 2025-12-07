import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";

describe("SEO Component", () => {
    it("should set title and meta tags correctly", async () => {
        render(
            <HelmetProvider>
                <SEO
                    title="Test Page"
                    description="This is a test description"
                    path="/test/"
                />
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(document.title).toBe("Test Page | Hits");
            expect(document.querySelector('meta[name="description"]').getAttribute("content")).toBe("This is a test description");
            expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe("https://hits.sh/test/");
        });
    });
});
