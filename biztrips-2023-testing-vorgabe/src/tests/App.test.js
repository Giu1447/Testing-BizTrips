import { render, screen } from "@testing-library/react";
import App from "../App";

test("App renders a heading", () => {
  render(<App />);
  expect(
      screen.getByRole("heading", {
        name: /Welcome to biztrips-App/i,
      })
  ).toBeInTheDocument();
});

describe("Wishlist Functionality", () => {
  test("renders an empty Wishlist message", () => {
    render(<App />);
    expect(screen.getByText(/Wishlist is empty/i)).toBeInTheDocument();
  });

  test("Wishlist clear button is disabled when empty", () => {
    render(<App />);
    const clearButton = screen.getByRole("button", { name: /empty wishlist/i });
    expect(clearButton).toBeDisabled();
  });
});

describe("TripList Component", () => {
  test("renders TripList with heading", () => {
    render(<App />);
    expect(
        screen.getByRole("heading", { name: /Triplist-Catalog/i })
    ).toBeVisible();
  });
});
