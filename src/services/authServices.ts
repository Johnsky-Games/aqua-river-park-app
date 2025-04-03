export async function loginRequest(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }
  
    return data;
  }
  