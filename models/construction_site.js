'use strict';
module.exports = (sequelize, DataTypes) => {
  var construction_site = sequelize.define('construction_site', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {});
  construction_site.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.location, { foreignKey: 'branch_id', sourceKey: 'id' });
    this.hasMany(models.construction_site_employee, {foreignKey: 'constructionsite_id', sourceKey: 'id'});
  };
  construction_site.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return construction_site;
};