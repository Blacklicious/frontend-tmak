'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the article type
interface MagazineType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}

const Magazine: React.FC = () => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selectedContent, setSelectedContent] = useState(null);
  const [magazines, setMagazines] = useState<MagazineType[]>([]);
  const [selectedMagazine, setSelectedMagazine] = useState<MagazineType | null>(null);

  // Fetch magazines when component mounts
  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/magazines`); // Replace with your API endpoint
        setMagazines(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchMagazines();
  }, [backendUrl]);

  
  const handleClick = (magazine: MagazineType) => {
    setSelectedMagazine(magazine);
  };


  return (
    <div>
      <div className="bg-black flex items-center justify-center text-black font-bold py-1  text-xl three-color-gradient shadow-lg h-3"> 
      </div>  
    <div className="flex flex-col md:flex-row  h-full">
        {/* magazine List */}
        <div className="bg-gray-300 w-full md:w-2/6 overflow-y-auto">
          {magazines.map((magazine) => (
            <div key={magazine.id} onClick={() => handleClick(magazine)} className="card">
              {magazine.title}
            </div>
          ))}
        </div>

        {/* magazine Details */}
        <div className="bg-gray-100 w-full md:w-4/6 p-4 overflow-y-auto">
          {selectedMagazine && (
            <>
              <iframe className="w-full h-[85vh] bg-white" src={selectedMagazine.file} alt={selectedMagazine.title} width={500} height={300} />
              <button onClick={() => alert('Share this magazine!')}>Share</button>
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

export default Magazine;
