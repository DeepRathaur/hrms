'use strict';
module.exports = (sequelize, DataTypes) => {
  var construction_site_employee = sequelize.define('construction_site_employee', {
    constructionsite_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {});
  construction_site_employee.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.construction_site, { foreignKey: 'constructionsite_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };

  construction_site_employee.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return construction_site_employee;
};