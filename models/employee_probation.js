'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_probation = sequelize.define('Employee_probation', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    extend_period: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    revised_confirm_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    reason_of_extension: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_probation.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_probation.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_probation;
};