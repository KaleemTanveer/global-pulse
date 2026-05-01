import React from "react";
import { render, screen } from "@testing-library/react";
import CountriesPage from "../app/countries/page";

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
        data: [
          {
            name: "Pakistan",
            capital: "Islamabad",
            region: "Asia",
            flag: "flag.png",
            code: "PAK",
          },
        ],
        totalPages: 1,
      }),
  })
) as any;

test("renders countries list", async () => {
  const page = await CountriesPage({
    searchParams: Promise.resolve({ page: "1", search: "" }),
  });

  render(page);

  expect(screen.getByText("Pakistan")).toBeInTheDocument();
  expect(screen.getByText("Islamabad")).toBeInTheDocument();
  expect(screen.getByText("Asia")).toBeInTheDocument();
});