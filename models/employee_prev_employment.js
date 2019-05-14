'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_prev_employment = sequelize.define('Employee_prev_employment', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    from_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    to_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    designation : {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    company_name: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    company_address: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    nature_of_duties: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    leaving_reason: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    relevant_experience: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    pf_member_id: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
    },
  }, {});
  Employee_prev_employment.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_prev_employment.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_prev_employment;
};