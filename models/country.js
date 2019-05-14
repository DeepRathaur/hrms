'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    code: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    dial_code: {
      type: DataTypes.STRING(100),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.State, {foreignKey: 'country_id', sourceKey: 'id'});
    this.hasMany(models.Employee_address, {foreignKey: 'country_id', sourceKey: 'id'});
    this.hasMany(models.location, {foreignKey: 'country_id', sourceKey: 'id'});
  };
  Country.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Country;
};