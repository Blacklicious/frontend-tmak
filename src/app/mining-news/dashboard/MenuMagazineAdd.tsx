'use client';
import React, { useState } from 'react';
import axios from 'axios';



const MenuMagazineAdd = () => {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [formData, setFormData] = useState<{
		title: string;
		content: string;
		rubrique: string;
		creation: string;
		publisher: string;
		location: string;
		file: File | null;
		thumbnail: File | null; // Add this line for thumbnail
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
		thumbnail: null,
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

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setFormData({
		  ...formData,
		  thumbnail: file,
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

		// Set publisher to the session user's username before sending
		const token = localStorage.getItem('access_token');
		const form = new FormData();
		// Assuming you store user info as a JSON string in localStorage
		const user = JSON.parse(localStorage.getItem('User') || '{}');
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
			await axios.post(`${backendUrl}/posts/api/magazines/`, form, {
				headers: {
					'Content-Type': 'multipart/form-data', // Required for file upload
					'Authorization': `Bearer ${token}`,  // Authentication token
				},
			});
			alert('Magazine successfully added!');
			window.location.reload(); // Refresh the page
		} catch (error) {
			alert('An error occurred while adding the Magazine.');
		}
  };

  return (
    <div className="bg-gray-100 p-3" >
			{/* You can add your input form for articles here */}
			<form className=" flex flex-col md:flex-wrap  justify-center" onSubmit={handleSubmit}>
				<div className='w-full '>
					<input
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
					<div className='flex flex-wrap justify-between bg-gray-300 p-4 rounded-md'>
						<div className='w-[48%] text-xl '>
							<div className='px-3 font-bold'>Ajoutez le mag en PDF :</div>
							<input
								className="w-[100%]  h-14 border-2 px-2 flex items-center justify-center text-xl py-2 space-x-5 bg-white rounded-md"
								type="file"
								name="file"
								onChange={handleFileChange}
							/>
						</div>
						<div className='w-[48%] text-xl' >
							{/* Add new file input for the thumbnail image */}
							<div className='px-3 font-bold'>Ajoutez votre thumbnail:</div>
							<input
							className="w-[100%]  h-14 border-2 px-2 flex items-center justify-center text-xl py-2 space-x-5 bg-white rounded-md"
							type="file"
							name="thumbnail"
							onChange={handleThumbnailChange} // use the new handler here
							/>
						</div>
					</div>
					
				</div>
				<div  className='w-full'>
					<textarea
						className="w-full h-60 border-2 py-2 px-2 my-3"
						name="content"
						placeholder="description"
						value={formData.content}
						onChange={handleChange}
					/>
					<input
					className="w-full h-14 border-2 px-2 my-3"
					type="url"
					name="link"
					placeholder="lien youtube"
					value={formData.link}
					onChange={handleChange}
				/>
				</div>
				<button className="w-full my-4 text-lg bg-blue-400 rounded-md h-12 " type="submit">Publier</button>
			</form>
  </div>
  )
}

export default MenuMagazineAdd