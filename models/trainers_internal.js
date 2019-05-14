'use strict';
module.exports = (sequelize, DataTypes) => {
    const trainers_internal = sequelize.define('trainers_internal', {
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    trainers_internal.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training,{foreignKey:'training_id',sourceKey:'id'});
        this.belongsTo(models.Employee,{foreignKey:'trainer_id',sourceKey:'id'});
    };
    trainers_internal.prototype.toWeb = function(req) {
        let json = this.toJSON();
        return json;
    };
    return trainers_internal;
};