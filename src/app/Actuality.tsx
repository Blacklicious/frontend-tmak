import React, { useEffect, useState } from 'react';
import axios from '../../node_modules/axios';
import Image from '../../node_modules/next/image';


interface Article {
  title: string;
  rubrique: string;
  // Add other properties as needed, like content, date, file, id
  content: string;
  date: string;
  file: string;
  id: string;
} 

const Actuality = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  // Fetch articles when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/articles`);
        console.log("response.data", response.data);
        const filteredArticles = response.data.filter((article: { rubrique: string }) => article.rubrique === 'T-MAK actualité');
        setArticles(filteredArticles);
        setSelectedArticle(filteredArticles[0]);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
  
    fetchArticles();
  }, [backendUrl]);
  
  function truncateContent(content: string, wordLimit: number) {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
  
  return (
    <div>
      {/* Our Work Section */}
        <section className=" w-[100vw]">
          <div className='  p-4 flex flex-wrap items-center justify-center w-[100%] bg-white'>
            <h1 className='text-3xl text-center md:text-6xl  p-5  w-full h-full text-black  rounded-xl font font-black font-oswald '>NOTRE ACTUALITÉ</h1>
            <div className="flex flex-col lg:flex-row  w-full p-3 justify-between bg-black">

              {/* Column 2 */}
              <div className="w-full lg:w-[60%] items-center justify-center ">
                {/* the list of articles to select from in a carousel */}
                <div className="flex overflow-x-auto rounded-xl bg-white my-3 p-1">
                  {articles.filter(article => article.rubrique === "T-MAK actualité").map(article => (
                    <div key={article.id} onClick={() => setSelectedArticle(article)} className='text-black hover:shadow-lg rounded-md w-[40%] sm:w-[22%] h-full m-2 p-1 bg-gray-100 shadow-md' >
                      <Image src={article.file} alt={article.title} height={300} width={300}  />
                      <div className='text-sm'>{article.title}</div>
                    </div>
                  ))}
                </div>
                {/* the selected article image comes here */}
                <div className='rounded-xl'>
                  {selectedArticle ? (
                    <div className="relative lg:h-[45vh] ">
                      <Image 
                        className='rounded-xl'
                        layout="fill" // This will make the image take the full dimensions of the parent div
                        src={selectedArticle.file} 
                        alt={selectedArticle.title} 
                        objectFit="cover" // This should prevent distortion
                      />
                    </div>
                    
                    ) : (
                      <p>Loading...</p>
                  )}
                </div>
              </div>
              {/* Column 1 */}
              <div className="w-full lg:w-[38%] p-3 text-black bg-white align-center rounded-xl">
                <div>
                  {selectedArticle ? (
                    <div className='p-3'>
                      <h3 className=" text-xl md:text-3xl mb-4">{selectedArticle.title}</h3>
                      <div className='text-md'>
                        <p>
                          {showFullContent ? selectedArticle.content : truncateContent(selectedArticle.content, 250)}
                        </p>
                        {selectedArticle.content.split(' ').length > 90 && (
                          <button className="w-full bg-blue-400 hover:bg-blue-500 rounded-md my-2" onClick={() => setShowFullContent(!showFullContent)}>
                            {showFullContent ? 'Lire moins' : 'Lire plus'}
                          </button>
                        )}
                        <p>{selectedArticle.date}</p>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Actuality;
