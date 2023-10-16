'use client';
import Link from '../../../node_modules/next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';



const Signin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/accounts/api/login/`, {
        username: username,
        password: password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      console.log('Logged in:', response.data);

      // Fetch current user data
      try {
        const userResponse = await axios.get(`${backendUrl}/accounts/api/current-user/`, {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`
          }
        });
        localStorage.setItem('User', JSON.stringify(userResponse.data));
        console.log('User data fetched:', userResponse.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
      // Redirect to the main page using Next.js router and then force reload
      window.location.href = '/mining-news/dashboard';

    } catch (error) {
      console.log('Error logging in:', error);
    }
  };
  
  return (
    <div>
      <div className='h-[90vh] flex items-center justify-center'>
        <div >
          <form className=' bg-white h-[50vh] w-[60vw] flex flex-col items-center justify-center  space-y-5 p-8' onSubmit={handleSubmit}>
            <input className='w-[40vw] h-10 bg-gray-200 px-5 rounded-md' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nom d'utilisateur" />
            <input className='w-[40vw] h-10 bg-gray-200 px-5 rounded-md' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de Passe" />
            <button className='w-[40vw] h-10 bg-green-400 hover:bg-green-500 shadow-md rounded-md' type="submit">Connectez-vous</button>
            <p>Vous n&apos;avez pas de compte contactez &quot;votre superviseur&quot; </p>
            {/* <Link  href="/signup" ><button className='w-[40vw] h-10 bg-blue-400 border hover:bg-blue-500 shadow-md rounded-md'>Inscrivez-vous</button></Link> */}
          </form>

        </div>
        
      </div>
      
    </div>
  );
}

export default Signin;
