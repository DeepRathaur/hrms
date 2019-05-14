'use strict';
module.exports = (sequelize, DataTypes) => {
    const job_opening = sequelize.define('job_opening', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        opening_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        no_of_position: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        job_opening_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        job_status: {
            type: DataTypes.STRING(100),
            allowNull: true //In-progress, Waiting for approval, On hold, Canceled, Filled
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
    }, {});
    job_opening.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Department, {foreignKey: 'department_id', sourceKey: 'id'});
        this.belongsTo(models.Employee, {foreignKey: 'job_opening_by', sourceKey: 'id'});
        this.belongsTo(models.location, {foreignKey: 'location_id', sourceKey: 'id'});
        this.hasMany(models.job_publish, {foreignKey: 'job_id', sourceKey: 'id'});
        this.hasMany(models.recruitment_profile, {foreignKey: 'job_id', sourceKey: 'id'});

    };

    job_opening.prototype.toWeb = function (models) {
        let json = this.toJSON();
        return json;
    };

    return job_opening;
};