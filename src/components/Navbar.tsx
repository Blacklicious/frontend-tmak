'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {UserOutlined, MenuOutlined } from '@ant-design/icons';


interface UserInfo {
  username: string;
  // Other properties...
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUserData = sessionStorage.getItem('User');
      setUserInfo(localUserData ? JSON.parse(localUserData) as UserInfo : null);
      setIsLoading(false);  // Set loading to false after fetching data
    }
  }, []);

  const handleLogoutClick = async () => {
     const logout = async () => {
      console.log('Attempting to log out...');
      try {
        const res = await axios.post(`${backendUrl}/accounts/api/logout/`, {}, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });
        console.log('API response:', res);

        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('User');

        console.log('Local storage cleared, redirecting...');
        // After logout is successful, navigate:
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
      } catch (error) {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('User');
        console.error('Error during logout:', error);
        window.location.href = '/signin';
      }
    };

    logout();
  };

  const items = ['Dashboard', 'Déconnexion']; // Replace with your actual menu items

  // Click outside to close the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      
    };
  }, []);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as HTMLElement)) {
      setDropdownVisible(false);
    }
  };

  // Now, userData is an object containing the user info.
  return (
    <nav ref={dropdownRef} className=" shadow-md px-4 text-black bg-white border-black border-b-8">
      <div   className="flex flex-wrap md:flex-row bg-white-300 items-center justify-between">
        <div className="flex items-center w-[20%]">
            <Link href="/" className="flex items-center">
              <Image  width={80} height={500}  src="/TMAKLOGO.jpeg" alt="Tmak Corporation Logo" className="h-20 w-30 "/>
            </Link>
        </div>

        {/* Desktop Menu */}
        <div className="invisible md:visible  bg-white/90 w-0 md:w-[80%]">
          <div className=" flex items-center justify-center md:h-[80px] lg:text-xl font-semibold text-black">
            <Link href="/" className="font hover:font-black hover:text-gray-800 hover:border-t-[10px] hover:border-yellow-500 h-[100%] w-28 xl:w-36 flex items-center justify-center ">ACCUEIL</Link>
            <Link href="/about" className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] hover:border-yellow-500 h-[100%] w-28 md:w-56 flex items-center justify-center "> NOTRE EXPERTISE </Link>
            <Link href="/" onClick={(e) => {e.preventDefault(); setDropdownVisible(!isDropdownVisible);}}  className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] hover:border-yellow-500 h-[100%] w-28 md:w-52 flex items-center justify-center "> MINING NEWS</Link>
            <Link href="/coming-events" className="  hover:font-black hover:text-gray-800 hover:border-t-[10px] hover:border-yellow-500 h-[100%] w-28 md:w-44 flex items-center justify-center "> EVENEMENTS</Link>
            <Link href="/contact" className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] hover:border-yellow-500 h-[100%] w-28 xl:w-44 flex items-center justify-center "> CONTACTS</Link>
            <div className="user-info">
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
              </div>
              ) : (
                userInfo ? (
                  <div className="relative z-1">
                    <button onClick={() => setIsOpen(!isOpen)}
                      className="h-20 w-28 p-2 text-6xl rounded-none bg-yellow-500  focus:border-black focus:border-t-[10px]">
                      <UserOutlined />
                    </button>
                    {isOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-38 bg-white rounded-md shadow-xl z-10 flex flex-col text-center text-xl" >
                        {items.map((item, index) => {
                          if (item === 'Déconnexion') {
                            return (
                              <button
                                key={index}
                                onClick={handleLogoutClick}
                                className="block w-full px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white z-10  text-center text-xl"
                              >
                                {item}
                              </button>
                            );
                          }
                          return (
                            <Link key={index} href={`/${item.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white" onClick={() => setIsOpen(false)} >
                                {item}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className= 'bg-gray-200 hover:border-t-[10px] hover:border-yellow-500  h-20 w-16 xl:w-28 text-4xl xl:text-5xl px-3 pt-5'>
                    <Link href="/signin" className='flex items-baseline justify-center'>
                      <UserOutlined />
                    </Link>
                  </div>
                )
              )}
            </div>
            {/* a div where i can select the a a laguage french or english */}
            <div>
              <select className="bg-yellow-500 hover:bg-white text-black text-xl rounded-none hover:border-black hover:border-t-[10px] h-20 w-20 text-center">
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='h-[8vh] w-[80%] flex justify-end items-center  md:hidden p-2'>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="active:ring-3 bg-gray-200/70 w-[25%] h-full text-3xl rounded-lg shadow-lg flex justify-center items-center">
            <MenuOutlined />
          </button>
        </div>
        
        {/* Animated Mobile Menu */}
        <div 
          style={{
            maxHeight: isMobileMenuOpen ? "500px" : "0px",
            transition: "max-height 0.3s ease-in-out",
            overflow: "hidden"
          }} 
          className="flex flex-col mx-auto justify-center items-center md:hidden  bg-gray-50  rounded-md "
        >
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white my-4 text-black " href="/">ACCUEIL</Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/about">NOTRE ENTREPRISE </Link>
          <Link onClick={(e) => {setMobileMenuOpen(false);e.preventDefault(); setDropdownVisible(!isDropdownVisible); }} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="">MINING NEWS </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/coming-events">EVENEMENTS</Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/contact">CONTACTS</Link>
          
          {/* User info for mobile */}
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            userInfo ? (
              <div className="relative z-10 bg-gray-200 rounded px-4 mb-4 flex  flex-wrap justify-center ">
                <button onClick={() => setIsOpen(!isOpen)}
                  className="w-[85vw] h-16 text-center rounded-md shadow-md bg-white text-black my-4">
                  Salut, {userInfo?.username || 'User'}
                </button>
                {isOpen && (
                  <div className="flex flex-col mx-auto justify-center items-center "
                    style={{
                      maxHeight: isOpen ? "200px" : "0",
                      transition: "max-height 0.3s ease-in-out",
                      overflow: "hidden"
                    }}>
                    {items.map((item, index) => {
                      if (item === 'Déconnexion') {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              handleLogoutClick();
                              setIsOpen(false);
                            }}
                            className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md bg-white mb-4"
                          >
                            {item}
                          </button>
                        );
                      }
                      return (
                        <Link key={index} onClick={() => setIsOpen(false)}  href={`/${item.toLowerCase().replace(' ', '-')}`} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md bg-white mb-4">
                            {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link className="w-[85vw] h-10 text-center py-2 rounded-md bg-white ring ring-gray-300 shadow-lg mb-4 mx-3 text-black" href="/signin">
                Membre
              </Link>
            )
          )}
          {/* a div where i can select the a a laguage french or english */}
          <div>
            <select className="bg-yellow-500 hover:bg-white text-black text-md hover:border-black hover:border-t-[10px] h-10 w-[85vw] rounded-md mb-4 text-center">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>
          
        </div>
      </div> 
      {isDropdownVisible && (
          <div className=" bg-white    border-t-[2px] border-black flex justify-between rounded-lg text-xs lg:text-md xl:text-lg ">
            <Link href="/mining-news/ml" className=" p-2 hover:bg-gray-200 bg-yellow-500 w-full  border-x-[2px] border-black flex flex-col md:flex-row items-center  justify-center text-center rounded-tl-lg">
              <Image src="/mining-news-button/maliminingsnews.PNG" width={25} height={25} alt="Mali Flag" className="inline-block w-6 h-6 md:mr-2 mb-1 md:mb-0" />
              Mali Mining News
            </Link>
            <Link href="/mining-news/ci" className=" p-2 hover:bg-gray-200 bg-yellow-500 w-full  border-x-[2px] border-black flex flex-col md:flex-row items-center justify-center text-center ">
              <Image src="/mining-news-button/ciminingnews.PNG" width={25} height={25} alt="Mali Flag" className="inline-block w-6 h-6 md:mr-2 mb-1 md:mb-0" />
              Côte d&apos;Ivoire Mining News
            </Link>
            <Link href="/mining-news/bf" className=" p-2 hover:bg-gray-200 bg-yellow-500 w-full  border-x-[2px] border-black flex flex-col md:flex-row items-center justify-center text-center ">
              <Image src="/mining-news-button/bkminingnews.PNG" width={25} height={25} alt="Mali Flag" className="inline-block w-6 h-6 md:mr-2 mb-1 md:mb-0" />
              Burkina Faso Mining News
            </Link>
            <Link href="/mining-news/ne" className=" p-2 hover:bg-gray-200 bg-yellow-500 w-full  border-x-[2px] border-black flex flex-col md:flex-row items-center justify-center text-center ">
              <Image src="/mining-news-button/nigerminingnews.png" width={25} height={25} alt="Mali Flag" className="inline-block w-6 h-6 md:mr-2 mb-1 md:mb-0" />
              Niger Mining News
            </Link>
            <Link href="/mining-news/gn" className=" p-2 hover:bg-gray-200 bg-yellow-500 w-full  border-x-[2px] border-black flex flex-col md:flex-row items-center rounded-tr-lg justify-center text-center ">
              <Image src="/mining-news-button/guineaminingnews.PNG" width={25} height={25} alt="Mali Flag" className="inline-block w-6 h-6 md:mr-2 mb-1 md:mb-0" />
              Guinée Mining News
            </Link>
          </div>
        )}
    </nav>
  );   
}

export default Navbar;