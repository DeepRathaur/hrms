'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('job_openings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            type: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            opening_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            no_of_position: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            experience: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            department_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            job_opening_by: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            location_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:0 //In-progress, Waiting for approval, On hold, Canceled, Filled
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
        return queryInterface.dropTable('job_openings');
    }
};