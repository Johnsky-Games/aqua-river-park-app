import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const Clients = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axiosClient.get('/protected/clients')
      .then(res => setMsg(res.data.msg))
      .catch(() => setMsg('❌ Acceso denegado'));
  }, []);

  return <h2>{msg}</h2>;
};

export default Clients;
