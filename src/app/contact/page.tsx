'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';  // 1. Import axios
import { Input, Select } from 'antd';
import { UserOutlined , PhoneFilled, MailFilled, ShopFilled, YoutubeOutlined, InstagramOutlined, LinkedinOutlined, FacebookOutlined} from '@ant-design/icons';


const { TextArea } = Input;
const { Option } = Select;

const Contact: React.FC = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('professional'); // default being personal
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
      setFormData(prevFormData => ({
        ...prevFormData,
        location: `Lat: ${latitude}, Lon: ${longitude}`
      }));
    }, (error) => {
      console.error("Error getting location", error);
    });
  }, []);

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
          <div className="container mx-auto xl:px-32 text-black">
            <div className="grid items-center lg:grid-cols-2 p-4">
              <div className="mb-8 md:mt-6 lg:mt-20 lg:mb-0 ">
                <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                  <div className="mb-4 text-3xl font-bold text-white">Contactez-nous</div>
                  <form onSubmit={handleSubmit} >
                    {/* add dropdown to select professional or personnal default beeing personnal */}
                    <Select defaultValue="professional" className=" mb-2 w-full text-black"  value={formData.category}  onChange={handleCategoryChange} >
                      <Option value="professional">Professionnel</Option>
                      <Option value="personal">Personnel</Option>
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
                            placeholder="Votre entreprise" 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-2 relative">
                          <UserOutlined className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                          <input 
                            name="job"
                            className="w-full p-2 pl-10 border rounded" 
                            value={formData.job} 
                            placeholder="Position dans l'entreprise" 
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
                      className="inline-block w-full h-12 bg-black hover:bg-yellow-500 rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0">
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <div className="relative bg-yellow-500/90 h-[20vh] md:h-[25vh] rounded-lg shadow-lg dark:shadow-black/20 p-8 flex items-center ">
                  <div className=' text-left  w-[100%] flex flex-col justify-center  pl-10 text-black rounded-md '>
                    <h1 className=' text-left  w-[100%] text-2xl md:text-7xl font-oswald font-black'> </h1>
                    <h1 className=' text-left  w-[100%] text-xl md:text-4xl font-oswald font-bold'>T-MAK CORPORATION</h1>
                    <div className=' text-left  w-[100%] text-xl md:text-2xl'>MALI / BURKINA FASO / CÔTE D&apos;IVOIRE</div>
                    <div className=' text-left  w-[100%] text-xl md:text-2xl font-oswald font-bold'> <PhoneFilled /> 223 70 74 10 98</div>
                    <div className=' text-left  w-[100%] text-xl md:text-2xl font-oswald font-bold'> <MailFilled />  n.traore@t-mak.org</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="global-footer bg-gray-800 text-white p-6 w-[100vw]">
        <div className="  py-4 ">
          <div className="flex flex-wrap justify-center">
            <nav role="navigation" aria-labelledby="block-footer-menu" id="block-footer" className="  w-full md:w-3/4">
              <ul className="text-xl grid grid-cols-2 sm:grid-cols-5 social-follow justify-center w-[100%] p-6  border-b-2 border-gray-600">
                <li>
                    <a href="https://www.facebook.com/tmakeventmali" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <FacebookOutlined className='text-4xl m-3'/> Facebook
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center m-3' >
                        
                    <Image src="/logos/twitter-x(1).svg" alt="Twitter" width={50} height={25} style={{fontWeight: 'bold', color: 'white'}} /> Twitter
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/t-mak/?viewAsMember=true" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <LinkedinOutlined className='text-4xl m-3'/> LinkedIn
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <InstagramOutlined className='text-4xl m-3'/> Instagram
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@t-makmali2915" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
                        <YoutubeOutlined className='text-4xl m-3'/> Youtube
                    </a>
                </li>
              </ul>
              <ul className="grid grid-cols-3 text-center p-6 text-md ">
                <li>© 2023 T-MAK Corporation</li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-service">Terms of Service</a></li>
              </ul>
            </nav>         
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact;