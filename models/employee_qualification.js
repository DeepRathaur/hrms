'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_qualification = sequelize.define('Employee_qualification', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    from_year: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    to_year: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    qualification: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    duration: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    institute: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    university: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    qualification_level: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    qualification_area: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    grade: {
      type: DataTypes.STRING(200),
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
  Employee_qualification.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_qualification.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_qualification;
};