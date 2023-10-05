module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
      dept_name: {
        type: Sequelize.STRING,
      },
    });
  
    return Department;
  };
  