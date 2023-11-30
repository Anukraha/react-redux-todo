const cors = require('cors');
const employees = require("../controllers/employee.controller.js");
const express = require("express");

const router = express.Router();

// Enable CORS for all routes
router.use(cors());
  // Create a new employee
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/", employees.findAll);

  router.get("/:id/todos", employees.findAllTodos);

  router.get("/:id/dept", employees.findDept);
  // Retrieve a single employee with id
  router.get("/:id", employees.findOne);

  // Update an employee with id
  router.put("/:id", employees.update);

  // Delete an employee with id
  router.delete("/:id", employees.delete);

  // Delete all employees
  router.delete("/", employees.deleteAll);

  router.put('/:id/todos/strikethrough', employees.updateStrikethroughCount);


  // Retrieve dept_name using dept_id

  module.exports = app => {
    app.use("/api/employees", router);
  };
