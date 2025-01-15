import {render, screen, fireEvent, within} from '@testing-library/react';
import Wishlist from '../components/Wishlist';

const mockRemoveFromWishlist = jest.fn();
const mockClearWishlist = jest.fn();
const sampleWishlist = [
    { id: 1, title: 'Trip to Paris', description: 'A wonderful trip', startTrip: new Date(), endTrip: new Date() },
    { id: 2, title: 'Trip to Tokyo', description: 'An amazing adventure', startTrip: new Date(), endTrip: new Date() },
];


test("renders wishlist items correctly", () => {
    render(
        <Wishlist
            wishlist={sampleWishlist}
            removeFromWishlist={mockRemoveFromWishlist}
            clearWishlist={mockClearWishlist}
        />
    );

    const wishlistContainer = screen.getByTestId("wishlist-container");
    const { getByText } = within(wishlistContainer);

    expect(getByText(/trip to paris/i)).toBeInTheDocument();
    expect(getByText(/trip to tokyo/i)).toBeInTheDocument();
});


test('calls removeFromWishlist when delete button is clicked', () => {
    render(<Wishlist wishlist={sampleWishlist} removeFromWishlist={mockRemoveFromWishlist} clearWishlist={mockClearWishlist} />);

    const deleteButtons = screen.getAllByText(/delete item/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockRemoveFromWishlist).toHaveBeenCalled();
});

test('calls clearWishlist when clear button is clicked', () => {
    render(<Wishlist wishlist={sampleWishlist} removeFromWishlist={mockRemoveFromWishlist} clearWishlist={mockClearWishlist} />);

    const clearButton = screen.getByText(/empty wishlist/i);
    fireEvent.click(clearButton);
    expect(mockClearWishlist).toHaveBeenCalled();
});
