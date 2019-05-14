'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_background = sequelize.define('Employee_background', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    background_check_status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    varification_completed_on: {
      type: DataTypes.DATE,
      allowNull:true
    },
    agency_name: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_background.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_background.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_background;
};