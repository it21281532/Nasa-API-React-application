import React from "react";
import spaceImage from "../assests/NASA_Mars_Rover.jpg";
import wildfireImage from "../assests/nasa-apollo-proj.jpg";
import AsterionutImage from "../assests/Asterionut.jpg";

const About = () => {
  const handleSignout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out successfully!");
    window.location.href = "/";
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white min-h-screen flex flex-col justify-center py-12 px-4">
      {/* Main Content */}
      <main className="container mx-auto px-6 sm:px-12 py-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-lg leading-relaxed mb-8 text-center">
            At Space Explorer, we're passionate about bringing you closer to the
            wonders of the universe. Our mission is to provide real-time data
            and captivating imagery from NASA, letting you explore Earth's
            dynamic landscapes and the cosmos.
          </p>
        </section>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <img
            src={spaceImage}
            alt="Mars Rover"
            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
          <img
            src={wildfireImage}
            alt="Apollo Project"
            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mt-6 md:mt-0"
          />
        </div>

        {/* NASA's Contributions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            NASA's Contributions
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-center">
            NASA leads in space exploration, scientific research, and
            innovation. Key contributions include:
          </p>
          <ul className="list-disc ml-10 sm:ml-20 text-center space-y-2 text-lg">
            <li>Advancements in space exploration technology</li>
            <li>Understanding Earth's climate and environment</li>
            <li>Discovering new exoplanets and celestial objects</li>
            <li>Inspiring future generations of scientists and engineers</li>
          </ul>
        </section>

        {/* Website Purpose */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Website</h2>
          <p className="text-lg leading-relaxed mb-4 text-center">
            Space Explorer is your gateway to the cosmos. We offer real-time
            data, imagery, and educational resources. Whether tracking
            wildfires, viewing NASA's picture of the day, or staying informed on
            near-Earth asteroids, we have something for every space enthusiast.
          </p>
          <p className="text-lg leading-relaxed text-center">
            Join us on this cosmic journey and explore the universe together!
          </p>
        </section>

        {/* Astronaut Image */}
        <div className="flex justify-center mt-10">
          <img
            src={AsterionutImage}
            alt="Astronaut"
            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </main>
    </div>
  );
};

export default About;
