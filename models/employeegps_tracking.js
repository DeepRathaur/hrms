'use strict';
module.exports = (sequelize, DataTypes) => {
    const employeegps_tracking = sequelize.define('employeegps_tracking', {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lattitude: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        longitude: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    employeegps_tracking.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Employee, {foreignKey: 'employee_id', sourceKey: 'id'});
    };
    employeegps_tracking.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return employeegps_tracking;
};