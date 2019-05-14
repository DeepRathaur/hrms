'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave_grant = sequelize.define('Leave_grant', {
    leavescheme_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {});
  Leave_grant.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Leave_schemes, { foreignKey: 'leavescheme_id', sourceKey: 'id' });
    this.hasMany(models.Leavegrant_employee,{foreignKey:'leavegrant_id'});
  };
  Leave_grant.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Leave_grant;
};