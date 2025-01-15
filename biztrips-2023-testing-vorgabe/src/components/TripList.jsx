import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Funktion zum Abrufen der Reisen
export async function getBusinessTrips() {
    const response = await fetch("http://localhost:3001/trips");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

// benutzerdefinierter Hook zum Abrufen der Daten
export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBusinessTrips(url); // Verwenden der Funktion zum Abrufen der Reisen
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// Hauptkomponente TripList
function TripList({ addToWishlist }) {
    const [month, setMonth] = useState("");
    const { data: trips, loading, error } = useFetch("http://localhost:3001/trips"); // Verwende den benutzerdefinierten Hook
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    // Wenn ein Monat ausgewählt ist, filtere die Reisen nach dem ausgewählten Monat
    const filteredTrips = month
        ? trips?.filter((t) => new Date(t.startTrip).getMonth() + 1 === parseInt(month))
        : trips;

    // Falls die Liste leer ist
    const empty = (
        <section>
            <p className="alert alert-info">Trip list is empty</p>
        </section>
    );

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
                                value={month} // kontrollierte Komponente
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
                            {filteredTrips?.length > 0
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

// Trip-Komponente
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

