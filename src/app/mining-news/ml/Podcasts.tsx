'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Define the article type
interface PodcastType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}


const Podcast: React.FC = () => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [selectedPodcasts, setSelectedPodcasts] = useState<PodcastType | null>(null);

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

  
  const handleClick = (podcast: PodcastType) => {
    setSelectedPodcasts(podcast);
  };

  return (
    <div>
      <div className="bg-black flex items-center justify-center text-black font-bold py-1  text-xl three-color-gradient shadow-lg h-3"> 
      </div> 
      <div className="flex flex-col md:flex-row  h-full">
        {/* Podcasts List */}
        <div className="bg-gray-300 w-full md:w-2/6 overflow-y-auto">
          {podcasts.map((podcast) => (
            <div key={podcast.id} onClick={() => handleClick(podcast)} className="card">
              {podcast.title}
            </div>
          ))}
        </div>

        {/* Podcasts Details */}
        <div className="bg-gray-100 w-full md:w-4/6 p-4 overflow-y-auto">
          {selectedPodcasts && (
            <>
              <iframe className="w-full h-[85vh] bg-white" src={selectedPodcasts.file}  width={500} height={300} />
              <button onClick={() => alert('Share this Podcasts!')}>Share</button>
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

export default Podcast;
