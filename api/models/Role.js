export default (sequelize, DataTypes) => {
  return sequelize.define('Role', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
  }, {
	tableName: 'roles',
	timestamps: false
  });
};