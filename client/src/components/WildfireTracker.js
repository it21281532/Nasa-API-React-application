import React, { useState } from "react";
import { Icon } from "@iconify/react";
import fireAlert from "@iconify/icons-mdi/fire-alert";
import volcanoIcon from "@iconify/icons-mdi/volcano";
import stormIcon from "@iconify/icons-mdi/water-outline";

const WildfireTracker = ({ eventData }) => {
  const [filteredData, setFilteredData] = useState([]);

  // Function to filter eventData based on category ID
  const filterData = (id) => {
    const filtered = eventData.filter((ev) => ev.categories[0].id === id);
    setFilteredData(filtered);
  };

  const locationsInfo = filteredData.map((ev) => {
    const category = ev.categories[0];
    const geometry = ev.geometries[0];
    let icon = null;
    let iconColor = "black";

    // Determine which icon to display based on category ID
    if (category.id === 8) {
      icon = fireAlert;
      iconColor = "red";
    } else if (category.id === 12) {
      icon = volcanoIcon;
      iconColor = "orange";
    } else if (category.id === 15) {
      icon = stormIcon;
      iconColor = "blue";
    }

    return (
      <div
        className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 grid-item"
        key={ev.id}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-bold">{ev.id}</div>
          <div>
            <Icon
              icon={icon}
              className="location-icon"
              style={{ color: iconColor, fontSize: "2rem" }}
            />
          </div>
        </div>
        <div className="font-bold" style={{ color: "red" }}>
          {category.title}
        </div>
        <div className="bg-slate-300 rounded-xl mt-3 pt-2 pb-2">
            <div className="ml-3"><span className="font-bold">Category ID : </span>{category.id}</div>
            <div className="ml-3 font-bold">{ev.title}</div>
            <div className="ml-3"><span className="font-bold">Geometry Date : </span>{geometry.date.split("T")[0]}</div>
            <div className="ml-3">
            <span className="font-bold">Lat : </span>
              {geometry.coordinates[1]}
              <span className="font-bold">, Lng : </span>{geometry.coordinates[0]}
            </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="container mx-auto py-8 pr-4 pl-4 rounded-xl"
      // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
    >
      
      <h1 className="text-3xl font-bold mb-4 text-white">
        Natural Disaster Tracker
      </h1>
      <div className="flex mb-4">
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-xl flex items-center
          hover:border-black border hover:bg-white  hover:text-black
           transition-all duration-4000 ease"
          onClick={() => filterData(8)}
        >
          <span>Wild Fire </span>
          {filteredData.some((ev) => ev.categories[0].id === 8) && (
            <Icon
              icon={fireAlert}
              className="location-icon ml-2"
              style={{ color: "red", fontSize: "1.5rem" }}
            />
          )}
        </button>
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-xl flex items-center
          hover:border-black border hover:bg-white  hover:text-black
           transition-all duration-4000 ease"
          onClick={() => filterData(12)}
        >
          <span>Volcano </span>
          {filteredData.some((ev) => ev.categories[0].id === 12) && (
            <Icon
              icon={volcanoIcon}
              className="location-icon ml-2"
              style={{ color: "orange", fontSize: "1.5rem" }}
            />
          )}
        </button>
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-xl flex items-center
          hover:border-black border hover:bg-white  hover:text-black
           transition-all duration-4000 ease"
          onClick={() => filterData(15)}
        >
          <span>Ice Burge </span>
          {filteredData.some((ev) => ev.categories[0].id === 15) && (
            <Icon
              icon={stormIcon}
              className="location-icon ml-2"
              style={{ color: "blue", fontSize: "1.5rem" }}
            />
          )}
        </button>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locationsInfo}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locationsInfo.length > 0 ? (
          locationsInfo
        ) : (
          <div className="w-3/4 mx-auto">
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-2xl text-white font-bold justify-center">Select Category </p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            <p className="text-center text-transparent">My Application</p>
            

          </div>
        )}
      </div>
    </div>
  );
};

export default WildfireTracker;
