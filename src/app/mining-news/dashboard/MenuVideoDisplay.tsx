'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Button } from 'antd';  // Import Checkbox and Button from antd


const MenuVideoDisplay = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  
  // Fetch videos from API when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/videos/`, {
          headers: {
            // If needed: Add your headers here
          },
        });
        setVideos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const toggleSelectVideo = (id) => {
    const newSelectedVideos = new Set(selectedVideos);
    if (newSelectedVideos.has(id)) {
      newSelectedVideos.delete(id);
    } else {
      newSelectedVideos.add(id);
    }
    setSelectedVideos(newSelectedVideos);
  };

  const deleteSelectedVideos = async () => {
    // Implement the logic to delete the selected videos
    const token = localStorage.getItem('access_token'); // Retrieve the token from local storage

    Array.from(selectedVideos).forEach(async (id) => {
      try {
        await axios.delete(`${backendUrl}/posts/api/videos/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add the Authorization header with the token
          }
        });
      } catch (error) {
        console.error(`Failed to delete video with id ${id}:`, error);
      }
    });
    
    // Refresh video list after deleting
    const remainingVideos = videos.filter((video) => !selectedVideos.has(video.id));
    setVideos(remainingVideos);
    setSelectedVideos(new Set()); // Clear selection
  };


  return (
    <div className="bg-gray-300 my-4 p-4">
      <h2 className="text-lg font-semibold ">List of videos</h2>
      <Button onClick={() => {
        if (showCheckboxes) {
          // Deselect all cards if checkboxes are showing
          setSelectedVideos(new Set());
        }
        setShowCheckboxes(!showCheckboxes);
      }}>
      {showCheckboxes ? 'Annuler la selection' : 'Selection Multiple'}
      </Button>
      {showCheckboxes && <Button onClick={deleteSelectedVideos}>Delete Selected</Button>}
      <div className="flex flex-wrap ">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className={`card bg-white p-2 rounded-lg h-full w-[260px] m-4 text-sm ${selectedVideos.has(video.id) ? 'border-4 border-blue-500 shadow-lg' : ''}`}
            onClick={() => showCheckboxes && toggleSelectVideo(video.id)}
          >  
            <iframe src={video.file} title={video.title} className="w-full h-[250px] rounded"></iframe>
            
            <h4 className="text-xl font-semibold mt-2">{video.title}</h4>
            <p>
              {video.content.split(" ").slice(0, 20).join(" ")}
              {video.content.split(" ").length > 20 ? "..." : ""}
            </p>
            <h4 className=" font-semibold mt-2">{video.date}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuVideoDisplay;
