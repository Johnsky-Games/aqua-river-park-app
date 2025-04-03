import Sequelize from 'sequelize';
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User').default(sequelize, Sequelize);
db.Role = require('./Role').default(sequelize, Sequelize);
db.Permission = require('./Permission').default(sequelize, Sequelize);
// Relaciones
db.Role.hasMany(db.User, { foreignKey: 'role_id' });
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });
db.User.belongsToMany(db.Permission, { through: 'user_permissions', foreignKey: 'user_id' });
db.Permission.belongsToMany(db.User, { through: 'user_permissions', foreignKey: 'permission_id' });
export default db;