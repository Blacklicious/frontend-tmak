'use client'
import Hero from './Hero';
import Actuality from './Actuality';
import MiningNews from './MiningNews';
import Events from './Events';
import Newsletter from './Newsletter';
import Partenaire from './Partenaire';
import Head from 'next/head';
import { FacebookOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>

      </Head>

      <main className=" flex flex-col items-center justify-between bg-yellow-500 ">
        < Hero />
        < Actuality />
        < MiningNews />
        <div className=' p-6 w-full '>
          < Newsletter />
        </div>
        < Events />
        < Partenaire />
      </main>
      <footer className="global-footer bg-gray-800 text-white p-6 w-[100vw]">
        <div className="  py-4 ">
          <div className="flex flex-wrap justify-center">
            <nav role="navigation" aria-labelledby="block-footer-menu" id="block-footer" className="  w-full md:w-3/4">
              <ul className="grid grid-cols-3 text-center mb-4 pb-6 text-xl border-b-2 border-gray-600">
                <li>© 2023 T-MAK Corporation</li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-service">Terms of Service</a></li>
              </ul>
              <ul className="grid grid-cols-4 social-follow justify-center w-[100%] pt-4 ">
                <li>
                    <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <FacebookOutlined className='text-xl md:text-4xl mr-3'/> Facebook
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center' >
                        
                    <Image src="/logos/twitter-x(1).svg" alt="Twitter" width={40} height={20} style={{fontWeight: 'bold', color: 'white'}} /> Twitter
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <LinkedinOutlined className='text-xl md:text-4xl mr-3'/> LinkedIn
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <InstagramOutlined className='text-xl md:text-4xl mr-3'/> Instagram
                    </a>
                </li>
              </ul>
            </nav>         
          </div>
        </div>
      </footer >
      <div className='bg-white text-gray-50 text-xs w-full px-6 z-[-1] text-center'>
        site create by Nzirani.IO
      </div>
    </div> 
  );
};