'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('job_publishes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            job_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            consultant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            job_published_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            job_publish_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: true
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
        return queryInterface.dropTable('job_publishes');
    }
};