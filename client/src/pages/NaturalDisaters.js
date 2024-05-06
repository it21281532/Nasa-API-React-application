import React, { useState, useEffect } from "react";
import WildfireTracker from "../components/WildfireTracker";
import Loader from "../components/Loader";

function NaturalDisaster() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json();
      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white min-h-screen flex flex-col justify-center py-12 px-4">
      <main className="container mx-auto px-6 sm:px-12 py-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Natural Disaster Tracker
          </h1>
          <p className="text-lg leading-relaxed mb-8 text-center">
            Stay up-to-date with real-time data on natural disasters, including
            wildfires, hurricanes, and volcanic activity. Use our interactive
            tracker to stay informed.
          </p>
        </section>

        <div className="flex flex-col items-center justify-center">
          {!loading ? (
            <div className="bg-white bg-opacity-50 rounded-lg p-6 shadow-md w-full max-w-4xl">
              <WildfireTracker eventData={eventData} />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </main>
    </div>
  );
}

export default NaturalDisaster;
