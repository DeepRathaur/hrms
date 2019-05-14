'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leavegrant_employee = sequelize.define('Leavegrant_employee', {
    leavegrant_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {});
  Leavegrant_employee.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Leave_grant, { foreignKey: 'leavegrant_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.hasMany(models.Employee_leave, { foreignKey: 'leavegrantemployee_id', sourceKey: 'id' });
  };
  Leavegrant_employee.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Leavegrant_employee;
};