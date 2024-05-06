import React, { useState } from "react";
import Loader from "../components/Loader";

function Asteroid() {
  const [astFullDate, setAstFullDate] = useState("");
  const [count, setCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [loading2, setLoading2] = useState(false);

  const api_key = "yOPGtFFJvRbP0DddzPAkSTr5frBFNZW2EJPb9jkK";

  const fetchAsteroids = async () => {
    setLoading2(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${astFullDate}&end_date=${astFullDate}&api_key=${api_key}`
      );
      const data = await response.json();
      setCount(data.element_count);
      setAsteroids(data.near_earth_objects[astFullDate]);
    } catch (err) {
      alert("Error while fetching the near-Earth objects, server error");
    }
    setLoading2(false);
  };

  const handleGetData = () => {
    fetchAsteroids();
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-700 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <main className="container mx-auto px-6 sm:px-12 py-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Near-Earth Objects Detection
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <input
            type="date"
            value={astFullDate}
            onChange={(e) => setAstFullDate(e.target.value)}
            className="border-2 border-indigo-300 rounded-md p-2 text-indigo-900 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleGetData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Get Data
          </button>
        </div>
        <div className="text-center text-white mb-6">
          <p className="font-bold">Total Count: {count}</p>
          <p>Date: {astFullDate}</p>
        </div>
        {loading2 ? (
          <Loader />
        ) : astFullDate === "" ? (
          <p className="text-center text-white text-lg font-semibold mt-10">
            Please select a date to view the near-Earth objects.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {asteroids.map((asteroid, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-70 border-white border-2 rounded-lg p-4 text-white shadow-md"
              >
                <p className="font-semibold">Name: {asteroid.name}</p>
                <p>
                  Hazardous Status:{" "}
                  <span
                    className={`rounded-md px-2 py-1 ml-2 ${
                      asteroid.is_potentially_hazardous_asteroid
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {asteroid.is_potentially_hazardous_asteroid
                      ? "Threat"
                      : "No-Threat"}
                  </span>
                </p>
                <div className="bg-slate-100 rounded-lg p-4 mt-3 text-black">
                  <p className="font-bold mb-3">Close Approach to Earth</p>
                  <p>
                    Date/Time:{" "}
                    {asteroid.close_approach_data[0].close_approach_date_full}
                  </p>
                  <p>
                    Estimated Diameter:{" "}
                    {asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
                      2
                    )}{" "}
                    -{" "}
                    {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
                      2
                    )}{" "}
                    m
                  </p>
                  <p>
                    Relative Velocity:{" "}
                    {
                      asteroid.close_approach_data[0].relative_velocity
                        .kilometers_per_hour
                    }{" "}
                    km/h
                  </p>
                  <p>
                    Miss Distance:{" "}
                    {asteroid.close_approach_data[0].miss_distance.kilometers}{" "}
                    km
                  </p>
                  <a
                    className="bg-blue-500 p-1 rounded-lg underline hover:bg-blue-700 text-white"
                    href={asteroid.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More info
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Asteroid;
