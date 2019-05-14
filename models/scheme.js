'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scheme = sequelize.define('Scheme', {
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
  Scheme.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.employee_position, { foreignKey: 'scheme_id', sourceKey: 'id' });
  };
  Scheme.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Scheme;
};