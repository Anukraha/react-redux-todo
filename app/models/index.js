const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.departments = require("./department.model.js")(sequelize, Sequelize);
db.employees = require("./employee.model.js")(sequelize, Sequelize);


db.employees.belongsTo(db.departments, {
  foreignKey: 'dept_id', 
  onDelete: 'CASCADE',
});

db.departments.hasMany(db.employees, {
  foreignKey: 'dept_id', 
  onDelete: 'CASCADE',
});

module.exports = db;
