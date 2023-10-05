const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;
const Department = require("../models").departments;

module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new employee
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/", employees.findAll);

  // Retrieve a single employee with id
  router.get("/:id", employees.findOne);

  // Update an employee with id
  router.put("/:id", employees.update);

  // Delete an employee with id
  router.delete("/:id", employees.delete);

  // Delete all employees
  router.delete("/", employees.deleteAll);

  // Retrieve dept_name using dept_id
  router.get("/:id/dept_name", async (req, res) => {
    const departmentId = req.params.id;
    try {
      const department = await Department.findByPk(departmentId);
      if (department) {
        res.json({ dept_name: department.dept_name });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.use("/api/employees", router);
};
