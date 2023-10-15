'use client';
import React, { useEffect, useState } from 'react';


const MagazinesDetails: React.FC<{ selectedComponent: any }> = ({ selectedComponent }) => {
  if (!selectedComponent) {
    return <div>Please select an magazine.</div>;
  }

  return (
    <div className='bg-white rounded-md p-3 text-black ring ring-gray-500 h-full'>
      <button className='w-full my-2 h-8 bg-blue-200 hover:bg-blue-400 rounded-md ' onClick={() => alert('Share this magazine!')}>Share</button>
      <iframe src={"https://docs.google.com/viewer?url=" + encodeURIComponent(selectedComponent.file) + "&embedded=true"} width="100%" height="94%"></iframe>
    </div>
  );
};

export default MagazinesDetails;
