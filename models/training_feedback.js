'use strict';
module.exports = (sequelize, DataTypes) => {
    const training_feedback = sequelize.define('training_feedback', {
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        rating: {
            type: DataTypes.STRING(255), //POOR, FAIR, GOOD, VERY GOOD, EXCELLENT
            allowNull: false
        },
    }, {});
    training_feedback.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training, {foreignKey: 'training_id', sourceKey: 'id'});
    };
    training_feedback.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return training_feedback;
};