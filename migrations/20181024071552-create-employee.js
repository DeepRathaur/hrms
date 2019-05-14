'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      initials: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      nick_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      middle_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      place_of_birth: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      birth_day: {
        type: Sequelize.STRING(50),
        allowNull:true
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      joining_date: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      employment_status: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Employment_statuses',
          key: 'id',
        }
      },
      probation_period: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      confirm_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      company_email: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      personal_email: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      marital_status: {
        type: Sequelize.STRING(20),
        allowNull:true
      },
      marriage_date: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      blood_group: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      notice_period: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      is_physical_challaged: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      mobile_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      emergency_contact_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      emergency_contact_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      father_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      spouse_name: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      salary_payment_mode: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      nationality: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Nationalities',
          key: 'id',
        }
      },
      religion: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Religions',
          key: 'id',
        }
      },
      is_portal_access_allow: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Employees');
  }
};