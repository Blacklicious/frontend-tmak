'use client';
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'


interface UserInfo {
    username: string;
    // Other properties...
  }
  // Define the article type
  interface NewsletterType {
    id: string;
    category: string;
    platform: string;
    value: string;
    note: string;
    status: string;
    // ...add other fields if needed
  }

const MenuDataNewsletter = () => {
  const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
		const localUserData = typeof window !== 'undefined' ? sessionStorage.getItem('User') : null;
		setUserInfo(localUserData ? JSON.parse(localUserData) as UserInfo : null);
	
		const fetchNewsletters = async () => {
			try {
				const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;
				const response = await axios.get(`${backendUrl}/accounts/api/raw-contacts/`, {
					headers: {
						'Authorization': `Bearer ${token}`,  // Authentication token
					},
				});
				setNewsletters(response.data);
			} catch (error) {
				console.error('Error fetching newsletters:', error);
				// Set error state here if you have one
			} finally {
				setIsLoading(false);
			}
		};
		
		if (backendUrl) {
			fetchNewsletters();
		}
	}, [backendUrl]);
	

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : userInfo ? (
        <div>
          <div className='text-2xl px-4 mb-4 '>Votre newsletters:</div>
          <table className="min-w-full leading-normal ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Plateforme
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valeur
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((newsletter) => (
                <tr key={newsletter.id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {newsletter.category}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {newsletter.platform}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {newsletter.value}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {newsletter.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-user">
          <p>Please login to view your newsletters.</p>
        </div>
      )}
    </div>
  )
}

export default MenuDataNewsletter
