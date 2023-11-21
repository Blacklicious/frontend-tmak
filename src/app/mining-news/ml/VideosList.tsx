'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface VideoType {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  file: string;
  date: string;
  // ...any other properties you expect
}


const Videos: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [sortOrder, setSortOrder] = useState('newest');

  // Fetch Videos when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/videos`); // Replace with your API endpoint
        setVideos(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchVideos();
  }, [backendUrl]);
  
  const handleVideoClick = (video: VideoType) => {
    setSelectedComponent(video);
  }

  function truncateToNWords(text: string, n: number): string {
    return text.split(/\s+/).slice(0, n).join(' ');
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  }
  const sortedVideos = [...videos].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  return (
    <div className='flex p-3 flex-wrap text-black'>
      <div className='w-[100%]'>
        <label htmlFor="sortOrder">Trier par : </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Le plus récent</option>
          <option value="oldest">Le plus ancien</option>
        </select>
      </div>
      {sortedVideos.map((video) => {
        const dateObject = new Date(video.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={video.id} onClick={() => handleVideoClick(video)} className="card rounded-md flex flex-col w-[100%] md:w-[300px] h-[auto] ">
            <div>
              <div className="relative">
                <div className="w-full h-[175px] rounded ">
                  <Image 
                  src={video.thumbnail}
                  title={video.title}
                  layout="fill"
                  objectFit='cover'
                   alt={''}   />
                </div>
                <div
                  className="absolute inset-0 z-1"
                  onClick={() => handleVideoClick(video)}
                >
                </div>
              </div>
            </div>
            <div className='px-3 text-md font-bold pt-2'>
              {truncateToNWords(video.title, 10)}
            </div>
            <div className='px-3 text-sm'>
            {formattedDate} {/* Using the formatted date */}
            </div>
          </div>  
        )  
      })}
    </div>

  );
};

export default Videos;
