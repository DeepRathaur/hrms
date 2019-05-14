'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_resignation = sequelize.define('Employee_resignation', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    leaving_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    resignation_submission_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    date_of_releiving: {
      type: DataTypes.DATE,
      allowNull:true
    },
    reason_for_leaving: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    has_left_the_organization: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_deceased: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    date_of_death: {
      type: DataTypes.DATE,
      allowNull:true
    },
    is_fit_to_be_rehired: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    employee_feedback: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    final_settlement_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    exit_intview_cond_on: {
      type: DataTypes.DATE,
      allowNull:true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    no_due_certificat_isuued: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    is_notice_required: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    is_notice_served: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0
    },
    notice_period: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    pf_leaving_reason: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    separation_mode: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    retirement_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
    exclude_from_final_settlement: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Employee_resignation.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', sourceKey: 'id' });
  };
  Employee_resignation.prototype.toWeb = function(req) {
    let json = this.toJSON();
    return json;
  };
  return Employee_resignation;
};