'use strict';
module.exports = (sequelize, DataTypes) => {
    const interview_rating = sequelize.define('interview_rating', {
        interview_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true
        },
        relevant_education: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        relevant_work_exp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tech_skill: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        machine_test: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        communication: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        potential: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        adaptability: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        attitude: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        leadership: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stress_tolerance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        neatly_groomed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        integrity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stability: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        overall_rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        overall_rating_auto: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {});
    interview_rating.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.interview, { foreignKey: 'interview_id', sourceKey: 'id'});
    };
    interview_rating.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };
    return interview_rating;
};