import React from "react";
import { render, screen } from "@testing-library/react";
import CountryDetail from "../app/countries/[code]/page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true, 
    json: () =>
      Promise.resolve({
        name: "Pakistan",
        capital: "Islamabad",
        region: "Asia",
        currencies: [{ name: "PKR", symbol: "₨" }],
        languages: ["Urdu"],
        borders: ["IND", "AFG"],
      }),
  })
) as any;

test("renders country detail", async () => {
  const page = await CountryDetail({
    params: { code: "PAK" },
  });

  render(page);

  expect(screen.getByText(/Pakistan/i)).toBeInTheDocument();
  expect(screen.getByText(/Islamabad/i)).toBeInTheDocument();
  expect(screen.getByText(/Asia/i)).toBeInTheDocument();
  expect(screen.getByText(/PKR/i)).toBeInTheDocument();
  expect(screen.getByText(/Urdu/i)).toBeInTheDocument();
});