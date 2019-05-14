'use strict';
module.exports = (sequelize, DataTypes) => {
  const organization_tree = sequelize.define('organization_tree', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    manager_employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    reporting_from: {
      type: DataTypes.DATE,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  organization_tree.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
    this.belongsTo(models.Employee, {as:'ManagerId' ,foreignKey: 'manager_employee_id', sourceKey: 'id' });
  };
  organization_tree.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return organization_tree;
};