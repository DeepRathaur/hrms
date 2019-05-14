'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_leave = sequelize.define('Employee_leave', {
    leavegrantemployee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    leave_type_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    leave_year: {
      type: DataTypes.STRING(100),
      allowNull:false
    },
    leave_month: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    leave_credit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    leave_availed: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
      defaultValue:0
    },
    leave_deduction: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
      defaultValue:0
    },
    leave_lapsed: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
      defaultValue:0
    },
    leave_encashed: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
      defaultValue:0
    },
    leave_balance : {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_leave.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Leavegrant_employee, { foreignKey: 'leavegrantemployee_id', sourceKey: 'id', onDelete: 'cascade' });
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.hasMany(models.Leave_application, { foreignKey: 'employee_leave_id', sourceKey: 'id' });
    
    this.belongsTo(models.Leave_type, { foreignKey: 'leave_type_id', sourceKey: 'id' });
  };
  Employee_leave.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_leave;
};