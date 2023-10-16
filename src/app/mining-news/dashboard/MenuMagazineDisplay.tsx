'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';  // Import Checkbox and Button from antd

// Define the article type
interface MagzineType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}

const MenuMagazineDisplay = () => {
  // In your component
  const [magazines, setMagazines] = useState<MagzineType[]>([]);
  const [selectedMagazines, setSelectedMagazines] = useState<Set<string>>(new Set()); // Assuming id is a string const [showCheckboxes, setShowCheckboxes] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Define the showCheckboxes state
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // Fetch magazines from API when component mounts
  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/magazines/`, {
          headers: {
            // If needed: Add your headers here
          },
        });
        setMagazines(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching magazines:', error);
      }
    };

    fetchMagazines();
  }, [backendUrl]);

  const toggleSelectMagazine = (id: string) => {
    const newSelectedMagazines = new Set(selectedMagazines);
    if (newSelectedMagazines.has(id)) {
      newSelectedMagazines.delete(id);
    } else {
      newSelectedMagazines.add(id);
    }
    setSelectedMagazines(newSelectedMagazines);
  };

  const deleteSelectedMagazines = async () => {
    // Implement the logic to delete the selected magazines
    const token = localStorage.getItem('access_token'); // Retrieve the token from local storage

    Array.from(selectedMagazines).forEach(async (id) => {
      try {
        await axios.delete(`${backendUrl}/posts/api/magazines/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add the Authorization header with the token
          }
        });
      } catch (error) {
        console.error(`Failed to delete magazine with id ${id}:`, error);
      }
    });
    
    // Refresh magazine list after deleting
    const remainingMagazines = magazines.filter((magazine) => !selectedMagazines.has(magazine.id));
    setMagazines(remainingMagazines);
    setSelectedMagazines(new Set()); // Clear selection
  };


  return (
    <div className="bg-gray-300 my-4 p-4">
      <h2 className="text-lg font-semibold ">List of magazines</h2>
      <Button onClick={() => {
        if (showCheckboxes) {
          // Deselect all cards if checkboxes are showing
          setSelectedMagazines(new Set());
        }
        setShowCheckboxes(!showCheckboxes);
      }}>
      {showCheckboxes ? 'Annuler la selection' : 'Selection Multiple'}
      </Button>
      {showCheckboxes && <Button onClick={deleteSelectedMagazines}>Delete Selected</Button>}
      <div className="flex flex-wrap ">
        {magazines.map((magazine) => (
          <div 
            key={magazine.id} 
            className={`card bg-white p-2 rounded-lg h-full w-[260px] m-4 text-sm ${selectedMagazines.has(magazine.id) ? 'border-4 border-blue-500 shadow-lg' : ''}`}
            onClick={() => showCheckboxes && toggleSelectMagazine(magazine.id)}
          >  
            <iframe src={magazine.file} title={magazine.title} className="w-full h-[250px] rounded"></iframe>
            
            <h4 className="text-xl font-semibold mt-2">{magazine.title}</h4>
            <p>
              {magazine.content.split(" ").slice(0, 20).join(" ")}
              {magazine.content.split(" ").length > 20 ? "..." : ""}
            </p>
            <h4 className=" font-semibold mt-2">{magazine.date}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuMagazineDisplay;
