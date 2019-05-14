'use strict';
module.exports = (sequelize, DataTypes) => {
    const trainers_external = sequelize.define('trainers_external', {
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vaendor_personnel_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    trainers_external.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training,{foreignKey:'training_id',sourceKey:'id'});
        this.belongsTo(models.vendor_personnel,{foreignKey:'vaendor_personnel_id',sourceKey:'id'});
    };
    trainers_external.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return trainers_external;
};