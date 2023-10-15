import React, { useEffect, useState } from 'react';
import axios from '../../node_modules/axios';
import Image from '../../node_modules/next/image';

const Actuality = () => {
  // Initialize articles state
  const [articles, setArticles] = useState([]);
  // Initially, the first article is selected
  const [selectedArticle, setSelectedArticle] = useState(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch articles when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/api/articles`); // Replace with your API endpoint
        setArticles(response.data);
        // Set the first article as the selected article initially
        const filteredArticles = response.data.filter(article => article.rubrique === 'T-MAK actualité');
        setArticles(filteredArticles);
        // Set the first article as the selected article initially
        setSelectedArticle(filteredArticles[0]);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchArticles();
  }, [backendUrl]); // The empty array means this useEffect will run once when the component mounts


  return (
    <div>
      {/* Our Work Section */}
        <section className=" w-[100vw]">
          <div className=' bg-gray-100 p-4 flex flex-wrap items-center justify-center w-[100%]'>
            <h1 className='text-3xl md:text-5xl font-bold p-5 bg-black w-full h-full text-white'>ACTUALITÉ T-MAK</h1>
            <div className="flex flex-col md:flex-row rounded-md w-full">
              {/* Column 1 */}
              <div className="w-full md:w-[33%] p-5 text-white bg-black/90 align-center">
                <div>
                  {selectedArticle ? (
                    <>
                      <h3 className=" text-xl md:text-4xl mb-4">{selectedArticle.title}</h3>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              {/* Column 2 */}
              <div className="w-full md:w-[66%] bg-black p-5">
                {/* the content and the selected date of the article */}
                <div>
                  {selectedArticle ? (
                    <>
                      <p>{selectedArticle.content}</p>
                      <p>{selectedArticle.date}</p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                {/* the selected article image comes here */}
                <div>
                  {selectedArticle ? (
                      <>
                        <Image src={selectedArticle.file} alt={selectedArticle.title} height={1500} width={1000} />
                      </>
                    ) : (
                      <p>Loading...</p>
                  )}
                </div>
                {/* the list of articles to select from in a carousel */}
                <div className="flex overflow-x-auto">
                  {articles.filter(article => article.rubrique === "T-MAK actualité").map(article => (
                    <div key={article.id} onClick={() => setSelectedArticle(article)} className='w-40 bg-white' >
                      <Image src={article.file} alt={article.title} height={300} width={400}  />
                      <h4>{article.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Actuality;
