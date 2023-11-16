const db = require("../models");
const Employee = db.employees;
const Todo= db.todo;
const Department = db.department;
const Op = db.Sequelize.Op;

Employee.hasOne(Todo, {
  foreignKey: "employeeId",
  as: "todo", 
});

Todo.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee", 
});

Employee.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department', 
});

Department.hasMany(Employee, {
  foreignKey: 'departmentId',
  as: 'employees', 
});

exports.create = (req, res) => {
  // Validate request
  if (!req.body.emp_name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  // Create a employee
  const employee = {
    
    emp_name: req.body.emp_name,
    dept_name:req.body.dept_name,
    mobile: req.body.mobile,
    address: req.body.address,
    status: req.body.status, 
    todo_description: req.body.todo_description,
    departmentId: req.body.departmentId
    
  };
  

  // Save employee in the database
  Employee.create(employee)
  .then(async (data) => {
    // Create a todo for the newly created employee
    const todo = await Todo.create({
      employeeId: data.id,
      description: `Hello! Complete your tasks, ${data.emp_name}.`,
    });
    res.send({ employee: data, todo: todo });
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the employee."
    });
  });
};

exports.findDept = (req, res) => {
  Department.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving departments."
      });
    });
};

exports.findAllTodos = (req, res) => {
  const id = req.params.id;

  Todo.findAll({
    where: {
      employeeId: id
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
  const emp_name = req.query.emp_name;
  var condition = emp_name ? { emp_name: { [Op.iLike]: `%${emp_name}%` } } : null;

  Employee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving employee with id=" + id
      });
    });
};

// Update a employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} employees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};


