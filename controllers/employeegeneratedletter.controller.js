const Joi   =   require('joi');
const { employee_generated_letter } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const PARAMS                    = require('../config/globalparams');
const multer                    = require('multer');
const path                      = require('path');
const fs                        = require('fs');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {

            let dir1     =   '../public/files/employee-documents' ;
            let dir2     =   '../public/files/employee-documents/'+req.body.employee_id ;
            if (!fs.existsSync(dir1)){
                fs.mkdirSync(dir1);
            }
            if (!fs.existsSync(dir2)){
                fs.mkdirSync(dir2);
            }
            callback(null, dir2)
        },
        filename: function (req, file, callback) {
            let empid = req.body.employee_id;
            let filename = empid + '-' + Date.now() + path.extname(file.originalname);
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

    upload(req, res, function (err) {
        if (err) {
            return ReE(res, 'Error on file uploading.');
        }
        let empId = req.body.employee_id;
        var filedata = req.file;
        let data  =  {employee_id:empId,letter_template:req.body.letter_template,serial_no:req.body.serial_no,remarks:req.body.remarks,
            file_path:filedata.path.replace(/^../, ''),letter_generated_on:req.body.letter_generated_on,authorized_signatory:req.body.authorized_signatory}

        employee_generated_letter.create(data).then(employeegeneratedletter => {
            try {
                let empdocuments_json = employeegeneratedletter.toWeb();
                return ReS(res, {empdocuments_json}, 201);
            } catch (e) {
                console.log(e);
                ReE(res, 'Error on file uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });
    });

    // const { error } = validate(body);
    //
    // if (error) return ReE(res, error.details[0].message);
    //
    // let err, employeegeneratedletter;
    //
    // [err, employeegeneratedletter] = await to(employee_generated_letter.create(body));
    //
    // if (err) return ReE(res, err, 422);
    //
    // return ReS(res, { message: 'Successfully created new employeegeneratedletter.', employeegeneratedletter: employeegeneratedletter.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeegeneratedletter

    [err, employeegeneratedletter] = await to(employee_generated_letter.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeegeneratedletter_json = []

    for (let i in employeegeneratedletter) {
        let details = employeegeneratedletter[i];
        let info = details.toWeb();
        employeegeneratedletter_json.push(info);
    }
    return ReS(res, { employeegeneratedletter: employeegeneratedletter_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employeegeneratedletters, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeegeneratedletters] = await to(employee_generated_letter.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeegeneratedletter is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeegeneratedletter : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeegeneratedletters, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeegeneratedletters] = await to(employee_generated_letter.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeegeneratedletter');

    return ReS(res, { message: 'Deleted employeegeneratedletter' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        letter_template: Joi.optional(),
        serial_no: Joi.optional(),
        remarks: Joi.optional(),
        file_path: Joi.optional(),
        letter_generated_on: Joi.optional(),
        authorized_signatory: Joi.number().integer()
    };
 
    return Joi.validate(req, schema);
}