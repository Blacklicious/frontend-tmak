'use client';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import MenuArticle from './MenuArticle';
import MenuMagazine from './MenuMagazine';
import MenuPodcast from './MenuPodcast';
import MenuVideo from './MenuVideo';
import MenuData from './MenuData';



const Menu: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('');
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Articles':
        return <MenuArticle/>;
      case 'Magazines':
        return <MenuMagazine />;
      case 'Podcasts':
        return <MenuPodcast />;
      case 'Videos':
        return <MenuVideo />;
      case 'Settings':
        return <MenuData />;
      default:
        return <MenuArticle/>;
    }
  };

  return (    
    <div className='text-black'>
      <div className="flex w-full p-[2px] md:py-1 ">
        <button onClick={() => setActiveComponent('Articles')} className="flex-grow text-center text-sm md:text-lg rounded-md md:mx-1 py-1 h-18 border border-gray-300 bg-white">
          <i className="fa fa-newspaper-o"></i>  Articles
        </button>
        <button onClick={() => setActiveComponent('Magazines')} className="flex-grow text-center text-sm md:text-lg rounded-md md:mx-1 py-1 h-18 border border-gray-300 bg-white">
          <i className="fa fa-book"></i>  Magazines
        </button>
        <button onClick={() => setActiveComponent('Podcasts')} className="flex-grow text-center text-sm md:text-lg rounded-md md:mx-1 py-1 h-18 border border-gray-300 bg-white">
          <i className="fa fa-podcast"></i>  Podcasts
        </button>
        <button onClick={() => setActiveComponent('Videos')} className="flex-grow text-center text-sm md:text-lg rounded-md md:mx-1 py-1 h-18 border border-gray-300 bg-white">
          <i className="fa fa-video-camera"></i>  Emissions
        </button>
        <button onClick={() => setActiveComponent('Settings')} className="flex-grow text-center text-sm md:text-lg rounded-md md:mx-1 py-1 h-18 border border-gray-300 bg-white">
          <i className="fa fa-table"></i>  Base de données
        </button>
      </div>
      
      <div className='bg-white'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Menu;