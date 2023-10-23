'use client';
import React, { useEffect, useState } from 'react';
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
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUserData = localStorage.getItem('User');
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
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log('API response:', res);

        localStorage.removeItem('access_token');
        localStorage.removeItem('User');

        console.log('Local storage cleared, redirecting...');
        // After logout is successful, navigate:
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('User');
        console.error('Error during logout:', error);
        window.location.href = '/signin';
      }
    };

    logout();
  };

  const items = ['Dashboard', 'Déconnexion']; // Replace with your actual menu items

  // Now, userData is an object containing the user info.
  return (
    <nav className="navBackground  w-[100vw] shadow-md px-4 text-black border-black border-b-8">
      <div className="flex flex-wrap md:flex-row p-2 bg-white-300 items-center justify-between">
        <div className="flex items-center shrink">
            <Link href="/" className="flex items-center">
                    <Image  width={80} height={500}  src="/TMAKLOGO.jpeg" alt="Tmak Corporation Logo" className="h-20 w-30 "/>
            </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block shrink bg-white/90">
          <div className=" flex items-center justify-center md:h-[80px] lg:text-xl font-semibold text-black">
            <Link href="/" className="font hover:font-black hover:text-gray-800 hover:border-t-[10px] mx-3 hover:border-yellow-500 h-[100%] w-20 xl:w-36 flex items-center justify-center ">Accueil</Link>
            <Link href="/about" className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] mx-3 hover:border-yellow-500 h-[100%] w-20 xl:w-40 flex items-center justify-center"> Notre Expertise </Link>
            <Link href="/mining-news" className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] mx-3 hover:border-yellow-500 h-[100%] w-20 xl:w-36 flex items-center justify-center"> Mining News</Link>
            <Link href="/coming-events" className="  hover:font-black hover:text-gray-800 hover:border-t-[10px] mx-3 hover:border-yellow-500 h-[100%] w-20 xl:w-36 flex items-center justify-center"> Evenements</Link>
            <Link href="/contact" className=" hover:font-black hover:text-gray-800 hover:border-t-[10px] mx-3 hover:border-yellow-500 h-[100%] w-20 xl:w-36 flex items-center justify-center"> Contacts</Link>
            <div className="user-info">
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
              </div>
              ) : (
                userInfo ? (
                  <div className="relative z-1">
                    <button onClick={() => setIsOpen(!isOpen)}
                      className="h-20 w-28 p-2 text-xl rounded-none bg-yellow-500  focus:border-black focus:border-t-[10px]">
                      Salut, {userInfo?.username || 'User'}
                    </button>
                    {isOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-38 bg-white rounded-md shadow-xl z-10 flex flex-col text-center text-xl">
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
                            <Link key={index} href={`mining-news/${item.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white">
                                {item}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className= 'bg-gray-200 hover:border-t-[10px] mx-3 hover:border-black hover:bg-yellow-500  h-20 w-16 text-4xl px-3 py-2'>
                    <Link href="/signin">
                      <UserOutlined />
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='h-[8vh] w-[18%] flex justify-center items-center  md:hidden '>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="active:ring-3 bg-gray-200/70 w-full h-full text-3xl rounded-lg shadow-lg flex justify-center items-center">
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
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white my-4 text-black " href="/">Home</Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/about">About</Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/mining-news">Mining News </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/coming-events">Évements</Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md  bg-white mb-4 text-black " href="/contact">Contact</Link>
          {/* ... (Rest of the mobile links) */}
          {/* User info for mobile */}
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            userInfo ? (
              <div className="relative z-10 bg-gray-200 rounded px-4 mb-4 flex  flex-wrap justify-center">
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
                        <Link key={index} onClick={() => setIsOpen(false)}  href={`mining-news/${item.toLowerCase().replace(' ', '-')}`} className="w-[85vw] h-10 text-center py-2 rounded-md shadow-md bg-white mb-4">
                            {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link className="w-[85vw] h-10 text-center py-2 rounded-md bg-white ring ring-gray-300 shadow-lg mb-4 mx-3 text-black" href="/signin">
                Zone Membre
              </Link>
            )
          )}
        </div>
      </div> 
    </nav>
  );   
}

export default Navbar;