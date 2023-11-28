'use client';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';



const Signin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    e.preventDefault();
    try {
		  setLoading(true);	
      const response = await axios.post(`${backendUrl}/accounts/api/login/`, {
        username: username,
        password: password,
      });
      sessionStorage.setItem('access_token', response.data.access_token);
      console.log('Logged in:', response.data);

      // Fetch current user data
      try {
        const userResponse = await axios.get(`${backendUrl}/accounts/api/current-user/`, {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`
          }
        });
        sessionStorage.setItem('User', JSON.stringify(userResponse.data));
        console.log('User data fetched:', userResponse.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }finally {
        setLoading(false);
      }
      // Redirect to the main page using Next.js router and then force reload
      window.location.href = '/dashboard';

    } catch (error) {
      console.log('Error logging in:', error);
    } 
  };
  
  return (
    <div>
      <div className=' flex items-center justify-center p-4 h-[75vh] md:h-[90vh] text-black'>
        <div >
          <form className=' bg-gray-100/95 h-[40vh] md:h-[30vh] md:w-[70vw] flex flex-col items-center justify-center  space-y-5 px-8 rounded-lg' onSubmit={handleSubmit}>
            <Input className='mt-8 w-[70vw] md:w-[40vw] h-10 bg-white px-5 rounded-md' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nom d'utilisateur" />
           
            <Input.Password
              className='w-[70vw] md:w-[40vw] h-10 bg-white px-5 rounded-md' 
              value={password} onChange={(e) => setPassword(e.target.value)} 
              type="password"
              placeholder="Mot de Passe"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Button className='w-[70vw] md:w-[40vw] h-10 bg-blue-400 border hover:bg-blue-500 shadow-md rounded-md' type="primary" htmlType="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Connectez-vous'}
            </Button>
            <div className='w-[70vw] text-center'>Vous n&apos;avez pas de compte contactez &quot;votre superviseur&quot; </div>
            {/* <Link  href="/signup" ><button className='w-[40vw] h-10 bg-blue-400 border hover:bg-blue-500 shadow-md rounded-md'>Inscrivez-vous</button></Link> */}
          </form>

        </div>
        
      </div>
      
    </div>
  );
}

export default Signin;
