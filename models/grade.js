'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
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
  Grade.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.employee_position, { foreignKey: 'grade_id', sourceKey: 'id' });
  };
  Grade.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Grade;
};