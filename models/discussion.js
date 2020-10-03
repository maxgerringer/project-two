module.exports = function (sequelize, DataTypes) {
  const Discussion = sequelize.define('Discussion', {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Discussion.associate = function (models) {
    Discussion.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Discussion;
};
