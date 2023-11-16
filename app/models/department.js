module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("departments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    const Departments = [
      { id: 1001, department: 'HR' },
      { id: 1002, department: 'Testing' },
      { id: 1003, department: 'Web Development' },
      { id: 1004, department: 'Marketing' },
    ];
  
    Department.sync()
      .then(() => {
        return Promise.all(
          Departments.map(({ id, department }) => Department.findOrCreate({ where: { id, department } }))
        );
      })
      .catch((error) => {
        console.error('Error syncing departments:', error);
      });
  
    return Department;
  };
  