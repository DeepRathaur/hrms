'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logdate: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Login time",
      },
      lognum: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Total Login time",
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
        comment: "0 for disable and 1 is active",
      },
      extra: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Extra information of user",
      },
      rp_token: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "reset password token",
      },
      rp_token_created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "reset password token created",
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
    return queryInterface.dropTable('Users');
  }
};