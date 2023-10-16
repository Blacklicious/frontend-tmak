'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, Button } from 'antd';  // Import Checkbox and Button from antd
import Image from '../../../../node_modules/next/image';

// Define the article type
interface ArticleType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...add other fields if needed
}

const MenuArticleDisplay = () => {
  // In your component
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set()); // Assuming id is a string const [showCheckboxes, setShowCheckboxes] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Define the showCheckboxes state
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  
  // Fetch articles from API when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/articles/`, {
          headers: {
            // If needed: Add your headers here
          },
        });
        setArticles(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [backendUrl]);

  const toggleSelectArticle = (id: string) => {
    const newSelectedArticles = new Set(selectedArticles);
    if (newSelectedArticles.has(id)) {
      newSelectedArticles.delete(id);
    } else {
      newSelectedArticles.add(id);
    }
    setSelectedArticles(newSelectedArticles);
  };

  const deleteSelectedArticles = async () => {
    // Implement the logic to delete the selected articles
    const token = localStorage.getItem('access_token'); // Retrieve the token from local storage

    Array.from(selectedArticles).forEach(async (id) => {
      try {
        await axios.delete(`${backendUrl}/posts/api/articles/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add the Authorization header with the token
          }
        });
      } catch (error) {
        console.error(`Failed to delete article with id ${id}:`, error);
      }
    });
    
    // Refresh article list after deleting
    const remainingArticles = articles.filter((article) => !selectedArticles.has(article.id));
    setArticles(remainingArticles);
    setSelectedArticles(new Set()); // Clear selection
  };


  return (
    <div className="bg-white my-4 p-4 overflow-y-auto ">
      <h2 className="text-lg font-semibold">List of Articles</h2>
      <Button onClick={() => {
        if (showCheckboxes) {
          // Deselect all cards if checkboxes are showing
          setSelectedArticles(new Set());
        }
        setShowCheckboxes(!showCheckboxes);
      }}>
      {showCheckboxes ? 'Annuler la selection' : 'Selection Multiple'}
      </Button>
      {showCheckboxes && <Button onClick={deleteSelectedArticles}>Delete Selected</Button>}
      <div className="flex flex-wrap w-full">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className={`card bg-gray-200 my-4 md:mx-4 p-2 rounded-lg h-full w-[100%] md:w-[44%] lg:w-[29%] text-sm ${selectedArticles.has(article.id) ? 'border-4 border-blue-500 shadow-lg' : ''}`}
            onClick={() => showCheckboxes && toggleSelectArticle(article.id)}
          >  
            <Image width={300} height={500}  src={article.file} alt={article.title} className=" w-full  h-[250px] object-cover rounded" />
            <h4 className="text-xl font-semibold mt-2">{article.title}</h4>
            <p>
              {article.content.split(" ").slice(0, 20).join(" ")}
              {article.content.split(" ").length > 20 ? "..." : ""}
            </p>
            <h4 className=" font-semibold mt-2">{article.date}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuArticleDisplay;
