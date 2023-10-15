import Head from 'next/head';
import React from 'react';

const About: React.FC = () => {
    return (
      <div>
        <Head>
          <title>About</title>
        </Head>
        <main className="w-full flex flex-col items-center justify-between bg-gray-100">
          {/* Other content */}
              {/* Remove Card Component temporarily */}
            <div className="flex flex-col md:flex-row items-center w-full">
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_4.jpg" className='md:w-3/6'/>
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_5.jpg" className='md:w-3/6' />
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
                <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_6.jpg" className='md:w-3/6' />
                <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_3.jpg" className='md:w-3/6' />
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_7.jpg" className='md:w-3/6'/>
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_8.jpg"className='md:w-3/6'/>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_9.jpg" className='md:w-3/6'/>
              <img alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_10.jpg"className='md:w-3/6'/>
            </div>
        </main>
      </div>
    );
  };

export default About;