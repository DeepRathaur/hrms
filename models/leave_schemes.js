'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave_schemes = sequelize.define('Leave_schemes', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    weekend_policy_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    employment_status_id: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Leave_schemes.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Weekend_policy, { foreignKey: 'weekend_policy_id', sourceKey: 'id' });
    this.hasMany(models.Leave_scheme_leave_type,{foreignKey:'leave_schemes_id'});
    this.hasMany(models.Leave_grant,{foreignKey:'leavescheme_id'});
    this.belongsTo(models.Employment_status, { foreignKey: 'employment_status_id', sourceKey: 'id' });
    
  };
  Leave_schemes.prototype.toWeb = function(req) {
    let json = this.toJSON(); 
    return json;
  };
  return Leave_schemes;
};