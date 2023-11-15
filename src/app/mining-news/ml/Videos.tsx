'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Define the article type
interface VideoType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}

const Videos: React.FC = () => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [videos, setVideos] = useState<VideoType[]>([]);

  const [selectedVideos, setSelectedVideos] = useState<VideoType | null>(null);

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

  
  const handleClick = (video: VideoType) => {
    setSelectedVideos(video);
  };

  return (
    <div>
      <div className="bg-black flex items-center justify-center text-black font-bold py-1  text-xl three-color-gradient shadow-lg h-3"> 
      </div> 
      <div className="flex flex-col md:flex-row  h-full">
        {/* Video List */}
        <div className="bg-gray-300 w-full md:w-2/6 overflow-y-auto">
          {videos.map((video) => (
            <div key={video.id} onClick={() => handleClick(video)} className="card flex flex-row items-center space-x-6 rounded-md">
              <iframe src={video.file} title={video.title} className="w-[75px] h-[75px] rounded"></iframe>        
              <div className='flex flex-col'>
                <h4 className="text-xl font-semibold mt-2">{video.title}</h4>
                <p>
                  {video.content.split(" ").slice(0, 20).join(" ")}
                  {video.content.split(" ").length > 20 ? "..." : ""}
                </p>
              </div>
            </div> 
          ))}
        </div>

        {/* Video Details */}
        <div className="bg-gray-100 w-full md:w-4/6 p-4 overflow-y-auto">
          {selectedVideos && (
            <>
              <iframe className="w-full h-full bg-white" src={selectedVideos.file} width={500} height={300} />
              <button onClick={() => alert('Share this Video!')}>Share</button>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .card {
          padding: 15px;
          margin: 10px;
          background-color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Videos;
