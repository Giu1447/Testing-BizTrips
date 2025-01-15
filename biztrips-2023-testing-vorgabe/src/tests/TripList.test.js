import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TripList from "../components/TripList";
import { act } from "react";

// Mock for the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                { id: 1, title: "Trip to Paris", description: "A wonderful trip", startTrip: "2025-01-01", endTrip: "2025-01-10" },
                { id: 2, title: "Trip to Tokyo", description: "An amazing adventure", startTrip: "2025-02-15", endTrip: "2025-02-25" },
            ]),
    })
);

const mockAddToWishlist = jest.fn();

describe("TripList Component", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test("fetches trips from API and displays them", async () => {
        await act(async () => {
            render(<TripList addToWishlist={mockAddToWishlist} />);
        });

        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8001/trips");
        expect(global.fetch).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
            expect(screen.getByText("Trip to Tokyo")).toBeInTheDocument();
        });
    });

    test("filters trips by selected month", async () => {
        render(<TripList addToWishlist={mockAddToWishlist} />);

        const filterSelect = await screen.findByLabelText(/filter by month/i);
        fireEvent.change(filterSelect, { target: { value: "2" } });

        await waitFor(() => {
            expect(screen.getByText(/Trip to Tokyo/i)).toBeInTheDocument();
            expect(screen.queryByText(/Trip to Paris/i)).not.toBeInTheDocument();
        });
    });

    test("calls addToWishlist when add button is clicked", async () => {
        render(<TripList addToWishlist={mockAddToWishlist} />);

        await waitFor(() => {
            const addButtons = screen.getAllByText(/Add to wishlist/i);
            fireEvent.click(addButtons[0]);
            expect(mockAddToWishlist).toHaveBeenCalledWith({
                id: 1,
                title: "Trip to Paris",
                description: "A wonderful trip",
                startTrip: "2025-01-01",
                endTrip: "2025-01-10",
            });
        });
    });

    test("displays an error message when fetch fails", async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.reject(new Error("Failed to fetch"))
        );

        render(<TripList addToWishlist={mockAddToWishlist} />);

        await waitFor(() => {
            expect(screen.getByText(/Productlist is empty/i)).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8001/trips");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
