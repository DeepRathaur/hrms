'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_access_card = sequelize.define('Employee_access_card', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    card_number: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull:false
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull:false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_access_card.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_access_card.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Employee_access_card;
};