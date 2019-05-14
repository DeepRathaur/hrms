'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee_generated_letter = sequelize.define('employee_generated_letter', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    letter_template: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    serial_no: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    authorized_signatory: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    file_path: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    letter_generated_on: {
      type: DataTypes.DATE,
      allowNull:false   
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  employee_generated_letter.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, { foreignKey: 'authorized_signatory', sourceKey: 'id' });
  };
  employee_generated_letter.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return employee_generated_letter;
};