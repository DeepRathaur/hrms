'use strict';
module.exports = (sequelize, DataTypes) => {
    const job_publish = sequelize.define('job_publish', {
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        consultant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_published_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_publish_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {});
    job_publish.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.job_opening, {foreignKey: 'job_id', sourceKey: 'id'});
        this.belongsTo(models.consultant, {foreignKey: 'consultant_id', sourceKey: 'id'});
        this.belongsTo(models.Employee, {foreignKey: 'job_published_by', sourceKey: 'id'});
    };
    job_publish.prototype.toWeb = function (models) {
        let json = this.toJSON();
        return json;
    };
    return job_publish;
};