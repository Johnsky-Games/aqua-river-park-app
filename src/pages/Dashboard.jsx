import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/protected/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (error) {
        console.error("Error al acceder al dashboard:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🎉 Dashboard Protegido</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
