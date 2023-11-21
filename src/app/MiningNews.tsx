import React from 'react'
import Link from 'next/link';
import Image from '../../node_modules/next/image';


const MiningNews = () => {
  return (
    <div>
        {/* Minings News Section */}
        <div id="mining-news-section" className="w-[100%] flex flex-col justify-center items-center p-4  bg-white text-black">
          <h1 className="text-5xl md:text-6xl font-bold m-5 font-oswald ">MINING NEWS</h1>
          <p className="text-sm md:text-xl mb-5 px-4 md:px-[14vw] mt-4 ">
            Vous recherchez les informations les plus fiables et récentes sur l&apos;industrie minière en Afrique ?
            Chez T-MAK Corporation, nous sommes la référence en matière de couverture des actualités minières à travers 
            tout le continent africain.
          </p>
            
          <div className=" flex flex-wrap p-1 justify-between text-sm text-center "> 
            <Link href="/mining-news/ml" className='w-[50%] md:w-[200px] lg:w-[250px]'>
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/mining-news-button/maliminingsnews.PNG" alt="Mali News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">MALI MINING NEWS</h3>
                 
                </div>
              </div>
            </Link>
            <Link href="/mining-news/ci" className='w-[50%] md:w-[200px] lg:w-[250px]'>

              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">COTE D&apos;IVOIRE MINING NEWS</h3>
                 
                </div>
              </div>
            </Link> 
            <Link href="/mining-news/gn" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">GUINÉE MINING NEWS</h3>
                 
                </div>
              </div>
            </Link>
            <Link href="/mining-news/bf" className='w-[50%] md:w-[200px] lg:w-[250px]'>
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">BURKINA MINING NEWS</h3>
                 
                </div>
              </div>
            </Link>
            <Link href="/mining-news/ne" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">NIGER MINING NEWS</h3>
                 
                </div>
              </div>
            </Link >
          </div>
        </div>
      </div>
  );
}

export default MiningNews