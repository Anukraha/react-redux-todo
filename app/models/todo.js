const Employee = require('./employee.model');
module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    employeeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  });

return Todo
      }