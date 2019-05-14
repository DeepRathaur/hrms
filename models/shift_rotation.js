'use strict';
module.exports = (sequelize, DataTypes) => {
  const shift_rotation = sequelize.define('shift_rotation', {
    text: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
  }, {});
  shift_rotation.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Shift, {foreignKey: 'shift_id', sourceKey: 'id'});
    this.belongsTo(models.shift_rotation_policy, {foreignKey: 'shift_rotation_policy_id', sourceKey: 'id'});
  };
  shift_rotation.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return shift_rotation;
};