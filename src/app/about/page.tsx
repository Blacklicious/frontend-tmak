import Head from 'next/head';
import React from 'react';
import Image from '../../../node_modules/next/image';

const About: React.FC = () => {
    return (
      <div>
        <Head>
          <title>About</title>
        </Head>
        <main className=" flex flex-col items-center justify-between bg-gray-100">
          {/* Other content */}
              {/* Remove Card Component temporarily */}
            <div className="flex flex-col md:flex-row items-center w-full">
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_4.jpg" className='w-[100vw] md:w-3/6'/>
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_5.jpg" className='w-[100vw] md:w-3/6' />
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
                <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_6.jpg" className='w-[100vw] md:w-3/6' />
                <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_3.jpg" className='w-[100vw] md:w-3/6' />
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_7.jpg" className='w-[100vw] md:w-3/6'/>
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_8.jpg"className='w-[100vw] md:w-3/6'/>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full">
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_9.jpg" className='w-[100vw] md:w-3/6'/>
              <Image width={300} height={500}  alt="example" src="/about-tmak/tinywow_Book T-MAK FR_34677910_10.jpg"className='w-[100vw] md:w-3/6'/>
            </div>
        </main>
      </div>
    );
  };

export default About;