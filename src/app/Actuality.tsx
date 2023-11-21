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
        const filteredArticles = response.data.filter((article: { rubrique: string }) => article.rubrique === 'T-MAK actualité fr');
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
        <section className=" w-[100vw] ">
          <div className='  p-2 md:p-4 flex flex-wrap items-center justify-center w-full bg-white'>
            <h1 className='text-5xl text-center md:text-6xl  p-6  w-full text-black  rounded-xl font font-black font-oswald '>NOTRE ACTUALITE</h1>
            <div className="flex flex-col lg:flex-row  w-full p-4 justify-between bg-black rounded-xl ">
              {/* Column 2 */}
              <div className="w-full  lg:w-[55%]  items-center h-full md:mr-3  ">
                {/* the list of articles to select from in a carousel */}
                <div className="flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto w-[100%]rounded-xl bg-white rounded-lg mb-3 h-[35vh] md:h-[33vh]">
                  {articles.filter(article => article.rubrique === "T-MAK actualité fr").map(article => (
                    <div 
                        key={article.id} 
                        onClick={() => setSelectedArticle(article)} 
                        className='text-black hover:shadow-lg w-[100%] md:w-[500px] h-[30vh] m-2 p-1 bg-gray-100 rounded-md shadow-md flex flex-row md:flex-col'
                    >
                      <div className="relative h-[15vh] w-[100%] md:w-[300px] lg:w-[300px] sm:h-[10vh] md:h-[21vh] rounded-md ">
                        <Image 
                          src={article.file} 
                          alt={article.title} 
                          layout="fill" 
                          objectFit="cover"
                        />
                      </div>
                      <div className='text-xl md:text-lg text-extrabold font-oswald flex items-center px-3'>{article.title}</div>
                    </div>
                  ))}
                </div>
                {/* the selected article image comes here */}
                <div className='rounded-xl mb-3 lg:mb-0'>
                  {selectedArticle ? (
                    <div className="relative h-[30vh] lg:h-[68vh] ">
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
              <div className="w-full lg:w-[50%] p-3 text-black bg-white align-center rounded-xl overflow-y-auto  h-[50vh] lg:h-[102vh]">
                <div>
                  {selectedArticle ? (
                    <div className='p-3 flex flex-col '>
                      <h3 className=" text-xl lg:text-5xl mb-8 font-oswald">{selectedArticle.title}</h3>
                      <div className=''> {/* Added overflow-y-auto and a max height */}
                          <div 
                            className='text-justify' 
                            style={{ whiteSpace: 'pre-wrap' }}
                            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                          >
                            
                          </div>
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
