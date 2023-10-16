'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


const Article: React.FC = () => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selectedContent, setSelectedContent] = useState(null);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch articles when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/articles`); // Replace with your API endpoint
        setArticles(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchArticles();
  }, [backendUrl]);

  const handleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div style={{
      transition: " 0.3s ease-in-out",
      overflow: "hidden"
    }} >
      <div className=" bg-black flex items-center justify-center text-black font-bold   text-xl three-color-gradient shadow-lg h-3"> 
      </div> 
      <div className="flex flex-col md:flex-row  h-full">
        {/* Article List */}
        <div className="bg-gray-300 w-full md:w-2/6 overflow-y-auto h-[45vh] text-sm">
          {articles.map((article) => (
            <div key={article.id} onClick={() => handleClick(article)} className="card rounded-md flex flex-row">
              <div>
                <Image className="w-24 bg-white" src={article.file} alt={article.title} width={500} height={300} />
              </div>
              <div className='px-5 text-xl text-bold'>
                {article.title}
              </div>
            </div>
          ))}
        </div>

        {/* Article Details */}
        <div className="bg-gray-100 w-full md:w-4/6 p-4 overflow-y-auto h-full">
          {selectedArticle && (
            <>
              <Image className="w-full bg-white" src={selectedArticle.file} alt={selectedArticle.title} width={500} height={300} />
              <h2 className='text-2xl font-bold my-3'>{selectedArticle.title}</h2>
              <p>{selectedArticle.content}</p>
              <p className='text-lg font-bold my-1' >Date: {selectedArticle.date}</p>
              <button onClick={() => alert('Share this article!')}>Share</button>
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

export default Article;
