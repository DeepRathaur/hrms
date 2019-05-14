'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_document = sequelize.define('Employee_document', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    category: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    doc_file: {
      type: DataTypes.STRING(100),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_document.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_document.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_document;
};