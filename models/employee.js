'use strict';
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        initials: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        nick_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        place_of_birth: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        birth_day: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        joining_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        employment_status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        probation_period: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        confirm_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        company_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        personal_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        marital_status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        marriage_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        blood_group: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        notice_period: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_physical_challaged: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        },
        mobile_number: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        emergency_contact_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        emergency_contact_number: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        father_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        spouse_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        salary_payment_mode: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        nationality: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        religion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_portal_access_allow: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        is_enable_mobile: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        device_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        device_type: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    Employee.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Users, {foreignKey: 'user_id', sourceKey: 'id'});
        this.belongsTo(models.Employment_status, {foreignKey: 'employment_status', sourceKey: 'id'});
        this.belongsTo(models.Nationality, {foreignKey: 'nationality', sourceKey: 'id'});
        this.belongsTo(models.Religion, {foreignKey: 'religion', sourceKey: 'id'});
        this.hasOne(models.Employee_access_card, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasOne(models.Employee_address, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_attendance, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_asset, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasOne(models.Employee_background, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_bank, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_document, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_family,    {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employee_generated_letter, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employee_generated_letter, {foreignKey: 'authorized_signatory', sourceKey: 'id'});
        this.hasMany(models.employee_idenity, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employee_nominee, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasOne(models.employee_pf, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employee_position, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employee_position, {foreignKey: 'reporting_to', sourceKey: 'id'});
        this.hasMany(models.Employee_prev_employment, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_probation, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_qualification, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Employee_resignation, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.organization_tree, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.organization_tree, {foreignKey: 'manager_employee_id', sourceKey: 'id'});
        this.hasMany(models.Leave_application, {as: 'EmployeeId', foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.Leave_application, {as: 'ApplyToId', foreignKey: 'apply_to', sourceKey: 'id'});
        this.hasMany(models.Leave_application, {as: 'ApprovedById', foreignKey: 'approved_by', sourceKey: 'id'});
        this.hasMany(models.Leave_application, {as: 'EditedById', foreignKey: 'edited_by', sourceKey: 'id'});
        this.hasMany(models.Employee_leave, {as: 'empid', foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.attendance_regularization, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.attendance_regularization, {foreignKey: 'apply_to', sourceKey: 'id'});
        this.hasMany(models.employeegps_tracking, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.job_opening, {foreignKey: 'job_opening_by', sourceKey: 'id'});
        this.hasMany(models.job_publish, {foreignKey: 'job_published_by', sourceKey: 'id'});
        this.hasMany(models.profile_shared_for_review, {as: 'SharedBy',foreignKey: 'shared_by', sourceKey: 'id'});
        this.hasMany(models.profile_shared_for_review, {as: 'ReviewBy', foreignKey: 'review_by', sourceKey: 'id'});
        this.hasMany(models.interview, {as: 'ScheduledBy', foreignKey: 'scheduled_by', sourceKey: 'id'});
        this.hasMany(models.interview, {as: 'InterviewBy', foreignKey: 'interviewer', sourceKey: 'id'});
        this.hasMany(models.training, { foreignKey: 'training_id', sourceKey: 'id'});
        this.hasMany(models.participant, { foreignKey: 'employee_id', sourceKey: 'id'});
        this.hasMany(models.employeetask, { foreignKey: 'allotedto', sourceKey: 'id'});
        this.hasMany(models.employeetask, { foreignKey: 'review_by', sourceKey: 'id'});
        this.hasMany(models.construction_site_employee, { foreignKey: 'employee_id', sourceKey: 'id'});
    };
    Employee.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return Employee;
};