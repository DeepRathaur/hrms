'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bulletin = sequelize.define('Bulletin', {
    category: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    rank: {
      type: DataTypes.INTEGER(10),
      allowNull:true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    file_path: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    employee_filter: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Bulletin.associate = function(models) {
    // associations can be defined here
  };
  Bulletin.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Bulletin;
};