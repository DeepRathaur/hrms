'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define('Shift', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    start_time: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    end_time: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Shift.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Employee_attendance, { foreignKey: 'shift_id', sourceKey: 'id' });
  };
  Shift.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Shift;
};