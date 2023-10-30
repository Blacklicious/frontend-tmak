import React from 'react'
import Link from '../../node_modules/next/link';
import Image from '../../node_modules/next/image';

const MiningNews = () => {
  return (
    <div>
        {/* Minings News Section */}
        <div className="w-full  flex flex-col justify-center items-center p-4  bg-white text-black">
          <h1 className="text-3xl md:text-6xl font-bold m-5 font-oswald ">MINING NEWS</h1>
          <p className="text-md mb-5 px-[8vw] ">
            Vous êtes en quête des informations les plus fiables et actuelles sur le secteur minier en Afrique ?
             Chez T-MAK Corporation, nous sommes la référence en matière de couverture d&apos;actualités minières
             sur l&apos;ensemble du continent africain.
          </p>
            
          <div className="justify-center"> 
            <Link href="/mining-news/mali" className='flex flex-wrap justify-center text-sm text-center'>
              <div className="m-4 hover:shadow-lg transition-shadow duration-300 ease-in-out" style={{ width: '250px' }}>
                <div className="relative bg-black/90 p-8">
                  <Image width={300} height={500} src="/mining-news-button/maliminingsnews.PNG" alt="Mali News" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">MALI MINING NEWS</h3>
                  <p></p>
                </div>
              </div>
              <div className="m-4 hover:shadow-lg transition-shadow duration-300 ease-in-out" style={{ width: '250px' }}>
                <div className="relative bg-black/90 p-8">
                  <Image width={300} height={500} src="/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">COTE D&apos;IVOIRE MINING NEWS</h3>
                  <p></p>
                </div>
              </div>
              <div className="m-4 hover:shadow-lg transition-shadow duration-300 ease-in-out" style={{ width: '250px' }}>
                <div className="relative bg-black/90 p-8">
                  <Image width={300} height={500} src="/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">GUINÉE MINING NEWS</h3>
                  <p></p>
                </div>
              </div>
              <div className="m-4 hover:shadow-lg transition-shadow duration-300 ease-in-out" style={{ width: '250px' }}>
                <div className="relative bg-black/90 p-8">
                  <Image width={300} height={500} src="/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">BURKINA MINING NEWS</h3>
                  <p></p>
                </div>
              </div>
              <div className="m-4 hover:shadow-lg transition-shadow duration-300 ease-in-out" style={{ width: '250px' }}>
                <div className="relative bg-black/90 p-8">
                  <Image width={300} height={500} src="/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">NIGER MINING NEWS</h3>
                  <p></p>
                </div>
              </div>
            </Link >
          </div>
        </div>
      </div>
  );
}

export default MiningNews