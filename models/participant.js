'use strict';
module.exports = (sequelize, DataTypes) => {
    const participant = sequelize.define('participant', {
        training_id: {
            type: DataTypes.INTEGER
        },
        employee_id: {
            type: DataTypes.INTEGER
        },
    }, {});
    participant.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training, {foreignKey: 'training_id', sourceKey: 'id'});
        this.belongsTo(models.Employee, {foreignKey: 'employee_id', sourceKey: 'id'});
    };
    participant.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return participant;
};