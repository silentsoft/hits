import {render, screen} from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
    it("should render the copyright notice", () => {
        render(<Footer />);
        expect(screen.getByText(`Copyright \u00A9 ${new Date().getFullYear()} silentsoft.org.`)).toBeInTheDocument();
    });
});