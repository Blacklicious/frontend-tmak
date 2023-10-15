'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';


const ArticlesDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {
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
    </div>
  );
};

export default ArticlesDetails;
