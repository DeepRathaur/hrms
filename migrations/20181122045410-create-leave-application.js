'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leave_applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference : {
          model: 'Employee',
          key: 'id',
        }
      },
      employee_leave_id : {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      apply_date: {
        type: Sequelize.DATE
      },
      leave_type_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference : {
          model: 'Leave_type',
          key: 'id',
        }
      },
      emergency_address: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      leave_from: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      leave_to: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      total_leave_days: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      is_cancelled: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      is_rejected: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      is_withdraw: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      cancel_reason :{
        type: Sequelize.TEXT,
        allowNull:true
      },
      
      approved_by: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference : {
          model: 'Employee',
          key: 'id',
        }
      },
      edited_by: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference : {
          model: 'Employee',
          key: 'id',
        }
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
    return queryInterface.dropTable('Leave_applications');
  }
};