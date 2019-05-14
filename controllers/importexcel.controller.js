'use strict';
const excelToJson = require('convert-excel-to-json');
const {Shift, Employee_attendance, Employee} = require('../models');
const Joi = require('joi');
const {to, ReE, ReS} = require('../services/util.service');
const PARAMS = require('../config/globalparams');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const create = async function (req, res) {
    let err, shifttiming;
    [err, shifttiming] = await to(getShiftTiming(1));

    if (err) return ReE(res, err, 422);
    if (!shifttiming) return ReE(res, 'Shift not found.');

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {

            let dir1 = 'public/files/attendance-documents';
            if (!fs.existsSync(dir1)) {
                fs.mkdirSync(dir1);
            }
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            let pre = req.body.month + '_' + req.body.year;
            let filename = pre + '_' + Date.now() + path.extname(file.originalname);
            callback(null, filename)
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname).toLowerCase();
            /* if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif') {
                ReE(res, 'Only images are allowed.');
            }
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                ReE(res, 'Only jpg,png,gif images are allowed.');
            } */
            callback(null, true)
        }
    }).single('file');

    let attendancearray = [];
    upload(req, res, function (err) {
        const body = req.body;
        if (body.month == '') {
            return ReE(res, 'Month is mandatory.');
        } else if(body.year == ''){
            return ReE(res, 'Year is mandatory.');
        }
        console.log(body);
        if (err) {
            return ReE(res, 'Error on file uploading.');
        }
        let filedata = req.file;
        let filepath = filedata.path.replace(/^/, '')
        let result = excelToJson({
            sourceFile: filepath,
            columnToKey: {
                A: 'employee_id',
                B: 'employeeName',
                C: '1',
                D: '2',
                E: '3',
                F: '4',
                G: '5',
                H: '6',
                I: '7',
                J: '8',
                K: '9',
                L: '10',
                M: '11',
                N: '12',
                O: '13',
                P: '14',
                Q: '15',
                R: '16',
                S: '17',
                T: '18',
                U: '19',
                V: '20',
                W: '21',
                X: '22',
                Y: '23',
                Z: '24',
                AA: '25',
                AB: '26',
                AC: '27',
                AD: '28',
                AE: '29',
                AF: '30',
                AG: '31',
                AH: '32',
            },
            header: {
                rows: 1
            },
            sheets: ['Sheet1']
        });

        let filearray = [];

        for (let {employee_id: id, employeeName: name, ...rest} of result.Sheet1) {
            let data = {employee_id: id, employee_name: name, rest: rest};
            let d = Object.keys(rest);
            for (let i = 0; i < d.length; i++) {
                let string = rest[i + 1];
                let currentdate = body.year + '-' + body.month + '-' + d[i];
                if (string != undefined) {
                    let strValue = string.split("\r\n");
                    let inTime = strValue[0];
                    let outTime = strValue[1];
                    if (inTime != 'WO-I' && inTime != 'A') {
                        let punchIn = currentdate + ' ' + inTime + ':00';
                        let punchOut = currentdate + ' ' + outTime + ':00';
                        var date1 = new Date(currentdate + " " + shifttiming.start_time).getTime();
                        var date2 = new Date(currentdate + " " + inTime).getTime();
                        var msec = date2 - date1;
                        var mins = Math.floor(msec / 60000);

                        var date1_nex = new Date(currentdate + " " + shifttiming.end_time).getTime();
                        var date2_nex = new Date(currentdate + " " + outTime).getTime();
                        var msec_nex = date2_nex - date1_nex;
                        var mins_nex = Math.floor(msec_nex / 60000);
                        let late, overtime, earlyleaving;
                        if (mins > 0) {
                            late = mins;
                        } else {
                            late = 0;
                        }
                        if (mins_nex > 0) {
                            overtime = mins_nex;
                            earlyleaving = 0;
                        } else {
                            overtime = 0;
                            earlyleaving = mins_nex;
                        }
                        let emp_attendance_data = {
                            employee_id: id, shift_id: 1, swipe_date: currentdate, punch_in: punchIn
                            , punch_out: punchOut, late: late, early_leaving: earlyleaving, overtime: overtime
                        };
                        attendancearray.push(emp_attendance_data);
                    }
                }
            }
            filearray.push(data);
        }
        if (attendancearray.length > 0) {
            for (let i = 0; i < attendancearray.length; i++) {
                let imempId = attendancearray[i].employee_id;
                let swipeDate = attendancearray[i].swipe_date;
                upsert(attendancearray[i], {employee_id: imempId, swipe_date: swipeDate}).then(function (result) {
                    try {
                        if (result == false) {
                            console.log('Employee not exist');
                        }
                        //return ReS(res, {message: 'Successfully imported excel file of employee attendance.'}, 201);
                    } catch (e) {
                        console.log(e);
                        ReE(res, 'Error on uploading data.');
                    }
                });

                //
                // Employee_attendance.destroy({
                //     where: {
                //         employee_id:imempId,
                //         swipe_date:swipeDate
                //     }
                // });
            }

            return ReS(res, {message: 'Successfully imported excel file of employee attendance.'}, 201);
            // Employee_attendance.bulkCreate(attendancearray,{
            //     updateOnDuplicate: [`employee_id`,`shift_id`,`swipe_date`,`punch_in`,`punch_out`,`late`,`early_leaving`,`overtime`],
            //     //ignoreDuplicates: true,
            // }).then(employeeattendance => {
            //     try {
            //         return ReS(res, { message: 'Successfully imported excel file of employee attendance.'}, 201);
            //     } catch (e) {
            //         console.log(e);
            //         ReE(res, 'Error on uploading data.');
            //     }
            // }, (err) => {
            //     ReE(res, err, 422);
            // });
        } else {
            ReE(res, 'File is empty.');
        }
    });
};
module.exports.create = create;

const getShiftTiming = async (req, res) => {
    let err, shift;
    [err, shift] = await to(Shift.findOne({
        where: {
            id: req
        }
    }));
    if (err) return ReE(res, err, 422);

    let data = {id: shift.id, start_time: shift.start_time, end_time: shift.end_time};

    return data;
};

function upsert(values, condition) {
    return Employee_attendance
        .findOne({where: condition})
        .then(function (obj) {
            if (obj) { // update
                return obj.update(values);
            }
            else { // insert
                return Employee_attendance.create(values);
            }
        })
}

function checkEmployeeExist(req,res) {

    return Employee.findOne({
        where: {
            id:req,
            status:true
        }
    }).then( res =>{
        console.log('asd');
        console.log(res);
      if (!res){
          return false;
      }  else {
          return true;
      }
    });
};