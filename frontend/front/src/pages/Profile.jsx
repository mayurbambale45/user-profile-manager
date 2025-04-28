import { useEffect, useState } from 'react';
import API from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/profile/me').then((res) => setUser(res.data));
  }, []);

  const handleDelete = async () => {
    await API.delete('/profile/delete');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      {user.profile_pic && <img src={`http://localhost:5000${user.profile_pic}`} width="100" alt="Profile" />}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
}

export default Profile;
