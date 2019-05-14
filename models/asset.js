'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    serial_number: {
      type: DataTypes.STRING(255),
      allowNull:false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Asset.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Employee_asset, {foreignKey: 'asset_id', sourceKey: 'id'});
  };
  Asset.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Asset;
};