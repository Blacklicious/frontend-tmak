'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


const VideosDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {
  if (!selectedComponent) {
    return <div>Please select an video.</div>;
  }

  return (
    <div className='bg-white rounded-md p-3 text-black'>
      <iframe
        className=""
        width="100%"
        height="500px"
        src={`${selectedComponent.file}`}
        title={`${selectedComponent.title}`}
        allow="autoplay;"
      ></iframe>
      <h1>{selectedComponent.title}</h1>
      <p>{selectedComponent.content}</p>
    </div>
  );
};

export default VideosDetails;
