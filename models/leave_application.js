'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave_application = sequelize.define('Leave_application', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    employee_leave_id : {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    apply_date: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    apply_to: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    leave_type_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    emergency_address: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    leave_from: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    leave_to: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    total_leave_days: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue:0,
      allowNull:false
    },
    is_cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue:0,
      allowNull:false
    },
    is_rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue:0,
      allowNull:false
    },
    is_withdraw: {
      type: DataTypes.BOOLEAN,
      defaultValue:0,
      allowNull:false
    },
    cancel_reason :{
      type: DataTypes.TEXT,
      allowNull:true
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    edited_by: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Leave_application.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { as: 'EmployeeId',   foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, { as: 'ApplyToId',    foreignKey: 'apply_to', sourceKey: 'id'});
    this.belongsTo(models.Employee, { as: 'ApprovedById', foreignKey: 'approved_by', sourceKey: 'id' });
    this.belongsTo(models.Employee, { as: 'EditedById' ,  foreignKey: 'edited_by', sourceKey: 'id' });
    this.belongsTo(models.Leave_type, { foreignKey: 'leave_type_id', sourceKey: 'id' });
    this.belongsTo(models.Employee_leave, { foreignKey: 'employee_leave_id', sourceKey: 'id' });
  };
  Leave_application.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Leave_application;
};