'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee_position = sequelize.define('employee_position', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    designation_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    grade_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    scheme_id: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    attendance_scheme_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    reporting_to: {
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    effective_from: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW()
    },
    effective_to: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW()
    },
    reason: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    is_current: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  employee_position.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Department, { foreignKey: 'department_id', sourceKey: 'id' });
    this.belongsTo(models.Designation, { foreignKey: 'designation_id', sourceKey: 'id' });
    this.belongsTo(models.Grade, { foreignKey: 'grade_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, { foreignKey: 'reporting_to', sourceKey: 'id' });
    this.belongsTo(models.location, { foreignKey: 'location_id', sourceKey: 'id' });
    this.belongsTo(models.Scheme, { foreignKey: 'scheme_id', sourceKey: 'id' });
    this.belongsTo(models.Attendance_scheme, { foreignKey: 'attendance_scheme_id', sourceKey: 'id' });
  };
  employee_position.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return employee_position;
};