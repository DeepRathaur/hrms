'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('trainings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            course_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull:false
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull:false
            },
            no_of_days: {
                type: Sequelize.INTEGER,
                allowNull:true
            },
            training_provider: {
                type: Sequelize.STRING(100),
                allowNull:false // internal,or external
            },
            delivery_location: {
                type: Sequelize.STRING(200),
                allowNull:true
            },
            delivery_method: {
                type: Sequelize.STRING(200),
                allowNull:true // Self study , classroom, Webex
            },
            training_cost : {
                type: Sequelize.INTEGER,
                allowNull:true
            },
            status: {
                type: Sequelize.STRING(200),
                allowNull:true // SCHEDULED, COMPLETED, CANCELLED
            },
            is_active:{
                type: Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:1
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
        return queryInterface.dropTable('trainings');
    }
};