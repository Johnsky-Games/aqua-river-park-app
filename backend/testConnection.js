import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('./api/.env') });

import db from './models/index.js'; // 👈 corregido
import { hash } from 'bcryptjs';


console.log('🔐 Usuario MySQL desde .env:', process.env.DB_USER);
console.log('🔐 Nombre BD desde .env:', process.env.DB_NAME);

const run = async () => {
    try {
        console.log('Usuario:', process.env.DB_USER);
        await db.sequelize.authenticate();
        console.log('✅ Conexión establecida');
        // Set SQL mode BEFORE sync
        await db.sequelize.query("SET SESSION sql_mode=''");
        console.log('✅ SQL Mode set to non-strict');
        
        await db.sequelize.sync({ alter: true });

        const roles = ['admin', 'editor', 'validador'];
        for (const name of roles) {
            await db.Role.findOrCreate({ where: { name } });
        }

        const permissions = ['manage_users', 'validate_qr', 'view_clients', 'manage_services', 'view_dashboard'];
        for (const name of permissions) {
            await db.Permission.findOrCreate({ where: { name } });
        }

        const passwordHash = await hash('demo1234', 10);
        const [user, created] = await db.User.findOrCreate({
            where: { email: 'demo@aquariver.com' },
            defaults: {
                name: 'Admin Demo',
                password_hash: passwordHash,
                is_confirmed: true
            }
        });

        const adminRole = await db.Role.findOne({ where: { name: 'admin' } });
        if (adminRole) user.role_id = adminRole.id;
        await user.save();

        const assignedPermissions = await db.Permission.findAll();
        await user.setPermissions(assignedPermissions);

        console.log('✅ Usuario demo listo con permisos y rol');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await db.sequelize.close();
        console.log('🔌 Conexión cerrada.');
    }
};

run();
