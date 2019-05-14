'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave_scheme_leave_type = sequelize.define('Leave_scheme_leave_type', {
    text: DataTypes.STRING
  }, {});
  Leave_scheme_leave_type.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Leave_schemes, { foreignKey: 'leave_schemes_id', sourceKey: 'id' });
    this.belongsTo(models.Leave_type, { foreignKey: 'leave_type_id', sourceKey: 'id' });
  };
  Leave_scheme_leave_type.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Leave_scheme_leave_type;
};