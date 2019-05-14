'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_prev_employments', {
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
      from_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      to_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      designation : {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      company_name: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      company_address: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      nature_of_duties: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      leaving_reason: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      relevant_experience: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      pf_member_id: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:1,
        allowNull:false
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
    return queryInterface.dropTable('Employee_prev_employments');
  }
};