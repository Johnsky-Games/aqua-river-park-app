export default (sequelize, DataTypes) => {
  return sequelize.define('Permission', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
  }, {
	tableName: 'permissions',
	timestamps: false
  });
};