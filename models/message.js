module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT
  });

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Message.associate = function (models) {
    Message.hasMany(models.Comment, {
      onDelete: 'cascade'
    });
  };

  return Message;
};
