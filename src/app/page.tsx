'use client'
import Hero from './Hero';
import Actuality from './Actuality';
import MiningNews from './MiningNews';
import Events from './Events';
import Newsletter from './Newsletter';
import Partenaire from './Partenaire';

export default function Home() {
  return (
    <div>
      <main className=" flex flex-col items-center justify-between bg-yellow-500">
        < Hero />
        < Actuality />
        < MiningNews />
        < Partenaire />
        <div className=' p-6 w-full'>
          < Newsletter />
        </div>
        < Events />
      </main>
      <footer className="global-footer bg-gray-800 text-white p-6">
        <div className="container mx-auto md:py-8 text-sm ">
          <div className="flex flex-wrap justify-between">
            <nav role="navigation" aria-labelledby="block-footer-menu" id="block-footer" className="w-full md:w-3/4 mb-5">
              <ul className="flex space-x-4">
                <li>© 2023 T-MAK Corporation</li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-service">Terms of Service</a></li>
              </ul>
            </nav>
            <div className="w-full md:w-1/4 mt-2 md:mt-0">
              <div className="social-follow flex space-x-4">
                <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://twitter.com/yourcompany" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='text-gray-50 text-xs w-full px-6 z-[-1]'>
            site create by Nzirani.IO
      </div>
    </div> 
  );
};