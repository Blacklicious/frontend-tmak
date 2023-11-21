'use client';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import axios from 'axios';
import { Input, Button } from 'antd';

const Signout = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const [loading, setLoading] = useState(false);

 
  useEffect(() => {
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
        router.push('/');
        window.location.reload();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, [backendUrl]);

  return (
    <div>
      <p>Signing you out...</p>
    </div>
  );
};

export default Signout;





