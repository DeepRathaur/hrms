'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_attendance = sequelize.define('Employee_attendance', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false 
    },
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull:false 
    },
    swipe_date: {
      type: DataTypes.DATE,
      allowNull:true,
    },
    punch_in: {
      type: DataTypes.DATE,
      allowNull:true,
    },
    punch_out: { 
      type: DataTypes.DATE,
      allowNull:true,
    },
    door: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    late: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    early_leaving: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    overtime: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    punchin_lattitude: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    punchin_longitude: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    punchin_image: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
    punchout_lattitude: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    punchout_longitude: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    punchout_image: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:1
    },
  }, {});
  Employee_attendance.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Shift, { foreignKey: 'shift_id', sourceKey: 'id' });
  };
  Employee_attendance.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_attendance;
};