require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads', express.static('public/uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

(async () => {
    try {
        await db.sequelize.sync();
        console.log('Base de datos conectada');
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error al conectar la base de datos:', err);
    }
})();
