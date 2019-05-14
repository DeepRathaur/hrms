'use strict';
module.exports = (sequelize, DataTypes) => {
    const profile_shared_for_review = sequelize.define('profile_shared_for_review', {
        profile_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shared_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shared_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        review_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        review_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_shortlisted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {});
    profile_shared_for_review.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Employee, { as: 'SharedBy',   foreignKey: 'shared_by', sourceKey: 'id' });
        this.belongsTo(models.Employee, { as: 'ReviewBy',    foreignKey: 'review_by', sourceKey: 'id'});
        this.belongsTo(models.recruitment_profile, { foreignKey: 'profile_id', sourceKey: 'id'});
    };
    profile_shared_for_review.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };
    return profile_shared_for_review;
};