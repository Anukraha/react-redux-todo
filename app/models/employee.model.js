module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee_list", {
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
    dept_id: {
      type: Sequelize.INTEGER, // Assuming dept_id is an integer
      allowNull: false,
      references: {
        model: 'departments', // This refers to the table name in the database
        key: 'id', // This refers to the primary key in the referenced table (Department)
      }
    },
  });

  return Employee;
};
