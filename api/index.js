require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models').default;
const path = require('path');

// Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes').default;
// Puedes agregar más rutas como:
// const clientRoutes = require('./routes/clientRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Carpeta para servir archivos estáticos (ej. imágenes de perfil)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/clients', clientRoutes);

(async () => {
    try {
        await db.sequelize.authenticate(); // opcional, útil para pruebas de conexión
        await db.sequelize.sync();         // sincroniza modelos con la base de datos
        console.log('✅ Base de datos conectada');

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () =>
            console.log(`🚀 Servidor en ejecución: http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error('❌ Error al conectar la base de datos:', err);
    }
})();
