'use strict';
module.exports = (sequelize, DataTypes) => {
    const training_material = sequelize.define('training_material', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attachment: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    training_material.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training, {foreignKey: 'training_id', sourceKey: 'id'})
    };
    training_material.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return training_material;
};