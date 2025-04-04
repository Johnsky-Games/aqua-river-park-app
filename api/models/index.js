import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('./api/.env') });

import UserModel from './User.js';
import RoleModel from './Role.js';
import PermissionModel from './Permission.js';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: '-05:00',
        define: {
            // Global model options
            timestamps: false // Turn off timestamps globally
        },
        // Add this query to execute at connection time
        pool: {
            afterConnect: (connection, done) => {
                connection.query('SET SESSION sql_mode = ""', (err) => {
                    done(err, connection);
                });
            }
        }
    }
);

// Modelos
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, DataTypes);
db.Role = RoleModel(sequelize, DataTypes);
db.Permission = PermissionModel(sequelize, DataTypes);

// Relaciones
db.Role.hasMany(db.User, { foreignKey: 'role_id' });
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });

db.User.belongsToMany(db.Permission, {
    through: 'user_permissions',
    foreignKey: 'user_id'
});
db.Permission.belongsToMany(db.User, {
    through: 'user_permissions',
    foreignKey: 'permission_id'
});

export default db;
