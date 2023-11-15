'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface PodcastType {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  file: string;
  date: string;
  // ...any other properties you expect
}
 
const Podcasts: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);

  // Fetch Podcastss when component mounts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/podcasts`); // Replace with your API endpoint
        setPodcasts(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchPodcasts();
  }, [backendUrl]);

  
  const handlePodcastClick = (podcast: PodcastType) => {
    setSelectedComponent(podcast);
  }

  function truncateToNWords(text: string, n: number): string {
    return text.split(/\s+/).slice(0, n).join(' ');
  }


  return (
    <div>
      <div className="bg-black flex items-center justify-center text-black font-bold py-1  text-xl three-color-gradient shadow-lg h-3"> 
      </div> 
      <div className="flex flex-col md:flex-row  h-full">
        {/* Podcasts List */}
        <div className="bg-gray-300 w-full md:w-2/6 overflow-y-auto">
          {podcasts.map((podcast) => (
            <div key={podcast.id} onClick={() => handlePodcastClick(podcast)} className="rounded-lg hover:shadow-lg flex flex-col w-[48%] md:w-[24%]  my-4 bg-gray-100">
              <div className="w-full h-[175px] rounded ">
                <Image 
                src={podcast.thumbnail}
                title={podcast.title}
                layout="fill"
                objectFit='cover'
                alt={podcast.title}   />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
