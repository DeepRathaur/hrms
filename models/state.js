'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
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
  State.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Country, { foreignKey: 'country_id', sourceKey: 'id' });
    this.hasMany(models.Employee_address, {foreignKey: 'state_id', sourceKey: 'id'});
  };
  State.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return State;
};