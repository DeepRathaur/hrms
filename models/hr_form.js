'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hr_form = sequelize.define('Hr_form', {
    serial: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    category: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    file_path: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    employee_filter: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Hr_form.associate = function(models) {
    // associations can be defined here
  };
  Hr_form.prototype.toWeb = function(req) {
    let json = this.toJSON(); 
    return json;
  };
  return Hr_form;
};