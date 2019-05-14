'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_bank = sequelize.define('Employee_bank', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false  
    },
    bank_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    account_number: {
      type: DataTypes.STRING(255),
      allowNull:false
    },
    account_type: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    name_as_per_bank: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_bank.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', sourceKey: 'id' });
  };
  Employee_bank.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_bank;
};