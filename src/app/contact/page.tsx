'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';  // 1. Import axios
import { Input, Select } from 'antd';
import { UserOutlined , PhoneFilled, MailFilled, ShopFilled} from '@ant-design/icons';


const { TextArea } = Input;
const { Option } = Select;

const Contact: React.FC = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('personal'); // default being personal
  const [formData, setFormData] = useState({
    category: '',
    origin: 'TMAK Corporation',
    name: '',
    email: '', // Add rubrique field
    phone: '',
    business:'',
    job:'',
    subject: '', 
    message: '',
    location: '',
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      [category]: value,
    });
    setCategory(value);
  };

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setFormData({
				...formData,
				location: `Lat: ${latitude}, Lon: ${longitude}`
			});
		}, (error) => {
			console.error("Error getting location", error);
		});
	}, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		const form = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      form.append(key, value);
    }

		try {
      const response = await axios.post(`${backendUrl}/accounts/api/leads/`, form,  {
      });
      if (response.status === 201) {
        setSubmitted(true);
        alert('You have successfully subscribed to the newsletter.');
  			window.location.reload(); // Refresh the page
      }
    } catch (error) {
      alert('An error occurred while subscribing.');
    }
  };

  return (
    <div className='bg-white'>
      <section className="mb-32 text-center h-[100vh]">
        <div className="py-5 md:px-12">
          <div className="container mx-auto xl:px-32">
            <div className="grid items-center lg:grid-cols-2">
              <div className="mb-12 md:mt-6 lg:mt-20 lg:mb-0">
                <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                  <h2 className="mb-12 text-3xl font-bold">Contactez-nous</h2>
                  <form onSubmit={handleSubmit} >
                    {/* add dropdown to select professional or personnal default beeing personnal */}
                    <Select defaultValue="personal" className=" mb-2 w-full"  value={formData.category}  onChange={handleCategoryChange} >
                      <Option value="personal">Personal</Option>
                      <Option value="professional">Professional</Option>
                    </Select>              
                    <div className="mb-2 relative">
                      <UserOutlined className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        name="name"
                        className="w-full p-2 pl-10 border rounded" 
                        value={formData.name} 
                        placeholder="Nom et Prénom" 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 relative">
                      <MailFilled className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        name="email"
                        className="w-full p-2 pl-10 border rounded" 
                        value={formData.email} 
                        placeholder="Votre e-mail" 
                        onChange={handleChange}
                      />
                    </div>

                    {/* if the Dropdown selected is "professionel"   show :
                          add phone number in this format (+223) 74327289 
                          add business name 
                          add job name 
                        other wise hide
                    */}
                    {category === 'professional' && (
                      <>
                        <div className="mb-2 relative">
                        <ShopFilled className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                          <input 
                            name="business"
                            className="w-full p-2 pl-10 border rounded" 
                            value={formData.business} 
                            placeholder="votre Entreprise" 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-2 relative">
                          <UserOutlined className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                          <input 
                            name="job"
                            className="w-full p-2 pl-10 border rounded" 
                            value={formData.job} 
                            placeholder="position dans l'entreprise" 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-2 relative">
                          <PhoneFilled className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                          <input 
                            name="phone"
                            className="w-full p-2 pl-10 border rounded" 
                            value={formData.phone} 
                            placeholder="(+223)78732898" 
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}

                    <div className="relative mb-2" data-te-input-wrapper-init>
                      <Input name="subject" size="large"  value={formData.subject} placeholder="  Sujet" onChange={handleChange} />
                    </div>
                    <div className="relative mb-4 " data-te-input-wrapper-init>
                      <TextArea className="h-[25vh]"  name="message" value={formData.message} placeholder="Message (nous essaierons de vous répondre dans un délai maximum de 72 h)" allowClear onChange={handleChange} />
                    </div>
                    <button
                      type="submit"
                      className="inline-block w-full bg-blue-300 hover:bg-blue-400 rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0">
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <div className="relative bg-yellow-500/90 h-[25vh] rounded-lg shadow-lg dark:shadow-black/20 p-8 mt-40">
                  <div className=' text-left  w-[100%] flex flex-col justify-center py-8  pl-10 text-black rounded-md '>
                    <h1 className=' text-left  w-[100%] text-7xl font-oswald font-black'> </h1>
                    <h1 className=' text-left  w-[100%] text-4xl font-oswald font-bold'>T-MAK CORPORATION</h1>
                    <h2 className=' text-left  w-[100%] text-2xl'>MALI / BURKINA FASO / CÔTE D&apos;IVOIRE</h2>
                    <h2 className=' text-left  w-[100%] text-2xl font-oswald font-bold'> <PhoneFilled /> : +223 70 74 10 98</h2>
                    <h2 className=' text-left  w-[100%] text-2xl font-oswald font-bold'> <MailFilled /> :  n.traore@t-mak.org</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Contact;