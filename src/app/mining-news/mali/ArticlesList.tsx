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
    <div className='flex flex-wrap justify-center text-black'>
      {articles.map((article) => {
        const dateObject = new Date(article.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={article.id} onClick={() => handleArticleClick(article)} className="rounded-md flex flex-col w-[110px] lg:w-48 h-40 lg:h-56 m-2 bg-gray-100">
            <div className="image-container">
            <Image className="image" src={article.file} alt={article.title} priority={true}  height={500} width={300} />
            </div>
            <div className='px-1 text-sm font-bold'>
              {truncateToNWords(article.title, 10)}
            </div>
            <div className='px-1 text-xs'>
              {formattedDate} {/* Using the formatted date */}
            </div>
          </div>  
        )
      })}
    </div>
  );
};

export default ArticleList;
