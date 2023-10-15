import React, { useState } from 'react';
import MenuVideoAdd from './MenuVideoAdd';
import MenuVideoDisplay from './MenuVideoDisplay';

const MenuVideo = () => {
  const [showVideoAdd, setShowVideoAdd] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 py-2 px-5 flex flex-wrap w-full justify-between items-center">
        <div className="text-lg font-semibold w-[60%] h-14 p-4 items-center">Videos</div>
        <button 
          onClick={() => setShowVideoAdd(!showVideoAdd)}
          className="p-2 bg-gray-900 text-white text-4xl text-center font-extrabold rounded w-[15%] h-14 items-center">
          {showVideoAdd ? 'x' : '+'}
        </button>
      </div>
      
      {showVideoAdd && <MenuVideoAdd />}
      
      <MenuVideoDisplay />
    </div>
  );
}

export default MenuVideo;
