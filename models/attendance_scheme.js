'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance_scheme = sequelize.define('Attendance_scheme', {
    name: {
      type:DataTypes.STRING(200),
      allowNull:false
    },
    shift_rotation_policy_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    weekend_policy_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      deafultValue:1,
      allowNull:false
      
    },
  }, {});
  Attendance_scheme.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.shift_rotation_policy, { foreignKey: 'shift_rotation_policy_id', sourceKey: 'id' });
    this.belongsTo(models.Weekend_policy, { foreignKey: 'weekend_policy_id', sourceKey: 'id' });
    this.hasMany(models.employee_position, { foreignKey: 'attendance_scheme_id', sourceKey: 'id' });
  };
  Attendance_scheme.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Attendance_scheme;
};