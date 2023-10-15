import axios from 'axios';

export const logoutUser  = async () => {
  try {
    await axios.post('http://localhost:8000/accounts/api/logout/', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('User'); 
    console.log('local storage data erased');
    // Redirect to the main page and force reload
    window.location.href = '/';

  } catch (error) {
    console.error('Error during logout:', error);
  }
};
