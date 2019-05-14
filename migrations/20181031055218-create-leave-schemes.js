'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leave_schemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      weekend_policy_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Weekend_policies',
          key: 'id',
        }
      },
      employment_status_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employment_status',
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
    return queryInterface.dropTable('Leave_schemes');
  }
};