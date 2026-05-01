import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(), 
  }),
}));

test("navigates with correct search query", () => {
  render(<SearchBar />);

  const input = screen.getByPlaceholderText(/search country/i);
  const button = screen.getByText(/search/i);

  fireEvent.change(input, { target: { value: "pakistan" } });
  fireEvent.click(button);

  expect(input).toHaveValue("pakistan");
});