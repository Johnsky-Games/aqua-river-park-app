export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING(100), allowNull: false },
	email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
	password_hash: { type: DataTypes.STRING, allowNull: false },
	is_confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
	confirmation_token: { type: DataTypes.STRING },
	confirmation_expires: { type: DataTypes.DATE },
	reset_token: { type: DataTypes.STRING },
	reset_expires: { type: DataTypes.DATE },
	created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	last_login: { type: DataTypes.DATE },
	avatar_url: { type: DataTypes.STRING },
	login_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
	locked_until: { type: DataTypes.DATE }
  }, {
	tableName: 'users',
	timestamps: false
  });
};