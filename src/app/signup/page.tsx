'use client';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';


const Signup: React.FC = () => {
  
  // User info
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [password, setPassword] = useState('');

  // Additional contact info
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [business, setBusiness] = useState('TMAK Corporation');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState('visitor');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const username = email.split("@")[0];  // Extracting the first part of the email

    try {
      // Step 1: Sign up the user
      const signupResponse = await axios.post(`${backendUrl}/accounts/api/signup/`, {
        username,
        email,
        password,  // make sure the backend expects this field
        first_name,
        last_name,
      });
      

      // Assuming the API returns a token in the signup response
      console.log("User created:", signupResponse.data);

      // Step 2: Log in the user
      const loginResponse = await axios.post(`${backendUrl}/accounts/api/login/`, {
        username,
        password,
      });

      console.log("Logged in:", loginResponse.data);


      const token = loginResponse.data.access_token; // Assuming the token is returned in login response
      console.log(loginResponse.data.access_token)
      // Step 3:  Fetch the current user's details to get their ID
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const currentUserResponse = await axios.get(`${backendUrl}/accounts/api/current-user/`, config);
      const userId = currentUserResponse.data.id; // Assuming the user ID is returned in the 'id' field
      console.log("userId is :",userId)

      // Step 3: Add the contact information
      const contactResponse = await axios.post(
        `${backendUrl}/accounts/api/add-contact/`,
        {
          user: userId, // use the user ID from the current user response
          telephone,
          adresse,
          business,
          job,
          status,
        },
        config
      );

      console.log("Contact added:", contactResponse.data);
      // Redirect to the main page and force reload
      window.location.href = '/';
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className='h-[90vh] flex items-center justify-center'>
        <div >
          <form className=' bg-white shadow-xl rounded-md h-[80vh] w-[60vw] flex flex-col items-center justify-center   p-8' onSubmit={handleSubmit}>
            <h1 className='text-3xl font-extrabold mb-8'> Incrivez vous</h1>
            // Input fields
            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
            />
            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={last_name} 
              onChange={(e) => setLast_name(e.target.value)} 
              placeholder="Nom " 
            />

            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={first_name} 
              onChange={(e) => setFirst_name(e.target.value)} 
              placeholder="Prenom" 
            /> 

            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={telephone} 
              onChange={(e) => setTelephone(e.target.value)} 
              placeholder="telephone" 
            />

            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={adresse} 
              onChange={(e) => setAdresse(e.target.value)} 
              placeholder="adresse" 
            />
            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={business} 
              onChange={(e) => setBusiness(e.target.value)} 
              placeholder="Business" 
            />
            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="text" 
              value={job} 
              onChange={(e) => setJob(e.target.value)} 
              placeholder="job" 
            />
            <input 
              className='w-[40vw] my-2 h-10 bg-gray-200 px-5 rounded-md' 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="password" 
            />
            
            <button className='w-[40vw] my-2 h-14 bg-green-400 border hover:bg-green-500 shadow-md rounded-md' type="submit"  onClick={handleSubmit} >Signup</button>
          </form>
        </div>
      </div>  
    </div>
    
  );
}

export default Signup;
