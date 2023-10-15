import React, { useState } from 'react'
import MenuArticleAdd from './MenuArticleAdd';
import MenuArticleDisplay from './MenuArticleDisplay';

const MenuArticle = () => {
  const [showArticleAdd, setShowArticleAdd] = useState(false);

  return (
    <div className="p-5">
      <div className=" bg-gray-100 shadow-md rounded-sm">
        <div className="flex flex-col p-1 ">
          {/* Row for Filtering */}
          <div className=" px-5 flex flex-wrap w-full justify-between items-center py-2 ">
            <div className="text-3xl font-semibold w-[60%] flex items-center "> Articles</div>
            {/* You can add your filter form or controls here */}
            <button 
              onClick={() => setShowArticleAdd(!showArticleAdd)}
              className=" bg-gray-900 hover:ring hover:bg-gray-600 text-white text-3xl text-center font-extrabold rounded w-[15%] flex justify-center items-center">
              {showArticleAdd ? 'x' : '+'}
            </button>
          </div>
          {/* Conditionally render the Row for Inputting Articles */}
          {showArticleAdd && <MenuArticleAdd />}
        </div>
      </div>  
      {/* Row for Displaying Articles */}
      <MenuArticleDisplay />
    </div>
  );
}

export default MenuArticle;