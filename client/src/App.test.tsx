import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders Todos App", () => {
  render(<App />);
  const linkElement = screen.getByText(/Todos App/i);
  expect(linkElement).toBeInTheDocument();
});
