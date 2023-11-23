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
    <div className='bg-white p-6 rounded-lg text-black'>
      <button className="bg-black hover:bg-yellow-500 my-4 text-white font-bold rounded-md w-full h-12 " onClick={handleShare}>Partagez</button>
      {selectedComponent.link && (
        <iframe
          className="w-full object-cover rounded-lg"
          width="560"
          height="615"
          src={`${selectedComponent.link}`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      )}
      {!selectedComponent.link && (
        <Image
          className="image ring ring-yellow-500  rounded-t-xl"
          width="560"
          height="315"
          src={`${selectedComponent.file}`}
          title={`${selectedComponent.title}`}
          alt={`${selectedComponent.title}`}
        />
        
      )}
      <h1 className='text-center w-full font font-bold text-2xl md:text-4xl p-6 mb-6 bg-black ring ring-yellow-500 ring-6 text-white rounded-b-xl'>{selectedComponent.title}</h1>
        
      <div className='px-4 md:px-[18%]'>
        <div 
          className='text-justify' 
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: selectedComponent.content }}
        >
          
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
