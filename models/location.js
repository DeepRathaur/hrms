'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    contact: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull:true
      
    },
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Country, { foreignKey: 'country_id', sourceKey: 'id' });
    this.hasMany(models.Holiday_list, { foreignKey: 'location_id', sourceKey: 'id' });
    this.hasMany(models.employee_position, { foreignKey: 'location_id', sourceKey: 'id' });
    this.hasMany(models.job_opening, { foreignKey: 'location_id', sourceKey: 'id' });
    this.hasMany(models.construction_site, { foreignKey: 'branch_id', sourceKey: 'id' });
  };
  location.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return location;
};