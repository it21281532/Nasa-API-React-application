import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <>
    <div className="mt-4 text-lg font-bold text-gray-400 ml-10">Fetching data...</div>
    <div className="loader-container ">
      <div className="loader"></div>
    </div>
   
      
    
    </>
  );
};

export default Loader;
