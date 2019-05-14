'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee_pf = sequelize.define('employee_pf', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    is_employee_eligible_for_pf: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_employee_eligible_for_excess_epf_contribution: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_employee_eligible_for_excess_eps_contribution: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_employee_eligible_for_esi: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_existing_member_of_pf: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    universal_account_number: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    pf_number: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    pf_scheme: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    pf_joining_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    family_pf_number: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    esi_number: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  employee_pf.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  employee_pf.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return employee_pf;
};