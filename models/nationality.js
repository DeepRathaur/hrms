'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nationality = sequelize.define('Nationality', {
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
  Nationality.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Employee, {foreignKey: 'nationality', sourceKey: 'id'});
    this.hasMany(models.Employee, {foreignKey: 'Employee_family', sourceKey: 'id'});
  };
  Nationality.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Nationality;
};