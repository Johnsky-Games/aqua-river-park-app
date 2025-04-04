import express from 'express';
import protectedRoutes from './routes/protectedRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 🛡️ Rutas protegidas
app.use('/api/protected', protectedRoutes);

// 🔑 Rutas de autenticación
app.use('/api/auth', authRoutes);

export default app;
