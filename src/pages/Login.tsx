import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/"); // Redirige al home o dashboard según el rol
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-bgDark">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-bgLight p-8 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-accent1 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
