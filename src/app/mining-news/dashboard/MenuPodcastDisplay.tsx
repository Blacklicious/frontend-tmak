'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';  // Import Checkbox and Button from antd
import Image from 'next/image';
// Define the article type
interface PodcastType {
  thumbnail: string;
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}

const MenuPodcastDisplay = () => {
  // In your component
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [selectedPodcasts, setSelectedPodcasts] = useState<Set<string>>(new Set()); // Assuming id is a string const [showCheckboxes, setShowCheckboxes] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Define the showCheckboxes state
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  
  
  // Fetch mPodcasts from API when component mounts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/podcasts/`, {
          headers: {
            // If needed: Add your headers here
          },
        });
        setPodcasts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Podcasts:', error);
      }
    };

    fetchPodcasts();
  }, [backendUrl]);

  const toggleSelectPodcast = (id: string) => {
    const newSelectedPodcasts = new Set(selectedPodcasts);
    if (newSelectedPodcasts.has(id)) {
      newSelectedPodcasts.delete(id);
    } else {
      newSelectedPodcasts.add(id);
    }
    setSelectedPodcasts(newSelectedPodcasts);
  };

  const deleteSelectedPodcasts = async () => {
    // Implement the logic to delete the selected mPodcasts
    const token = sessionStorage.getItem('access_token'); // Retrieve the token from session storage

    Array.from(selectedPodcasts).forEach(async (id) => {
      try {
        await axios.delete(`${backendUrl}/posts/api/podcasts/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add the Authorization header with the token
          }
        });
      } catch (error) {
        console.error(`Failed to delete podcast with id ${id}:`, error);
      }
    });
    
    // Refresh mPodcast list after deleting
    const remainingPodcasts = podcasts.filter((podcast) => !selectedPodcasts.has(podcast.id));
    setPodcasts(remainingPodcasts);
    setSelectedPodcasts(new Set()); // Clear selection
  };


  return (
    <div className="bg-gray-300 my-4 p-4">
      <h2 className="text-lg font-semibold ">List of podcasts</h2>
      <Button onClick={() => {
        if (showCheckboxes) {
          // Deselect all cards if checkboxes are showing
          setSelectedPodcasts(new Set());
        }
        setShowCheckboxes(!showCheckboxes);
      }}>
      {showCheckboxes ? 'Annuler la selection' : 'Selection Multiple'}
      </Button>
      {showCheckboxes && <Button onClick={deleteSelectedPodcasts}>Delete Selected</Button>}
      <div className="flex flex-wrap ">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id} 
            className={`card bg-white p-2 rounded-lg h-full w-[260px] m-4 text-sm ${selectedPodcasts.has(podcast.id) ? 'border-4 border-blue-500 shadow-lg' : ''}`}
            onClick={() => showCheckboxes && toggleSelectPodcast(podcast.id)}
          >    
            <Image  width={300} height={500} src={podcast.thumbnail} title={podcast.title} alt={podcast.title} className="w-full h-[250px] rounded"/>
            
            <h4 className="text-xl font-semibold mt-2">{podcast.title}</h4>
            <p>
              {podcast.content.split(" ").slice(0, 20).join(" ")}
              {podcast.content.split(" ").length > 20 ? "..." : ""}
            </p>
            <h4 className=" font-semibold mt-2">{podcast.date}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPodcastDisplay;
