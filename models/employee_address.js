'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_address = sequelize.define('Employee_address', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull:true
    },
    address_type: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    address3: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    city: {
      type: DataTypes.STRING,
      allowNull:true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    pin: {
      type: DataTypes.STRING(100),
      allowNull:true
    },
    phone1: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    phone2: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    fax: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    mobile: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    extn_no: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_address.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.State, { foreignKey: 'state_id', sourceKey: 'id' });
    this.belongsTo(models.Country, { foreignKey: 'country_id', sourceKey: 'id' });
  };
  Employee_address.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Employee_address;
};