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
}

const ArticleList: React.FC<{ setSelectedComponent: Function }> = ({ setSelectedComponent }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [sortOrder, setSortOrder] = useState('newest');

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
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  }
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });
  
  return (
    <div className='flex flex-wrap px-1 lg:p-8  text-black '>
      <div className='w-[100%]'>
        <label htmlFor="sortOrder">Trier par : </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Le plus récent</option>
          <option value="oldest">Le plus ancien</option>
        </select>
      </div>
      {sortedArticles.map((article) => {
        const dateObject = new Date(article.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return (
          <div key={article.id} onClick={() => handleArticleClick(article)} className="card rounded-md flex flex-col w-[100%] md:w-[240px] ">
            <div>
              <div className='relative'>
                <div className="w-full h-[175px] rounded ">
                  <Image 
                  src={article.file}
                  title={article.title}
                  layout="fill"
                  objectFit='cover'
                    alt={''}   />
                </div>
              </div>
              <div className='px-1 text-lg md:text-xs lg:text-md font-bold'>
                {truncateToNWords(article.title, 10)}
              </div>
              <div className='px-1 text-xs lg:text-sm'>
                {formattedDate} {/* Using the formatted date */}
              </div>
            </div>  
          </div>
        )
      })}
    </div>
  );
};

export default ArticleList;
