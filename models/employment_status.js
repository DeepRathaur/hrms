'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employment_status = sequelize.define('Employment_status', {
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
  Employment_status.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Employee, {foreignKey: 'employment_status', sourceKey: 'id'});
    this.hasMany(models.Leave_schemes, {foreignKey: 'employment_status_id', sourceKey: 'id'});
  };
  Employment_status.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employment_status;
};