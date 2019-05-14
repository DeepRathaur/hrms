'use strict';
module.exports = (sequelize, DataTypes) => {
    const interview = sequelize.define('interview', {
        profile_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        schedule_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        scheduled_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        interviewer: {
            type: DataTypes.INTEGER,  //tech/hr/manager
            allowNull: true
        },
        interview_round: {
            type: DataTypes.STRING, //-- HR Round, Tech Round, Manager Round
            allowNull: true
        },
        interview_mode: {
            type: DataTypes.STRING, //Telephonic, F to F, Skype
            allowNull: true
        },
        interview_status: {
            type: DataTypes.STRING,  //Scheduled, Done, Cancel, Candidate Unavailable, Awaiting Confirmation, Schedul Confirmed.
            allowNull: true
        },
    }, {});
    interview.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Employee, { as: 'ScheduledBy',    foreignKey: 'scheduled_by', sourceKey: 'id'});
        this.belongsTo(models.Employee, { as: 'InterviewBy',    foreignKey: 'interviewer', sourceKey: 'id'});
        this.belongsTo(models.recruitment_profile, { foreignKey: 'profile_id', sourceKey: 'id'});
        this.hasMany(models.interview_rating, { foreignKey: 'interview_id', sourceKey: 'id'});
    };
    interview.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };
    return interview;
};