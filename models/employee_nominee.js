'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee_nominee = sequelize.define('employee_nominee', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    nominee_for: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    family_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    nomination_percent: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    is_mental_illness: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_minor: {
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
  employee_nominee.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Employee_family, { foreignKey: 'family_id', sourceKey: 'id' });
  };
  employee_nominee.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return employee_nominee;
};