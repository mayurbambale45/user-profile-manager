import { useEffect, useState } from 'react';
import API from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/profile/me').then((res) => {
      setForm({ name: res.data.name, phone: res.data.phone, address: res.data.address });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put('/profile/update', form);
    navigate('/profile');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
