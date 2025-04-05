// 📁 backend/app.js

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/index.js'; // ✅ Centraliza todas las rutas
import { authenticate } from './config/db.js';
import { notFound } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
require('dotenv').config();

const app = express();

// 🌐 Middleware globales
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());

// 🔌 Probar conexión DB
(async () => {
  try {
    await authenticate();
    console.log('✅ Conectado a la base de datos');
  } catch (error) {
    console.error('❌ Error de conexión a DB:', error);
  }
})();

// 📌 Rutas API
app.use('/api', routes);

// 📄 Ruta por defecto
app.get('/', (req, res) => {
  res.send('🚀 API Aqua River Park funcionando correctamente');
});

// 🛑 Middleware para rutas no encontradas
app.use(notFound);

// ⚠️ Middleware para manejar errores
app.use(errorHandler);

export default app;
