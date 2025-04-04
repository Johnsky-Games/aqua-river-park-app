export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      is_confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
      confirmation_token: { type: DataTypes.STRING, allowNull: true },
      confirmation_expires: { type: DataTypes.DATE, allowNull: true },
      reset_token: { type: DataTypes.STRING, allowNull: true },
      reset_expires: { type: DataTypes.DATE, allowNull: true },
      last_login: { type: DataTypes.DATE, allowNull: true },
      avatar_url: { type: DataTypes.STRING, allowNull: true },
      login_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
      locked_until: { type: DataTypes.DATE, allowNull: true },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      tableName: 'users',
      underscored: true,
      timestamps: false
    });
  };