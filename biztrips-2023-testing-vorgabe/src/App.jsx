import React, { useState } from "react";
import "./App.css";

import Footer from "./Footer";
import Header from "./Header";
import TripList from "./components/TripList";
import Wishlist from "./components/Wishlist";

export default function App() {
    const [wishlist, setWishlist] = useState([]);

    // wishlist functions
    function addToWishlist(trip) {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.some((t) => t.id === trip.id);
            if (exists) return prevWishlist;
            return [...prevWishlist, trip];
        });
    }

    function removeFromWishlist(itemId) {
        setWishlist((prevWishlist) => prevWishlist.filter((t) => t.id !== itemId));
    }

    function clearWishlist() {
        setWishlist([]);
    }

    return (
        <>
            <Header />
            <main>
                <h1>Welcome to BizTrips App</h1>

                <Wishlist
                    wishlist={wishlist}
                    removeFromWishlist={removeFromWishlist}
                    clearWishlist={clearWishlist}
                />
                <TripList addToWishlist={addToWishlist} />
            </main>
            <Footer />
        </>
    );
}
