'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


const Magazine: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [magazines, setMagazines] = useState([]);

  // Fetch magazines when component mounts
  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/magazines`); // Replace with your API endpoint
        setMagazines(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchMagazines();
  }, []);

  const handleMagazineClick = (magasine) => {
    setSelectedComponent(magasine);
  }
  
  function truncateToNWords(text, n) {
    return text.split(/\s+/).slice(0, n).join(' ');
  }

  return (
    <div className='flex flex-wrap text-black'>
      {magazines.map((magazine) => {
        const dateObject = new Date(magazine.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={magazine.id} onClick={() => handleMagazineClick(magazine)} className="card rounded-md flex flex-col w-full md:w-48 h-56">
            <div>
              <div className="relative">
                <iframe
                  src={magazine.file}
                  title={magazine.title}
                  className="w-full h-[175px] rounded z-[-1]"
                >
                </iframe>
                <div
                  className="absolute inset-0 z-1"
                  onClick={() => handleMagazineClick(magazine)}
                >
                </div>
              </div>
            </div>
            <div className='px-1 text-md font-bold'>
              {truncateToNWords(magazine.title, 10)}
            </div>
            <div className='px-1 text-sm'>
            {formattedDate} {/* Using the formatted date */}
            </div>
          </div>  
        )  
      })}
    </div>

  );
};

export default Magazine;