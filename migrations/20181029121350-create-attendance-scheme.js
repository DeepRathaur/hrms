'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attendance_schemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING(200),
        allowNull:false
      },
      shift_rotation_policy_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'shift_rotation_policies',
          key: 'id',
        }
      },
      weekend_policy_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Weekend_policies',
          key: 'id',
        }
        
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        deafultValue:1
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
    return queryInterface.dropTable('Attendance_schemes');
  }
};