'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holiday_list = sequelize.define('Holiday_list', {
    holiday_date: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    is_optional: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'locations',
        key: 'id',
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Holiday_list.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.location, { foreignKey: 'location_id', sourceKey: 'id' });
  };
  Holiday_list.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Holiday_list;
};