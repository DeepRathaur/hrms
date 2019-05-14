'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave_type = sequelize.define('Leave_type', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    allow_emp_to_apply: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    sort_order: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leave_granting_frequency: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    max_leave_for_period: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    expires_after_days: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Leave_type.associate = function (models) {
    // associations can be defined here
    this.hasMany(models.Leave_scheme_leave_type,{foreignKey:'leave_type_id'});
    this.hasMany(models.Leave_application, { foreignKey: 'leave_type_id', sourceKey: 'id' });
    this.hasMany(models.Employee_leave, { foreignKey: 'leave_type_id', sourceKey: 'id' });
  };
  Leave_type.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Leave_type;
};