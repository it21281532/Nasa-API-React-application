import React, { useState, useEffect } from "react";

function ImageOfTheDay() {
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(
    'Please select a date and click "Fetch Image".'
  );

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const fetchData = () => {
    setError("");
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setError("Please select a past or present date.");
      return;
    }

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=yOPGtFFJvRbP0DddzPAkSTr5frBFNZW2EJPb9jkK&date=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setImageData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-blue-600 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <main className="container mx-auto px-6 sm:px-12 py-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          NASA Image of the Day
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <input
            type="date"
            value={date}
            onChange={handleChange}
            className="border-2 border-teal-300 rounded-md p-2 text-teal-900 focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={fetchData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Fetch Image
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
        )}
        {imageData && (
          <div className="mt-8 bg-teal-800 bg-opacity-75 p-6 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              {imageData.title}
            </h2>
            <p className="text-white mb-2">Copyright: {imageData.copyright}</p>
            <p className="text-white mb-4">Date: {imageData.date}</p>
            <p className="text-white mb-6">{imageData.explanation}</p>
            <div className="flex justify-center">
              <img
                src={imageData.url}
                alt={imageData.title}
                className="rounded-lg shadow-md max-w-full"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ImageOfTheDay;
