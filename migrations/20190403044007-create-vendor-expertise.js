'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendor_expertises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      training_vendor_id: {
        type: Sequelize.INTEGER,
          allowNull:false
      },
      training_course_id: {
        type: Sequelize.INTEGER,
          allowNull:false
      },
      text: {
        type: Sequelize.TEXT,
          allowNull:true
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
    return queryInterface.dropTable('vendor_expertises');
  }
};