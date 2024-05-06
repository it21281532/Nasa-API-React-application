import React from "react";
import { Link } from "react-router-dom";
import { NaturalDisasterSVG1 } from "../components/NaturalDisasterSVG1";
import { NaturalDisasterSVG2 } from "../components/NaturalDisasterSVG2";
import { NaturalDisasterSVG3 } from "../components/NaturalDisasterSVG3";

function Home() {
  const handleSignout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out successfully!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-purple-700 to-blue-500 py-12 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Cosmic Explorer Hub
      </h1>
      <h2 className="text-lg font-bold text-white text-center mb-8">
        Unveiling Earth's Dynamic & Celestial Marvels
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Disaster Watch */}
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-2xl transition-all duration-300">
          <NaturalDisasterSVG1 />
          <h3 className="text-2xl font-bold text-center">
            <span className="text-red-600">Disaster Watch:</span> Worldwide
            Disasters Radar
          </h3>
          <p className="text-gray-700 text-center">
            Explore real-time data on wildfires, icebergs, and volcanoes. Stay
            informed about natural phenomena shaping our world.
          </p>
          <Link
            to="/natural-disaster"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Check
          </Link>
        </div>

        {/* Space Odyssey */}
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-2xl transition-all duration-300">
          <NaturalDisasterSVG2 />
          <h3 className="text-2xl font-bold text-center">
            <span className="text-red-600">Space Odyssey:</span> Picture of the
            Day
          </h3>
          <p className="text-gray-700 text-center">
            Embark on a cosmic journey through NASA's captivating images. Delve
            into the universe's beauty with daily celestial snapshots.
          </p>
          <Link
            to="/image-of-the-day"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Check
          </Link>
        </div>

        {/* Asteroid Alert */}
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-2xl transition-all duration-300">
          <NaturalDisasterSVG3 />
          <h3 className="text-2xl font-bold text-center">
            <span className="text-red-600">Asteroid Alert:</span> Near Earth
            Objects Detection
          </h3>
          <p className="text-gray-700 text-center">
            Track asteroids on a collision course with Earth. Stay vigilant with
            timely updates on celestial visitors and safeguard the planet.
          </p>
          <Link
            to="/asteroid"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Check
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
