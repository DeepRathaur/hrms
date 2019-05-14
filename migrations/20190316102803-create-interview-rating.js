'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('interview_ratings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            interview_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            relevant_education: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            relevant_work_exp: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            tech_skill: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            machine_test: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            communication: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            potential: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            adaptability: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            attitude: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            leadership: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            stress_tolerance: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            neatly_groomed: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            integrity: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            stability: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            overall_rating: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            overall_rating_auto: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            remarks: {
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
        return queryInterface.dropTable('interview_ratings');
    }
};