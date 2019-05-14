'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weekend_policy = sequelize.define('Weekend_policy', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    saturday_week1: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    saturday_week2: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    saturday_week3: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    saturday_week4: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    saturday_week5: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    sunday_week1: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    sunday_week2: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    sunday_week3: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    sunday_week4: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    sunday_week5: {
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
  Weekend_policy.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Attendance_scheme, { foreignKey: 'weekend_policy_id', sourceKey: 'id' });
    this.hasMany(models.Leave_schemes, { foreignKey: 'weekend_policy_id', sourceKey: 'id' });
  };
  Weekend_policy.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Weekend_policy;
};