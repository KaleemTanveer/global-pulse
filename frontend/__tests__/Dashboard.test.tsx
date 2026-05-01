import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        temperature: 25,
        iss_position: { latitude: "10", longitude: "20" },
        data: [{ name: "Pakistan", capital: "Islamabad", flag: "flag.png" }],
      }),
  })
) as any;

test("renders dashboard cards", async () => {
  render(await Dashboard());

  expect(screen.getByText(/weather/i)).toBeInTheDocument();
  expect(screen.getByText(/iss/i)).toBeInTheDocument();
  expect(screen.getByText(/country/i)).toBeInTheDocument();
});