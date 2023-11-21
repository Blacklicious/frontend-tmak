'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface MagazineType {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  file: string;
  date: string;
  creation: string;
  // ...any other properties you expect
}

const MagazinesList: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [magazines, setMagazines] =  useState<MagazineType[]>([]);
  const [sortOrder, setSortOrder] = useState('newest');

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
  }, [backendUrl]);

  
  const handleMagazineClick = (magazine: MagazineType) => {
    setSelectedComponent(magazine);
  }

  function truncateToNWords(text: string, n: number): string {
    return text.split(/\s+/).slice(0, n).join(' ');
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  }
  const sortedMagazines = [...magazines].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });


  return (
    <div className='flex flex-wrap text-black'>
      <div className='w-[100%]'>
        <label htmlFor="sortOrder">Trier par : </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Le plus récent</option>
          <option value="oldest">Le plus ancien</option>
        </select>
      </div>
      {sortedMagazines.map((magazine) => {
        const dateObject = new Date(magazine.creation);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={magazine.id} onClick={() => handleMagazineClick(magazine)} className="card rounded-md flex flex-col w-[100%] md:w-[280px] ">
            <div>
              <div className="relative">
                <div className="w-full h-[380px] rounded ">
                  <Image 
                  src={magazine.thumbnail}
                  title={magazine.title}
                  layout="fill"
                  objectFit='cover'
                   alt={''}   />
                </div>
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

export default MagazinesList;
