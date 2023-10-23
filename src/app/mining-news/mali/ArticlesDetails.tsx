'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';


const ArticlesDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {

  const handleShare = async () => {
    console.log('Attempting to share');
  
    if (navigator.share) {
      console.log('Web Share API is supported tg');
  
      try {
        const articleUrl = `${window.location.origin}/articles/${selectedComponent.id}`; 
        await navigator.share({
          title: selectedComponent.title,
          text: selectedComponent.content,
          url: articleUrl,
        });
  
        console.log('Article shared successfully');
      } catch (error) {
        console.error('Something went wrong sharing the article', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };


  if (!selectedComponent) {
    return <div>Please select an article.</div>;
  }

  return (
    <div className='bg-white rounded-md p-3 text-black'>
      {selectedComponent.youtubeLink && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${selectedComponent.youtubeLink}`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      )}
      {!selectedComponent.youtubeLink && (
        <Image
          className="image"
          width="560"
          height="315"
          src={`${selectedComponent.file}`}
          title={`${selectedComponent.title}`}
          alt={`${selectedComponent.title}`}
        />
      )}
      <h1>{selectedComponent.title}</h1>
      <p>{selectedComponent.content}</p>
      <button className="bg-blue-300 rounded-md w-full h-12 mt-3" onClick={handleShare}>Partagez</button>
    </div>
  );
};

export default ArticlesDetails;
