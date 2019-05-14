'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_asset = sequelize.define('Employee_asset', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    valid_till: {
      type: DataTypes.DATE,
      allowNull:true
    },
    returned_on: {
      type: DataTypes.DATE,
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_asset.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Asset, { foreignKey:    'asset_id', sourceKey: 'id' });
  };
  Employee_asset.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Employee_asset;
};