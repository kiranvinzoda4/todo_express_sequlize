const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(), // Generate a UUID as the default value
    },
    title: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User', // This should match the model name of the User model
        key: 'id',
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Todo;
};
