module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
