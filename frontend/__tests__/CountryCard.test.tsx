import React from "react";  
import { render, screen } from "@testing-library/react";

const CountryCard = ({ name, flagUrl, capital }: any) => (
  <div>
    <img src={flagUrl} alt="flag" />
    <h2>{name}</h2>
    <p>{capital}</p>
  </div>
);

test("renders country data correctly", () => {
  render(
    <CountryCard
      name="Pakistan"
      flagUrl="flag.png"
      capital="Islamabad"
    />
  );

  expect(screen.getByText("Pakistan")).toBeInTheDocument();
  expect(screen.getByText("Islamabad")).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
});