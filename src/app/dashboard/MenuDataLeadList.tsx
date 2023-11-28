
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'


interface UserInfo {
  username: string;
  // Other properties...
}

// Define the lead type
interface LeadType {
  id:'';
	name: '',
	email: '', // Add rubrique field
	phone: '',
	business:'',
	job:'',
	subject: '', 
	message: '',
}

const MenuDataLeadList = () => {
  const [leads, setLeads] = useState<LeadType[]>([]);
	const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
	const [currentLead, setCurrentLead] = useState<LeadType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const localUserData = typeof window !== 'undefined' ? sessionStorage.getItem('User') : null;
    setUserInfo(localUserData ? JSON.parse(localUserData) as UserInfo : null);

    const fetchLeads = async () => {
      try {
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;
        const response = await axios.get(`${backendUrl}/accounts/api/leads/`, {
          headers: {
            'Authorization': `Bearer ${token}`,  // Authentication token
          },
        });
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        // Set error state here if you have one
      } finally {
        setIsLoading(false);
      }
    };

    if (backendUrl) {
      fetchLeads();
    }
  }, [backendUrl]);

	const openReplyForm = (lead: LeadType) => {
		setCurrentLead(lead);
		setIsReplyFormOpen(true);
	};

	
	


  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : userInfo ? (
        <div>
          <div className='bg-gray-200 p-5 h-16 rounded-lg'>Salut {userInfo.username} Bienvenue dnas votre base de données.</div>
          <div className='text-2xl px-4 my-4'>Vos leads:</div>
          <table className="min-w-full leading-normal ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Entreprise
                </th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sujet
                </th> 
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  message
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} >
									<td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.name}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.email}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.phone}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.business}
                  </td>
									<td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.subject}
                  </td>
									<td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    {lead.message}
                  </td>
									{/*<td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-black">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
											Repondre
										</button>
                  </td>/ */}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-user">
          <div>Please login to view your leads.</div>
        </div>
      )}
    </div>
  )
}

export default MenuDataLeadList
