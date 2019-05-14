'use strict';
module.exports = (sequelize, DataTypes) => {
  const shift_rotation_policy = sequelize.define('shift_rotation_policy', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    frequency: {
      type: DataTypes.INTEGER(4),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  shift_rotation_policy.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Attendance_scheme, { foreignKey: 'shift_rotation_policy_id', sourceKey: 'id' });
   

  };
  shift_rotation_policy.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return shift_rotation_policy;
};