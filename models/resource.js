module.exports = function (sequelize, DataTypes) {
  const Resource = sequelize.define('Resource', {
    topic: DataTypes.STRING,
    url: DataTypes.TEXT
  });

  Resource.associate = function (models) {
    Resource.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Resource;
};
