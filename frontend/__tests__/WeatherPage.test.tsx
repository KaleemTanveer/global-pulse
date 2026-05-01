import React from "react";  
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherPage from "../app/weather/page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ temperature: 25 }),
  })
) as jest.Mock;

test("renders weather after search", async () => {
  render(<WeatherPage />);

  const input = screen.getByPlaceholderText(/enter city/i);
  const button = screen.getByText(/search/i);

  fireEvent.change(input, { target: { value: "lahore" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByText(/25/)).toBeInTheDocument()
  );
});