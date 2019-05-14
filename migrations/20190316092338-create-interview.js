'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('interviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            profile_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            schedule_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            scheduled_by: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            interviewer: {
                type: Sequelize.INTEGER,  //tech/hr/manager
                allowNull: true
            },
            interview_round: {
                type: Sequelize.STRING, //-- HR Round, Tech Round, Manager Round
                allowNull: true
            },
            interview_mode: {
                type: Sequelize.STRING, //Telephonic, F to F, Skype
                allowNull: true
            },
            interview_status: {
                type: Sequelize.STRING,  //Scheduled, Done, Cancel, Candidate Unavailable, Awaiting Confirmation, Schedul Confirmed.
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
        return queryInterface.dropTable('interviews');
    }
};