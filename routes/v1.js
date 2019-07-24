'use strict';
const express = require('express');
const router = express.Router();
const PARAMS = require('../config/globalparams');
const UserController = require('../controllers/user.controller');
const Department = require('../controllers/department.controller');
const Schemes = require('../controllers/scheme.controller');
const Religion = require('../controllers/religion.controller');
const Country = require('../controllers/country.controller');
const Designation = require('../controllers/designation.controller');
const Nationality = require('../controllers/nationality.controller');
const Grade = require('../controllers/grade.controller');
const Shift = require('../controllers/shift.controller');
const Leave_type = require('../controllers/leavetype.controller');
const Bank = require('../controllers/bank.controller');
const State = require('../controllers/state.controller');
const Employmentstatus = require('../controllers/employmentstatus.controller');
const Employee = require('../controllers/employee.controller');
const Employeeaccesscard = require('../controllers/employeeaccesscard.controller');
const Employeeaddress = require('../controllers/employeeaddress.controller');
const Asset = require('../controllers/asset.controller');
const Employeeasset = require('../controllers/employeeasset.controller');
const Employeeattendance = require('../controllers/employeeattendance.controller');
const Employeebackground = require('../controllers/employeebackground.controller');
const Employeebank = require('../controllers/employeebank.controller');
const Employeedocuments = require('../controllers/employeedocuments.controller');
const Employeefamily = require('../controllers/employeefamily.controller');
const Employeegeneratedletter = require('../controllers/employeegeneratedletter.controller');
const Employeeidentity = require('../controllers/employeeidentity.controller');
const Employeenominee = require('../controllers/employeenominee.controller');
const Employeepf = require('../controllers/employeepf.controller');
const Employeeposition = require('../controllers/employeeposition.controller');
const Employeeprevemployment = require('../controllers/employeeprevemployment.controller');
const Employeeprobation = require('../controllers/employeeprobation.controller');
const Employeequalification = require('../controllers/employeequalification.controller');
const Employeeresignation = require('../controllers/employeeresignation.controller');
const Weekendpolicies = require('../controllers/weekendpolicy.controller');
const Shiftrotationpolicy = require('../controllers/shiftrotationpolicy.controller');
const Organizationtree = require('../controllers/organizationtree.controller');
const Location = require('../controllers/location.controller');
const Attendancescheme = require('../controllers/attendancescheme.controller');
const Bulletins = require('../controllers/bulletins.controller');
const Holidaylist = require('../controllers/holidaylist.controller');
const Hrform = require('../controllers/hrform.controller');
const Leaveschemes = require('../controllers/leaveschemes.controller');
const Leaveapplication = require('../controllers/leavesapplication.controller');
const Leaveschemeleavetypes = require('../controllers/leaveschemeleavetypes.controller');
const LeaveGrant = require('../controllers/leavegrant.controller');
const EmployeeLeave = require('../controllers/employeeleave.controller');
const AttendanceRegularization = require('../controllers/attendanceregularization.controller');
const PolicyGuidelines = require('../controllers/policyguidelines.controller');
const EmployeeGpsTracking = require('../controllers/employeegpstracking.controller');
const ImportExcel = require('../controllers/importexcel.controller');
const JobOpening = require('../controllers/jobopening.controller');
const JobPublish = require('../controllers/jobpublish.controller');
const Consultant = require('../controllers/consultant.controller');
const RecruitmentProfile = require('../controllers/recruitmentprofile.controller');
const ProfileReview = require('../controllers/profilesharedforreview.controller');
const Interview = require('../controllers/interview.controller');
const InterviewRating = require('../controllers/interviewrating.controller');
const TrainingCourse = require('../controllers/training_course.controller');
const CourseTopic = require('../controllers/training_course_topic.controller');
const TrainingVendor = require('../controllers/trainingvendor.controller');
const VendorPersonnel = require('../controllers/vendorperonnel.controller');
const Training = require('../controllers/training.controller');
const TrainingMaterial = require('../controllers/trainingmaterial.controller');
const Participants = require('../controllers/participants.controller');
const TrainingFeedback = require('../controllers/trainingfeedback.controller');
const EmployeeTask = require('../controllers/employeetask.controller');
const ConstructionSite = require('../controllers/constructionsite.controller');
const ConstructionSiteEmployee = require('../controllers/constructionsiteemployee.controller');


const passport = require('passport');
const allowOnly = require('../services/routes.helper').allowOnly;

require('./../middleware/passport')(passport);

/* GET home page. */
router.get('/', function (req, res) {
    res.json({status: "success", message: "HRMS Pending API", data: {"version_number": "v1.0.0"}})
});

/**
 * @Users Controller Routing
 */
router.post('/users', UserController.create);                                                                                                         // C
router.post('/users/login', UserController.login);                     // Login
router.get('/users', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, UserController.getAll));                    // R
router.get('/users/:uuid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserController.getOne));                    // R
router.put('/users/:uuid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserController.update));                    // U
router.delete('/users/:uuid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, UserController.remove));                    // D

/**
 * @Department Controller Routing
 */
router.post('/departments', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Department.create));
router.get('/departments', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Department.getAll));               // R
router.put('/departments/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, Department.update));                    // U
router.delete('/departments/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Department.remove));

/**
 * @Scheme Controller Routing
 */
router.post('/schemes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Schemes.create));
router.get('/schemes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Schemes.getAll));               // R
router.put('/schemes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, Schemes.update));                    // U
router.delete('/schemes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Schemes.remove));

/**
 * @Religion  Controller Routing
 */
router.post('/religion', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Religion.create));                                // C
router.get('/religion', Religion.getAll);
router.put('/religion/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Religion.update));                                // U
router.delete('/religion/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Religion.remove));                                // D

/**
 * @Country  Controller Routing
 */
router.post('/country', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Country.create));           // C
router.get('/country', Country.getAll);
router.put('/country/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Country.update));           // U
router.delete('/country/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Country.remove));           // D

/**
 * @Designation  Controller Routing
 */
router.post('/designation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Designation.create));    // C
router.get('/designation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Designation.getAll));     // R
router.put('/designation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Designation.update));    // U
router.delete('/designation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Designation.remove));    // D

/**
 * @Nationality  Controller Routing
 */
router.post('/nationality', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Nationality.create));    // C
router.get('/nationality', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Nationality.getAll));     // R
router.put('/nationality/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Nationality.update));    // U
router.delete('/nationality/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Nationality.remove));    // D

/**
 * @Grade  Controller Routing
 */
router.post('/grade', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Grade.create));    // C
router.get('/grade', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Grade.getAll));     // R
router.put('/grade/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Grade.update));    // U
router.delete('/grade/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Grade.remove));    // D

/**
 * @Shift  Controller Routing
 */
router.post('/shift', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shift.create));    // C
router.get('/shift', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shift.getAll));     // R
router.put('/shift/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shift.update));    // U
router.delete('/shift/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shift.remove));    // D

/**
 * @Leave_type  Controller Routing
 */
router.post('/leave_type', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leave_type.create));    // C
router.get('/leave_type', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leave_type.getAll));     // R
router.put('/leave_type/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leave_type.update));    // U
router.delete('/leave_type/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leave_type.remove));    // D
router.get('/leavetype/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, Leave_type.getOne));     // R


/**
 * @Bank  Controller Routing
 */
router.post('/bank', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bank.create));    // C
router.get('/bank', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bank.getAll));     // R
router.put('/bank/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bank.update));    // U
router.delete('/bank/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bank.remove));    // D

/**
 * @State  Controller Routing
 */
router.post('/state', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, State.create));    // C
router.get('/state', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, State.getAll));     // R
router.put('/state/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, State.update));    // U
router.delete('/state/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, State.remove));    // D

/**
 * @Employment Status  Controller Routing
 */
router.post('/employmentstatus', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employmentstatus.create));    // C
router.get('/employmentstatus', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employmentstatus.getAll));     // R
router.put('/employmentstatus/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employmentstatus.update));    // U
router.delete('/employmentstatus/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employmentstatus.remove));    // D

/**
 * @Asset  Controller Routing
 */
router.post('/asset', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Asset.create));    // C
router.get('/asset', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Asset.getAll));     // R
router.put('/asset/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Asset.update));    // U
router.delete('/asset/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Asset.remove));    // D

/**
 * @Employee  Controller Routing
 */
router.post('/employee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employee.create));    // C
router.get('/employee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employee.getAll));     // R
router.get('/employee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employee.getOne));     // R
router.get('/employeecontact', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employee.employeeContact));     // R
router.put('/employee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employee.update));    // U
router.delete('/employee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employee.remove));    // D

/**
 * @Employee Access Card Controller Routing
 */
router.post('/employeeaccesscard', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaccesscard.create));    // C
router.get('/employeeaccesscard', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaccesscard.getAll));     // R
router.get('/employeeaccesscard/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaccesscard.getOne));     // R
router.put('/employeeaccesscard/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaccesscard.update));    // U
router.delete('/employeeaccesscard/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaccesscard.remove));    // D

/**
 * @Employee Address  Controller Routing
 */
router.post('/employeeaddress', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaddress.create));    // C
router.get('/employeeaddress', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaddress.getAll));     // R
router.get('/employeeaddress/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaddress.getOne));     // R
router.put('/employeeaddress/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaddress.update));    // U
router.delete('/employeeaddress/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeaddress.remove));    // D

/**
 * @Employee Asset  Controller Routing
 */
router.post('/employeeasset', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeasset.create));    // C
router.get('/employeeasset', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeasset.getAll));     // R
router.get('/employeeasset/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, Employeeasset.getOne));     // R
router.put('/employeeasset/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeasset.update));    // U
router.delete('/employeeasset/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeasset.remove));    // D

/**
 * @Employee Attendance  Controller Routing
 */
router.post('/employeeattendance', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employeeattendance.create));    // C
router.get('/employeeattendance', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeattendance.getAll));     // R
router.get('/employeeattendance/:empid/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employeeattendance.getOne));     // R
router.get('/employeeattendance/:empid/:month/:year', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Employeeattendance.getEmpAttendanceByMonthByempId));     // R
router.get('/allemployeeattendance/:month/:year', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeattendance.getEmpAttendanceByMonth));     // R
router.get('/employeeattendance/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeattendance.whoIsIn));     // R
router.put('/employeeattendance/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeattendance.update));    // U
router.delete('/employeeattendance/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeattendance.remove));    // D

/**
 * @Employee Background  Controller Routing
 */
router.post('/employeebackground', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebackground.create));    // C
router.get('/employeebackground', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebackground.getAll)) ;    // R
router.put('/employeebackground/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebackground.update));    // U
router.delete('/employeebackground/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebackground.remove));    // D

/**
 * @Employee Bank  Controller Routing
 */
router.post('/employeebank', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebank.create));    // C
router.get('/employeebank', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebank.getAll));     // R
router.get('/employeebank/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebank.getOne));     // R
router.put('/employeebank/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebank.update));    // U
router.delete('/employeebank/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeebank.remove));    // D

/**
 * @Employee Documents  Controller Routing
 */
router.post('/employeedocuments', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeedocuments.create));    // C
router.get('/employeedocuments', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeedocuments.getAll));     // R
router.get('/employeedocuments/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeedocuments.getOne));     // R
router.put('/employeedocuments/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeedocuments.update));    // U
router.delete('/employeedocuments/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeedocuments.remove));    // D

/**
 * @Employee Family  Controller Routing
 */
router.post('/employeefamily', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeefamily.create));    // C
router.get('/employeefamily', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeefamily.getAll));     // R
router.get('/employeefamily/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeefamily.getOne));     // R
router.put('/employeefamily/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeefamily.update));    // U
router.delete('/employeefamily/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeefamily.remove));    // D

/**
 * @Employee Generated Letter  Controller Routing
 */
router.post('/employeegeneratedletter', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeegeneratedletter.create));    // C
router.get('/employeegeneratedletter', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeegeneratedletter.getAll));     // R
router.put('/employeegeneratedletter/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeegeneratedletter.update));    // U
router.delete('/employeegeneratedletter/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeegeneratedletter.remove));    // D

/**
 * @Employee Identity  Controller Routing
 */
router.post('/employeeidentity', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeidentity.create));    // C
router.get('/employeeidentity', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeidentity.getAll)) ;    // R
router.put('/employeeidentity/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeidentity.update));    // U
router.delete('/employeeidentity/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeidentity.remove));    // D

/**
 * @Employee Nominee  Controller Routing
 */
router.post('/employeenominee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeenominee.create));    // C
router.get('/employeenominee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeenominee.getAll));     // R
router.get('/employeenominee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeenominee.getOne));     // R
router.put('/employeenominee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeenominee.update));    // U
router.delete('/employeenominee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeenominee.remove));    // D

/**
 * @Employee PF  Controller Routing
 */
router.post('/employeepf', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeepf.create));    // C
router.get('/employeepf', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeepf.getAll));     // R
router.get('/employeepf/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeepf.getOne));     // R
router.put('/employeepf/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeepf.update));    // U
router.delete('/employeepf/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeepf.remove));    // D

/**
 * @Employee Position  Controller Routing
 */
router.post('/employeeposition', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeposition.create));    // C
router.get('/employeeposition', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeposition.getAll));     // R
router.get('/employeeposition/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeposition.getOne));     // R
router.put('/employeeposition/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeposition.update));    // U
router.delete('/employeeposition/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeposition.remove));    // D

/**
 * @Employee prev employment  Controller Routing
 */
router.post('/employeeprevemployment', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprevemployment.create));    // C
router.get('/employeeprevemployment', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprevemployment.getAll));     // R
router.get('/employeeprevemployment/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprevemployment.getOne)) ;    // R
router.put('/employeeprevemployment/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprevemployment.update));    // U
router.delete('/employeeprevemployment/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprevemployment.remove));    // D

/**
 * @Employee probation  Controller Routing
 */
router.post('/employeeprobation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprobation.create));    // C
router.get('/employeeprobation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprobation.getAll));     // R
router.put('/employeeprobation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprobation.update));    // U
router.delete('/employeeprobation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeprobation.remove));    // D

/**
 * @Employee qualification  Controller Routing
 */
router.post('/employeequalification', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeequalification.create));    // C
router.get('/employeequalification', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeequalification.getAll));     // R
router.get('/employeequalification/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeequalification.getOne)) ;    // R
router.put('/employeequalification/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeequalification.update));    // U
router.delete('/employeequalification/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeequalification.remove));    // D

/**
 * @Employee resignation  Controller Routing
 */
router.post('/employeeresignation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeresignation.create));    // C
router.get('/employeeresignation', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeresignation.getAll))  ;   // R
router.put('/employeeresignation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeresignation.update));    // U
router.delete('/employeeresignation/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Employeeresignation.remove));    // D

/**
 * @Weekend Policy  Controller Routing
 */
router.post('/weekendpolicies', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Weekendpolicies.create));    // C
router.get('/weekendpolicies', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Weekendpolicies.getAll))  ;   // R
router.put('/weekendpolicies/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Weekendpolicies.update));    // U
router.delete('/weekendpolicies/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Weekendpolicies.remove));    // D

/**
 * @Shift Rotation Policy  Controller Routing
 */
router.post('/shiftrotationpolicy', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shiftrotationpolicy.create));    // C
router.get('/shiftrotationpolicy', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shiftrotationpolicy.getAll));     // R
router.put('/shiftrotationpolicy/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shiftrotationpolicy.update));    // U
router.delete('/shiftrotationpolicy/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Shiftrotationpolicy.remove));    // D

/**
 * @Organization tree  Controller Routing
 */
router.post('/organizationtree', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Organizationtree.create));    // C
router.get('/organizationtree', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Organizationtree.getAll));     // R
router.get('/organizationtree/:empid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Organizationtree.getOne));    // R
router.get('/isreportingmanager/:empid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Organizationtree.isReportingManager));    // R
router.put('/organizationtree/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Organizationtree.update));    // U
router.delete('/organizationtree/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Organizationtree.remove));    // D

/**
 * @Location  Controller Routing
 */
router.post('/location', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Location.create));    // C
router.get('/location', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Location.getAll));     // R
router.put('/location/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Location.update));    // U
router.delete('/location/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Location.remove));    // D

/**
 * @Attandance Scheme  Controller Routing
 */
router.post('/attendancescheme', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Attendancescheme.create));    // C
router.get('/attendancescheme', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Attendancescheme.getAll));     // R
router.put('/attendancescheme/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Attendancescheme.update));    // U
router.delete('/attendancescheme/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Attendancescheme.remove));    // D

/**
 * @Bulletins  Controller Routing
 */
router.post('/bulletins', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bulletins.create));    // C
router.get('/bulletins', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bulletins.getAll));     // R
router.put('/bulletins/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bulletins.update));    // U
router.delete('/bulletins/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Bulletins.remove));    // Db

/**
 * @Holiday List  Controller Routing
 */
router.post('/holidaylist', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Holidaylist.create));    // C
router.get('/holidaylist', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Holidaylist.getAll));     // R
router.put('/holidaylist/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Holidaylist.update));    // U
router.delete('/holidaylist/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Holidaylist.remove));    // Db

/**
 * @HR Form  Controller Routing
 */
router.post('/hrform', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Hrform.create));    // C
router.get('/hrform', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Hrform.getAll));     // R
router.put('/hrform/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Hrform.update));    // U
router.delete('/hrform/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Hrform.remove));    // Db

/**
 * @Leave schemes  Controller Routing
 */
router.post('/leaveschemes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemes.create));    // C
router.get('/leaveschemes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemes.getAll)) ;    // R
router.put('/leaveschemes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemes.update));    // U
router.delete('/leaveschemes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemes.remove));    // D

/**
 * @Leave Application  Controller Routing
 */
router.post('/leaveapplication', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.create));    // C
router.get('/leaveapplication', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveapplication.getAll)) ;    // R
router.get('/leaveapplication/:empid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.getOne)) ;    // R
router.put('/leaveapplication/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveapplication.update));    // U
router.delete('/leaveapplication/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveapplication.remove));    // D

/**
 * @Leave_scheme_Leave_Type  Controller Routing
 */
router.post('/leaveschemeleavetypes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemeleavetypes.create));    // C
router.get('/leaveschemeleavetypes', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemeleavetypes.getAll)) ;    // R
router.get('/leaveschemeleavetypes/:leaveschemeid/:periodicity', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemeleavetypes.getOne)) ;    // R
router.put('/leaveschemeleavetypes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemeleavetypes.update));    // U
router.delete('/leaveschemeleavetypes/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Leaveschemeleavetypes.remove));    // D

/**
 * @Leave Grant  Controller Routing
 */

router.post('/leavegrant', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, LeaveGrant.create));    // C
router.get('/leavegrant', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, LeaveGrant.getAll)) ;    // R
router.delete('/leavegrant/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, LeaveGrant.remove));    // D
router.get('/period', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, LeaveGrant.period)) ;    // R

/**
 * @Track Leave   and Withdraw
 * @ Self leave track  where id is leave application id
 * @rm reporting manager id
 */
router.get('/trackLeave/:empid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.trackLeave));     // R
router.put('/leavewithdraw/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.leaveWithdraw));     // R
router.put('/cancelleave/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.cancelLeave)) ;    // R
router.put('/rmcancelleave/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.RmcancelLeave)) ;    // R
router.get('/reviewleave/:rmid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.reviewLeave));     // R
router.put('/leaveaccept/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.LeaveAccept));     // R

/**
 * @Leave Calender
 * @
 */
router.get('/leavecalender/:month/:year', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.leaveCalender));     // R
router.get('/leavecalender/:empid/:month/:year', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.leaveCalenderByRm));     // R
router.get('/leavecalender/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Leaveapplication.leaveCalenderDatewise));     // R

/**
 * @Employee Leave
 * @
 */
router.get('/employeeleave/:empid/:leavetype', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeLeave.getOne)) ;    // R
router.post('/employeeleavedays', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeLeave.employeeLeaveDays)) ;    // R
router.get('/employeeleave/:empid/', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeLeave.leaveDeatails));     // R

/**
 * @Attendance Regularization Controller Routing
 */
router.post('/attendanceregularization', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.create));    // C
router.get('/attendanceregularization', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.getAll))   ;  // R
router.get('/attendanceregularization/:empid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.getOne)) ;    // R
router.get('/reviewattendanceregularization/:rmempid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.getReview)) ;    // R
router.put('/attendanceregularization/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.update));    // U
router.delete('/attendanceregularization/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, AttendanceRegularization.remove));    // D


/**
 * @Policy & Guidelines Controller Routing
 */
router.post('/policyguidelines', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, PolicyGuidelines.create));    // C
router.get('/policyguidelines', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, PolicyGuidelines.getAll));    // R
router.delete('/policyguidelines/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, PolicyGuidelines.remove));    // D


/**
 * @EmployeeGpsTracking Controller Routing
 */
router.post('/employeegpstracking', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeGpsTracking.create));    // C
router.get('/employeegpstracking', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeGpsTracking.getAll));    // R
router.get('/employeegpstracking/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeGpsTracking.getOne));    // R
router.get('/employeegpstracking/:id/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeGpsTracking.getByDate));    // R
router.get('/employeegpstrackingbyrm/:rmid/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeGpsTracking.getByReporingM));    // R
router.delete('/employeegpstracking/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, EmployeeGpsTracking.remove));    // D


/**
 * @Import Excel File System Routing
 */
router.post('/import', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ImportExcel.create)) ;    // R

/**
 * @Recruitment System Routing
 */
/**
 * @JobOpening Routing
 */
router.post('/jobopening', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobOpening.create));    // C
router.get('/jobopening', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobOpening.getAll)) ;    // R
router.put('/jobopening/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobOpening.update));    // U
router.delete('/jobopening/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobOpening.remove));    // D

/**
 * @Consultant Routing
 */
router.post('/consultants', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Consultant.create));    // C
router.get('/consultants', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Consultant.getAll)) ;    // R
router.put('/consultants/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Consultant.update));    // U
router.delete('/consultants/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Consultant.remove));    // D

/**
 * @JobPublish Routing
 */
router.post('/jobpublish', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobPublish.create));    // C
router.get('/jobpublish', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobPublish.getAll)) ;    // R
router.put('/jobpublish/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobPublish.update));    // U
router.delete('/jobpublish/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobPublish.remove));    // D
router.get('/sendemail', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, JobPublish.sendEmails)) ;    // R

/**
 * @Candidateprofile Routing
 */
router.post('/candidateprofile', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, RecruitmentProfile.create));    // C
router.get('/candidateprofile', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, RecruitmentProfile.getAll)) ;    // R
router.get('/candidateprofile/:jobid', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, RecruitmentProfile.getByJobId)) ;    // R
router.put('/candidateprofile/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, RecruitmentProfile.update)) ;    // R
router.delete('/candidateprofile/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, RecruitmentProfile.remove));    // D


/**
 * @Profile shared for review Routing
 */
router.post('/profileforreview', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ProfileReview.create));    // C
router.get('/profileforreview', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, ProfileReview.getAll)) ;    // R
router.put('/profileforreview/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, ProfileReview.update)) ;    // U
router.delete('/profileforreview/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, ProfileReview.remove));    // D


/**
 * @Interview  Routing
 */
router.post('/interview', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, Interview.create));    // C
router.get('/interview', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Interview.getAll)) ;    // R
router.get('/interview/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Interview.getBymanagerId)) ;    // R
router.put('/interview/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Interview.update)) ;    // U
router.delete('/interview/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Interview.remove));    // D

/**
 * @InterviewRating  Routing
 */
router.post('/interviewrating', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, InterviewRating.create));    // C
router.get('/interviewrating', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, InterviewRating.getAll)) ;    // R
router.get('/interviewrating/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, InterviewRating.getOne)) ;    // R
router.put('/interviewrating/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, InterviewRating.update)) ;    // U
router.delete('/interviewrating/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, InterviewRating.remove));    // D

/**
 * @Training Module Start
 * /

 /**
 * @Training_course Routing
 */
router.post('/trainingcourse', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingCourse.create));    // C
router.get('/trainingcourse', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingCourse.getAll)) ;    // R
router.put('/trainingcourse/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingCourse.update)) ;    // U
router.delete('/trainingcourse/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingCourse.remove));    // D

/**
 * @Training_course_Topic Routing
 */
router.post('/coursetopic', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, CourseTopic.create));    // C
router.get('/coursetopic', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, CourseTopic.getAll)) ;    // R
router.get('/coursetopic/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, CourseTopic.getOne)) ;    // R
router.put('/coursetopic/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, CourseTopic.update)) ;    // U
router.delete('/coursetopic/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, CourseTopic.remove));    // D

/**
 * @Training_vendor Routing
 */
router.post('/trainingvendor', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, TrainingVendor.create));    // C
router.get('/trainingvendor', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.getAll)) ;    // R
router.get('/trainingvendor/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.getOne)) ;    // R
router.put('/trainingvendor/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.update)) ;    // U
router.delete('/trainingvendor/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.remove));    // D
router.delete('/vendorexpertise/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.removeExpertise));    // D
router.post('/vendorexpertise', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.createExpertise));    // D
router.get('/vendorexpertise/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingVendor.getOneVendorExpertise)) ;    // R


/**
 * @Vendor_Personnel Routing
 */
router.post('/vendorpersonnel', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin,VendorPersonnel.create));    // C
router.get('/vendorpersonnel', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, VendorPersonnel.getAll)) ;    // R
router.get('/vendorpersonnel/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, VendorPersonnel.getOne)) ;    // R
router.put('/vendorpersonnel/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, VendorPersonnel.update)) ;    // U
router.delete('/vendorpersonnel/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, VendorPersonnel.remove));    // D

/**
 * @Training Routing
 */
router.post('/training', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin,Training.create));    // C
router.get('/training', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Training.getAll)) ;    // R
router.get('/training/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Training.getOne)) ;    // R
router.get('/trainingbyparticipant/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Training.getByParticipants)) ;    // R
router.put('/training/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Training.update)) ;    // U
router.delete('/training/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Training.remove));    // D

/**
 * @TrainingMaterial Routing
 */
router.post('/trainingmaterial', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin,TrainingMaterial.create));    // C
router.get('/trainingmaterial', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingMaterial.getAll)) ;    // R
router.get('/trainingmaterial/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingMaterial.getOne)) ;    // R
router.delete('/trainingmaterial/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingMaterial.remove));    // D

/**
 * @participants Routing
 */
router.post('/participants', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest,Participants.create));    // C
router.get('/participants', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Participants.getAll)) ;    // R
router.get('/participants/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Participants.getOne)) ;    // R
router.put('/participants/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Participants.update)) ;    // R
router.delete('/participants/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, Participants.remove));    // D

/**
 * @TrainingFeedback Routing
 */
router.post('/trainingfeedback', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest,TrainingFeedback.create));    // C
router.get('/trainingfeedback', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingFeedback.getAll)) ;    // R
router.get('/trainingfeedback/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingFeedback.getOne)) ;    // R
router.put('/trainingfeedback/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, TrainingFeedback.update)) ;    // R
router.delete('/trainingfeedback/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, TrainingFeedback.remove));    // D

/**
 * @Employee-Task  Controller Routing
 */
router.post('/employeetask', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeTask.create));    // C
router.get('/employeetask', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeTask.getAll));     // R
router.get('/employeetask/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeTask.getOne));    // R
router.put('/employeetask/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeTask.update));    // U
router.delete('/employeetask/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, EmployeeTask.remove));    // D


/**
 * @Construction-Site  Controller Routing
 */
router.post('/constructionsite', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSite.create));    // C
router.get('/constructionsite', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSite.getAll));     // R
router.put('/constructionsite/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSite.update));    // U
router.delete('/constructionsite/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSite.remove));    // D


/**
 * @Construction-Site-Employee  Controller Routing
 */
router.post('/constructionsiteemployee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSiteEmployee.create));    // C
router.get('/constructionsiteemployee', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSiteEmployee.getAll));     // R
router.get('/constructionsiteemployee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSiteEmployee.getOne));     // R
router.put('/constructionsiteemployee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSiteEmployee.update));    // U
router.delete('/constructionsiteemployee/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, ConstructionSiteEmployee.remove));    // D


module.exports = router;
