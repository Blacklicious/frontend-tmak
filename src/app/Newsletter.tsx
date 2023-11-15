'use client'
import React, { useState } from 'react';
import axios from 'axios';  // 1. Import axios

const Newsletter: React.FC = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  // Mark it as async
    e.preventDefault();
    
    if (!consent) {
      alert('Please give your consent to join the newsletter.');
      return;
    }
    
    // 2. Update the handleSubmit
    try {
      const response = await axios.post(`${backendUrl}/accounts/api/raw-contacts/`, {
        category: 'email',
        platform: 'T-MAK',
        value: email,
        note: 'T-MAK Corporation Newsletter',
        status: 'verified'
      });

      if (response.status === 201) {
        setSubmitted(true);
        alert('You have successfully subscribed to the newsletter.');
      }
    } catch (error) {
      alert('An error occurred while subscribing.');
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-4 md:py-10 md:px-44 shadow-md rounded-b-md w-full text-black text-2xl text-center">
      <div className="text-sm md:text-2xl m-4">Rejoindre la T-MAK Newsletter. Soyez toujours à jour sur l&apos;actualités des mines en Afrique. </div>
      <form onSubmit={handleSubmit} className='flex flex-wrap justify-center w-[100%] text-xl'>
        <div className="mb-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className=" p-2 border rounded w-[80vw] md:w-[35vw] mr-4 text-center" 
            placeholder="Votre adresse email" 
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="consent" 
            checked={consent} 
            onChange={() => setConsent(!consent)} 
          />
          <label htmlFor="consent" className="ml-2 font-oswald font font-bold text-xs md:text-xl">
            je donne mon consentement pour rejoindre la newsletter.
          </label>
        </div>
        <button type="submit" className="bg-black text-white font-bold p-2 rounded w-[60vw] hover:bg-yellow-500">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
