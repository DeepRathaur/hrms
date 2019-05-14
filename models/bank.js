'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      //unique:true
    },
    ifsc_code: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    micr_code: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull:true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    contact: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    district: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Bank.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Employee_bank, {foreignKey: 'bank_id', sourceKey: 'id'});
  };
  Bank.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Bank;
};