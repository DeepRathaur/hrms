'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('training_feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      training_id: {
        type: Sequelize.INTEGER,
          allowNull:false
      },
      comments: {
        type: Sequelize.TEXT,
          allowNull:true
      },
      rating: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('training_feedbacks');
  }
};