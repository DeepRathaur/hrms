'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING(100),
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Users, {foreignKey: 'role_id', sourceKey: 'id'});
  };
  return Roles;
};