module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee_list", {
  
    emp_name: {
      type: Sequelize.STRING,
      
    },
    dept_name: {
      type: Sequelize.STRING,
      
    },
    mobile: {
      type: Sequelize.STRING,
      
    },
    address: {
      type: Sequelize.STRING,
      
    },
    status: {
    type: Sequelize.STRING,}
  });

  return Employee;
};
