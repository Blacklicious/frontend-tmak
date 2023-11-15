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


  return (
    <div className='flex p-3 flex-wrap text-black'>
      {videos.map((video) => {
        const dateObject = new Date(video.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={video.id} onClick={() => handleVideoClick(video)} className="card rounded-md flex flex-col w-[100%] md:w-[300px] h-full ">
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
            <div className='px-3 text-md font-bold'>
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
