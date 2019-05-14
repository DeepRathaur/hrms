'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recruitment_profiles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            job_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            consultant_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            current_company: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            total_experience: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: true
            },
            current_salary: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: true
            },
            expected_salary: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: true
            },
            contact: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false
            },
            resume: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            is_hired: {
                type: Sequelize.BOOLEAN,
                defaultValue:0,
                allowNull:true
            },
            comments: {
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
        return queryInterface.dropTable('recruitment_profiles');
    }
};