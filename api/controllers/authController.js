import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (users.length === 0) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};
