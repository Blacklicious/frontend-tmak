import React, { useState } from 'react';
import MenuVideoAdd from './MenuVideoAdd';
import MenuVideoDisplay from './MenuVideoDisplay';

const MenuVideo = () => {
  const [showVideoAdd, setShowVideoAdd] = useState(false);

  
  return (
    <div className="p-5">
      <div className=" bg-gray-100 shadow-md rounded-sm">
        <div className="flex flex-col p-1 ">
          {/* Row for Filtering */}
          <div className=" px-5 flex flex-wrap w-full justify-between items-center py-2 ">
            <div className="text-3xl font-semibold w-[60%] flex items-center "> Emissions</div>
            {/* You can add your filter form or controls here */}
            <button 
              onClick={() => setShowVideoAdd(!showVideoAdd)}
              className=" bg-gray-900 hover:ring hover:bg-gray-600 text-white text-3xl text-center font-extrabold rounded w-[15%] flex justify-center items-center">
              {showVideoAdd ? 'x' : '+'}
            </button>
          </div>
          {/* Conditionally render the Row for Inputting Videos */}
          {showVideoAdd && <MenuVideoAdd />}
        </div>
      </div>  
      {/* Row for Displaying Videos */}
      <MenuVideoDisplay />
    </div>
  );
}

export default MenuVideo;
