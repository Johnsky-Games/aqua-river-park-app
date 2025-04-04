import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 🔧 Para que .env se cargue correctamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Usuario cargado desde .env:', process.env.DB_USER); // Verificación

import db from './models/index.js';
import { hash } from 'bcryptjs';

const run = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida con éxito.');

        await db.sequelize.sync({ alter: true }); // Sincroniza modelos

        // Crear usuario demo
        const passwordHash = await hash('demo1234', 10);
        const user = await db.User.create({
            name: 'Admin Demo',
            email: 'demo@aquariver.com',
            password_hash: passwordHash,
            is_confirmed: true
        });

        console.log('✅ Usuario demo creado con éxito:', user.email);
    } catch (err) {
        console.error('❌ Error en la conexión o creación:', err.message);
    } finally {
        await db.sequelize.close();
        console.log('🔌 Conexión cerrada.');
    }
};

run();
