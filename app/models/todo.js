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
    strikethroughCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0, 
    },
    nonStrikethroughCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0, 
    },
  });

return Todo
      }