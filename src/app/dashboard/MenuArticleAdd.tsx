'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // or 'react-quill/dist/quill.bubble.css' based on your theme preference
// Other imports...

const ReactQuill = dynamic(
  () => import('react-quill'), // replace 'react-quill' with your Quill component if you have one
  { ssr: false }
);



const MenuArticleAdd = () => {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);


	const handleContentChange = (value: any) => {
		setFormData(prevFormData => ({
			...prevFormData,
			content: value
		}));
	};


	const [formData, setFormData] = useState<{
		title: string;
		content: string;
		rubrique: string;
		creation: string;
		publisher: string;
		location: string;
		file: File | null;
		link: string;
		status: string;
	}>({
		title: '',
		content: '',
		rubrique: '',
		creation: '',
		publisher: 'TMAK Corporation',
		location: '',
		file: null,
		link: '',
		status: 'inactive',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
		const { name, value } = e.target;
		setFormData({
		  ...formData,
		  [name]: value,
		});
	  };


	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setFormData({
			...formData,
			file,
		});
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
		

	}, [formData]);


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		setLoading(true);
		if (!formData.file) {
			alert('Vous avez oubliez de rajoutez une image pour votre article.');
			setLoading(false);
			return;
		}
    
		// Set publisher to the session user's username before sending
		const token = sessionStorage.getItem('access_token');
		const form = new FormData();
		// Assuming you store user info as a JSON string in sessionStorage
		const user = JSON.parse(sessionStorage.getItem('User') || '{}');
    form.append('author', String(user.id));  // Directly appending here
    for (const [key, value] of Object.entries(formData)) {
		if (value !== null) {
		  form.append(key, value);
		}
	  }
		console.log('the userId', user.id);
		console.log('User ID Type:', typeof user.id);	
		console.log('User Object:', user);  // Debugging Line
		console.log('Appended author:', form.get('author')); // Debug
		console.log('the form', form);
		try {
			await axios.post(`${backendUrl}/posts/api/articles/`, form, {
				headers: {
					'Content-Type': 'multipart/form-data', // Required for file upload
					'Authorization': `Bearer ${token}`,  // Authentication token
				},
			});
			alert('Article successfully added!');
			window.location.reload(); // Refresh the page
		} catch (error) {
			alert('Utilisateur non identifer, veuillez vous connecter');
        	sessionStorage.removeItem('access_token'); // Remove the token
		} finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 " >
			{/* You can add your input form for articles here */}
			<form className=" flex flex-col md:flex-wrap  justify-center" onSubmit={handleSubmit}>
				<div className='w-full '>
					< Input required
						className="w-full h-14 border-2 px-2 my-3"
						type="text"
						name="title"
						placeholder="Titre"
						value={formData.title}
						onChange={handleChange}
					/>
					<div className='flex flex-row justify-between'>
						{/* Add Rubrique Dropdown */}
						<div className='w-[45%] '>
							<select required
								className="w-full h-14 border-2 px-2 my-3"
								name="rubrique"
								value={formData.rubrique}
								onChange={handleChange}
							>
								<option value="" disabled>Select Rubrique</option>
								<option value="T-MAK actualité fr">T-MAK actualité - fr</option>
								<option value="T-MAK actualité en">T-MAK actualité - en</option>
								<option value="Mali Mining news fr">Mali Mining news - fr</option>
								<option value="Mali Mining news en">Mali Mining news - en</option>
							</select>
						</div>
		
						{/* Add Date of Creation */}
						<div className='w-[48%] '>
							<input required
								className="w-full h-14 border-2 px-2 my-3"
								type="date"
								name="creation"
								value={formData.creation}
								onChange={handleChange}
							/>
						</div>
					</div>
					<Input
						className="w-full  h-14 border-2 px-2 my-3 flex items-center justify-center text-xl py-2 space-x-5 bg-white "
						type="file"
						name="file"
						onChange={handleFileChange}
					/>
				</div>
				<div  className='w-full mb-14 '>
					<ReactQuill className='bg-white h-[50vh]' value={formData.content} onChange={handleContentChange} />
				</div>
				<Input
					className="w-full h-14 border-2 px-2 my-3"
					type="url"
					name="link"
					placeholder="lien youtube"
					value={formData.link}
					onChange={handleChange}
				/>
				<Button className="w-full my-4 text-lg bg-blue-400 rounded-md h-12 "type="primary" htmlType="submit"  disabled={loading}>
        	{loading ? 'Loading...' : 'Publier'}
      	</Button>
			</form>
  </div>
  )
}

export default MenuArticleAdd