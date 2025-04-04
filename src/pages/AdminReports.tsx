import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AdminReports = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axiosClient.get('/protected/admin/reports')
      .then(res => setMsg(res.data.msg))
      .catch(() => setMsg('❌ Sin permisos para reportes'));
  }, []);

  return <h2>{msg}</h2>;
};

export default AdminReports;
