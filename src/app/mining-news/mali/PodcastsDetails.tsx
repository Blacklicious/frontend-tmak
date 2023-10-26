'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


const PodcastsDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {
  const handleShare = async () => {
    console.log('Attempting to share');
  
    if (navigator.share) {
      console.log('Web Share API is supported tg');
  
      try {
        const podcastUrl = `${window.location.origin}/podcasts/${selectedComponent.id}`; 
        await navigator.share({
          title: selectedComponent.title,
          text: selectedComponent.content,
          url: podcastUrl,
        });
  
        console.log('podcast shared successfully');
      } catch (error) {
        console.error('Something went wrong sharing the podcast', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };

  if (!selectedComponent) {
    return <div>Please select an Podcast.</div>;
  }

  return (
    <div className='bg-white rounded-md p-3 text-black'>
      {selectedComponent.link && (
        <iframe
          width="560"
          height="315"
          src={`${selectedComponent.link}`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      )}
      {!selectedComponent.link && (
        <Image
          className="image"
          width="560"
          height="315"
          src={`${selectedComponent.file}`}
          title={`${selectedComponent.title}`}
          alt={`${selectedComponent.title}`}
        />
      )}
      <h1 className='text-center w-full font font-bold text-2xl md:text-3xl pt-10 md:px-20 '>{selectedComponent.title}</h1>
      <p className=' py-6 md:px-20 text-center '>{selectedComponent.content}</p>
      <button className="bg-blue-300 rounded-md w-full h-12 mt-3" onClick={handleShare}>Partagez</button>
    </div>
  );
}
export default PodcastsDetails;
