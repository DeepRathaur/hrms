const Joi                       =   require('joi');
const { Employee_document }     = require('../models');
const { to, ReE, ReS }          = require('../services/util.service');
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
    }).single('doc_file');

    upload(req, res, function (err) {
        
        if (err) {
            return ReE(res, 'Error on file uploading.');
        }
        let empId = req.body.employee_id;
        var filedata = req.file;
        let data  =  {employee_id:empId,name:req.body.name,category:req.body.category,description:req.body.description,doc_file:filedata.path.replace(/^../, '')}
        
        Employee_document.create(data).then(employeedocuments => {
            try {
                let empdocuments_json = employeedocuments.toWeb();
                return ReS(res, {empdocuments_json}, 201);
            } catch (e) {
                console.log(e);
                ReE(res, 'Error on file uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });
    });
};

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeedocuments

    [err, employeedocuments] = await to(Employee_document.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeedocuments_json = []

    for (let i in employeedocuments) {
        let details = employeedocuments[i];
        let info = details.toWeb();
        employeedocuments_json.push(info);
    }
    return ReS(res, { employeedocuments: employeedocuments_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeedocuments
    let id = parseInt(req.params.id);
    [err, employeedocuments] = await to(Employee_document.findAll({
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeedocuments) {
        let details = employeedocuments[i];
        var image_uri = PARAMS.baseurl + employeedocuments[i].doc_file.replace(/\\/g, "/").replace("/public", "");
        
        details.doc_file    =   image_uri;
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeedocuments: employee_json });
};

module.exports.getOne = getOne;


const update = async function (req, res) {
    let err, employeedocumentss, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeedocumentss] = await to(Employee_document.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeedocuments is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeedocuments : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeedocumentss, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeedocumentss] = await to(Employee_document.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeedocuments');

    return ReS(res, { message: 'Deleted employeedocuments' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        name: Joi.optional(),
        category: Joi.optional(),
        description: Joi.optional(),
        doc_file: Joi.optional()
    };
    return Joi.validate(req, schema);
}