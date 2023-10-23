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
    <div className="bg-gray-100 px-8 py-4 md:py-10 md:px-44 shadow-md rounded-md w-full text-black">
      <h2 className="text-2xl mb-4">Joindre la T-MAK Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded" 
            placeholder="votre address email" 
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
          <label htmlFor="consent" className="ml-2">
            je donne mon consentement pour rejoindre la newsletters.
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
