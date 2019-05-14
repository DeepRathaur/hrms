'use strict';
module.exports = (sequelize, DataTypes) => {
  const recruitment_profile = sequelize.define('recruitment_profile', {
      job_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      consultant_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING(200),
          allowNull: false
      },
      current_company: {
          type: DataTypes.STRING(200),
          allowNull: true
      },
      total_experience: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true
      },
      current_salary: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true
      },
      expected_salary: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true
      },
      contact: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
      email: {
          type: DataTypes.STRING(128),
          allowNull: false
      },
      resume: {
          type: DataTypes.STRING(200),
          allowNull: false
      },
      is_hired: {
          type: DataTypes.BOOLEAN,
          defaultValue:0,
          allowNull:true
      },
      comments: {
          type: DataTypes.TEXT,
          allowNull: true
      },
  }, {});
  recruitment_profile.associate = function(models) {
    // associations can be defined here
      this.belongsTo(models.job_opening, {foreignKey: 'job_id', sourceKey: 'id'});
      this.belongsTo(models.consultant, {foreignKey: 'consultant_id', sourceKey: 'id'});
      this.hasMany(models.profile_shared_for_review, {foreignKey: 'profile_id'});
      this.hasMany(models.interview, {foreignKey: 'profile_id'});
  };
  recruitment_profile.prototype.toWeb = function(){
    let json = this.toJSON();
    return json;
  };

  return recruitment_profile;
};