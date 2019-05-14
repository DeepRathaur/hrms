'use strict';
module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define('Designation', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Designation.associate = function(models) {
    // associations can be defined 
    this.hasMany(models.employee_position, { foreignKey: 'designation_id', sourceKey: 'id' });
    this.hasMany(models.vendor_personnel, { foreignKey: 'designation_id', sourceKey: 'id' });
  };
  Designation.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Designation;
};