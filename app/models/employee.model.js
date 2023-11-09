module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employees", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_name: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    todo_description: {
      type: Sequelize.JSON,
    },
  });



  return Employee;
};
