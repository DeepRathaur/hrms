'use strict';
module.exports = (sequelize, DataTypes) => {
  var employeetask = sequelize.define('employeetask', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    allotedto: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    review_by: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    review_remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    review_status: {
      type: DataTypes.STRING(200),
      allowNull:true    //completed,pending,in progress
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:true    
    },
  }, {});
  employeetask.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { as: 'EmployeeId',   foreignKey: 'allotedto', sourceKey: 'id' });
    this.belongsTo(models.Employee, { as: 'ReviewId',   foreignKey: 'review_by', sourceKey: 'id' });
  };
  employeetask.prototype.toWeb = function (req) {
    let json = this.toJSON();
    return json;
};
  return employeetask;
};