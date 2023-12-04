const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    task_status:{
        type: DataTypes.BOOLEAN,
        default: false,
    }
   
  });
  async function createHardcodedTasks() {
    try {
      await Task.sync({ force: true });
  
      const task1 = { task_name: 'Task 1', task_description: 'Implement google analytics' };
      const task2 = { task_name: 'Task 2', task_description: 'Update the client status'  };
      const task3 = {  task_name: 'Task 3', task_description: 'Check the compatibility of site'  };
  
      await Task.create(task1);
      await Task.create(task2);
      await Task.create(task3);
  
      console.log('Hardcoded tasks created and synced with the database:', task1, task2, task3);
    } catch (error) {
      console.error('Error creating and syncing tasks:', error);
    } 
  }
  
  createHardcodedTasks();

  return Task;
};
