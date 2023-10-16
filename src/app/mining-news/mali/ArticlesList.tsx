'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface ArticleType {
  id: string;
  title: string;
  content: string;
  file: string;
  date: string;
  // ...any other properties you expect
}

const ArticleList: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [articles, setArticles] = useState<ArticleType[]>([]);

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

    
  const handleArticleClick = (article: ArticleType) => {
    setSelectedComponent(article);
  }

  function truncateToNWords(text: string, n: number): string {
    return text.split(/\s+/).slice(0, n).join(' ');
  }

  
  return (
    <div className='flex flex-wrap text-black'>
      {articles.map((article) => {
        const dateObject = new Date(article.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={article.id} onClick={() => handleArticleClick(article)} className="card rounded-md flex flex-col md:w-48 h-56  ">
            <div className="image-container">
            <Image className="image" src={article.file} alt={article.title} priority={true}  height={500} width={500} />
            </div>
            <div className='px-1 text-md font-bold'>
              {truncateToNWords(article.title, 10)}
            </div>
            <div className='px-1 text-sm'>
              {formattedDate} {/* Using the formatted date */}
            </div>
          </div>  
        )
      })}
    </div>
  );
};

export default ArticleList;
