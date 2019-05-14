'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee_idenity = sequelize.define('employee_idenity', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    doc_type: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    doc_number: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    name_as_per_document: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    expiray_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    aadhar_enrolment_no: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  employee_idenity.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  employee_idenity.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return employee_idenity;
};