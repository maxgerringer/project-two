module.exports = function (sequelize, DataTypes) {
  const Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATEONLY
  });

  Assignment.associate = function (models) {
    Assignment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Assignment;
};
