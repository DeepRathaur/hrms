'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_family = sequelize.define('Employee_family', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    relation: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    dateofbirth: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    blood_group: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull:true
    },
    profession: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    nationality_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_family.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Nationality, { foreignKey: 'nationality_id', sourceKey: 'id' });
    this.hasMany(models.employee_nominee, { foreignKey: 'family_id', sourceKey: 'id' });
  };
  Employee_family.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_family;
};