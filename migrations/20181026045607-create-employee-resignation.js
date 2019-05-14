'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_resignations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employees',
          key: 'id',
        }
      },
      leaving_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      resignation_submission_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      date_of_releiving: {
        type: Sequelize.DATE,
        allowNull:true
      },
      reason_for_leaving: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      has_left_the_organization: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_deceased: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      date_of_death: {
        type: Sequelize.DATE,
        allowNull:true
      },
      is_fit_to_be_rehired: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      employee_feedback: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      final_settlement_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      exit_intview_cond_on: {
        type: Sequelize.DATE,
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      no_due_certificat_isuued: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      is_notice_required: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_notice_served: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      notice_period: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      pf_leaving_reason: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      separation_mode: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      retirement_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      exclude_from_final_settlement: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Employee_resignations');
  }
};