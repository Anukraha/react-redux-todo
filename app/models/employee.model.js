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
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id', // Assuming 'id' is the primary key of the 'departments' table
      }
    },
  });

  // Define association with the Departments model
  Employee.belongsTo(sequelize.models.departments, {
    foreignKey: 'dept_id',
    targetKey: 'id', // 'id' is the primary key of the 'departments' table
    as: 'department',
  });
  
  return Employee;
};
