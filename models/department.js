'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.employee_position, { foreignKey: 'department_id', sourceKey: 'id' });
    this.hasMany(models.job_opening, { foreignKey: 'department_id', sourceKey: 'id' });
  };
  Department.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Department;
};