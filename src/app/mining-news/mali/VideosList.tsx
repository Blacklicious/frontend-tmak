'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Videos: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(null);

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

  
  const handleVideoClick = (video) => {
    setSelectedComponent(video);
  }
  
  function truncateToNWords(text, n) {
    return text.split(/\s+/).slice(0, n).join(' ');
  }

  return (
    <div className='flex flex-wrap text-black'>
      {videos.map((video) => {
        const dateObject = new Date(video.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={video.id} onClick={() => handleVideoClick(video)} className="card rounded-md flex flex-col w-[100%] md:w-48 h-56 ">
            <div>
              <div style={{ position: 'relative' }}>
                <iframe   
                    src={video.file} 
                    title={video.title} 
                    className="w-full h-[175px] rounded " 
                    style={{ zIndex: -1 }}
                  >
                  </iframe>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0,
                      zIndex: 1
                    }}
                    onClick={() => handleVideoClick(video)}
                  >

                  </div>
                </div>
              </div>
            <div className='px-1 text-md font-bold'>
              {truncateToNWords(video.title, 10)}
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

export default Videos;
