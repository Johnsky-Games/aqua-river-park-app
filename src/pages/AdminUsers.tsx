import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AdminUsers = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axiosClient.get('/protected/admin/users')
      .then(res => setMsg(res.data.msg))
      .catch(() => setMsg('❌ Acceso restringido'));
  }, []);

  return <h2>{msg}</h2>;
};

export default AdminUsers;
