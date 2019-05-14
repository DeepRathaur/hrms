'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee_pfs', {
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
      is_employee_eligible_for_pf: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_employee_eligible_for_excess_epf_contribution: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_employee_eligible_for_excess_eps_contribution: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_employee_eligible_for_esi: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_existing_member_of_pf: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      universal_account_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      pf_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      pf_scheme: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      pf_joining_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      family_pf_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      esi_number: {
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
    return queryInterface.dropTable('employee_pfs');
  }
};