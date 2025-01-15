import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// functional component TripList, deconstruct props!
function TripList({ addToWishlist }) {
    const [month, setMonth] = useState("");
    const [trips, setTrips] = useState([]); // Initialize trips as an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    // Fetch trips from API on component mount
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch("http://localhost:3001/trips");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTrips(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Map trips into JSX elements
    const tripsMapped = trips.map((trip) => (
        <Trip addToWishlist={addToWishlist} trip={trip} key={trip.id} />
    ));

    const empty = (
        <section>
            <p className="alert alert-info">Trip list is empty</p>
        </section>
    );

    // If a month is selected, filter trips by the selected month
    const filteredTrips = month
        ? trips.filter((t) => new Date(t.startTrip).getMonth() + 1 === parseInt(month))
        : trips;

    return (
        <div className="container">
            <section>
                <h2 className="h4">Trip List Catalog</h2>
                {loading && <p>Loading trips...</p>}
                {error && <p className="alert alert-danger">Error: {error}</p>}
                {!loading && !error && (
                    <>
                        <section id="filters">
                            <label htmlFor="month">Filter by Month:</label>
                            <select
                                id="month"
                                value={month} // controlled component
                                onChange={(e) => {
                                    setMonth(e.target.value);
                                }}
                            >
                                <option value="">All Months</option>
                                {months.map((m, index) => (
                                    index > 0 && (
                                        <option key={index} value={index}>
                                            {m}
                                        </option>
                                    )
                                ))}
                            </select>
                            {month && (
                                <h2>
                                    Found {filteredTrips.length} {" "}
                                    {filteredTrips.length !== 1 ? "trips" : "trip"} for the
                                    month of {months[month]}
                                </h2>
                            )}
                        </section>
                        <div className="row">
                            {filteredTrips.length > 0
                                ? filteredTrips.map((trip) => (
                                    <Trip
                                        addToWishlist={addToWishlist}
                                        trip={trip}
                                        key={trip.id}
                                    />
                                ))
                                : empty}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}

// deconstruct ...props
function Trip({ addToWishlist, ...props }) {
    const { trip } = props;
    const { id, title, description, startTrip, endTrip } = trip;

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <figure className="card card-product">
                <div className="img-wrap">
                    <img src={`images/items/${id}.jpg`} alt={title} />
                </div>
                <figcaption className="info-wrap">
                    <h6 className="title">
                        {title} ({new Date(startTrip).toLocaleDateString()} - {" "}
                        {new Date(endTrip).toLocaleDateString()})
                    </h6>
                    <p className="card-text">{description}</p>
                    <div className="info-wrap row">
                        <button
                            type="button"
                            className="btn btn-link btn-outline"
                            onClick={() => addToWishlist(trip)}
                        >
                            <i className="fa fa-shopping-cart" /> Add to Wishlist
                        </button>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default TripList;
