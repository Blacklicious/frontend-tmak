'use client';
import React, { useEffect, useState } from 'react';


const MagazinesDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {
  if (!selectedComponent) {
    return <div>Please select an magazine.</div>;
  }
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

  return (
    <div className='bg-white rounded-md p-3 text-black ring ring-gray-500 h-full'>
      <button className="bg-black hover:bg-yellow-500 my-2 text-white font-bold rounded-md w-full h-12 mt-3" onClick={handleShare}>Partagez</button>
      <iframe src={"https://docs.google.com/viewer?url=" + encodeURIComponent(selectedComponent.file) + "&embedded=true"} width="100%" height="94%"></iframe>
    </div>
  );
};

export default MagazinesDetails;
