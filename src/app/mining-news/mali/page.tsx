'use client';
import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
import MagazinesList from './MagazinesList';
import PodcastsList from './PodcastsList';
import VideosList from './VideosList';
import ArticlesDetails from './ArticlesDetails';
import MagazinesDetails from './MagazinesDetails';
import PodcastsDetails from './PodcastsDetails';
import VideosDetails from './VideosDetails';
import { ExpandAltOutlined} from '@ant-design/icons';


import { useMediaQuery } from 'react-responsive';

const Mali: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('Article');
	const [ListWidth, setListWidth] = useState('98'); // This sets the initial width to 40% of the viewport width.
	const [selectedComponent, setSelectedComponent] = useState(null); // Holds the selected article
	const [defaultWidth, setDefaultWidth] = useState('90')
	// Detect screen type (mobile or desktop)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  });
  
  // Dynamic styles for desktop
  const desktopListStyle = {
    width: `${ListWidth}vw`,
    transition: "width 0.3s ease-in-out",

  };
  
  // Dynamic styles for mobile
  const mobileListStyle = {
    height: `${ListWidth}vh`,
    transition: "height 0.3s ease-in-out",
  };


	const renderComponentList = () => {
		switch(activeComponent) {
			case 'Article':
				return <ArticlesList setSelectedComponent={setSelectedComponent} />;
			case 'Magazines':
				return <MagazinesList setSelectedComponent={setSelectedComponent} />;
			case 'Podcasts':
				return <PodcastsList setSelectedComponent={setSelectedComponent} />;
			case 'Videos':
				return <VideosList setSelectedComponent={setSelectedComponent} />;
			default:
				return <ArticlesList setSelectedComponent={setSelectedComponent} />;
		}
	}
	const renderComponentDetails = () => {
		switch(activeComponent) {
			case 'Article':
				return <ArticlesDetails selectedComponent={selectedComponent}/>;
			case 'Magazines':
				return <MagazinesDetails selectedComponent={selectedComponent}/>;
			case 'Podcasts':
				return <PodcastsDetails selectedComponent={selectedComponent}/>;
			case 'Videos':
				return <VideosDetails selectedComponent={selectedComponent}/>;
			default:
				return <ArticlesDetails selectedComponent={selectedComponent}/>;
		}
	} 
	useEffect(() => {
		if (isDesktopOrLaptop) {
			setDefaultWidth('20');
			if (selectedComponent !== null) {
				setListWidth(defaultWidth);
			}
	  } else {
			setDefaultWidth('5');
			if (selectedComponent !== null) {
				setListWidth(defaultWidth);
			}
	  }
    
  }, [selectedComponent, defaultWidth, isDesktopOrLaptop]);

  return (
    <div className='w-full h-[100%]'>
      {/* Section for buttons */}
			<section className="button-section flex ">
        <button onClick={() => {setActiveComponent('Article') ; setListWidth('98'); setSelectedComponent(null);}} className=" w-full h-11 bg-yellow-400 hover:border-gray-800 hover:border-b-8 shadow-md ">Articles</button>
        <button onClick={() => {setActiveComponent('Magazines'); setListWidth('98'); setSelectedComponent(null); }} className=" w-full h-11 bg-yellow-400 hover:border-gray-800 hover:border-b-8 shadow-md ">Magazines</button>
        <button onClick={() => {setActiveComponent('Videos') ; setListWidth('98'); setSelectedComponent(null);}} className=" w-full h-11 bg-yellow-400 hover:border-gray-800 hover:border-b-8 shadow-md ">Emission TV</button>
        <button onClick={() => {setActiveComponent('Podcasts') ; setListWidth('98'); setSelectedComponent(null);}} className=" w-full h-11 bg-yellow-400 hover:border-gray-800 hover:border-b-8 shadow-md ">Podcast</button>
      </section>	
			<div className=" bg-black flex items-center justify-center font-bold   text-xl three-color-gradient shadow-lg h-3"> 
			</div> 
      <div className='flex flex-col md:flex-wrap p-1 w-[100vw] h-[85vh]'>
        <div style={isDesktopOrLaptop ? desktopListStyle : mobileListStyle}   className='flex flex-col bg-white overflow-y-auto py-3 border-r-[6px] border-gray-500'>
          <div className='space-x-2 flex justify-end px-3  text-black '  
						onClick={() => { console.log("Minus clicked"); setListWidth('98'); setSelectedComponent(null);}}
					>
            <button onClick={() => { console.log("Plus clicked"); setListWidth('98'); setSelectedComponent(null); }} className="bg-white ring-2  ring-gray-600  hover:bg-yellow-500 w-6 h-6 flex justify-center items-center rounded-md"><ExpandAltOutlined /></button>
          </div>
					{/* Article List */}
					<div className="flex flex-col">
						{ renderComponentList() }
					</div>
				</div>
        {/* Article Details */}
        { ListWidth < '98' && (
          <div className="bg-gray-600  p-4 overflow-y-auto  md:w-[79vw] h-[85vh]">
            { renderComponentDetails() }
          </div>
        )}
			</div>	
		</div>	
  );
};

export default Mali;