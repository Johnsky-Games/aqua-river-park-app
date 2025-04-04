import Sequelize from 'sequelize';
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
    logging: false, // Opcional: evita que se impriman logs en consola
  }
);

// Objeto de base de datos para exportar
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.User = UserModel(sequelize, Sequelize);
db.Role = RoleModel(sequelize, Sequelize);
db.Permission = PermissionModel(sequelize, Sequelize);

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
