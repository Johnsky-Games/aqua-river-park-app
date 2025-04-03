import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authServices";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const userData = await loginRequest(data.email, data.password);
      login(userData.role); // usa el rol desde backend
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white dark:bg-bgDark rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-6 text-center">Iniciar Sesión</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Correo</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-secondary hover:bg-hoverSecondary text-white py-2 rounded-md transition"
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
