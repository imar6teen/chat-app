import { render, screen } from "@testing-library/react";
import Chat from "../pages/Chat";

describe("Test on chat.js", () => {
  test("should loading first", () => {
    render(<Chat />);
    const loadingElement = screen.getByText(/ini loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
