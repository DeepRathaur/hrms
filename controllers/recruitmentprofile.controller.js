const Joi   =   require('joi');
const { recruitment_profile,job_opening,consultant } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const PARAMS                    = require('../config/globalparams');
const multer                    = require('multer');
const path                      = require('path');
const fs                        = require('fs');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            let dir1     =   '../public/files/recruitment-profiles' ;
            if (!fs.existsSync(dir1)){
                fs.mkdirSync(dir1);
            }
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            let name = req.body.name;
            let filename = name + '-' + Date.now() + path.extname(file.originalname);
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
    }).single('resume');

    upload(req, res, function (err) {
        let name = req.body.name;
        var filedata = req.file;
        if (err) {
            return ReE(res, 'Error on resume uploading.');
        }

        let data  =  {job_id:req.body.job_id,consultant_id:req.body.consultant_id,name:name,current_company:req.body.current_company
            ,total_experience:req.body.total_experience,current_salary:req.body.current_salary,expected_salary:req.body.expected_salary,
            contact:req.body.contact,email:req.body.email,is_hired:req.body.is_hired,comments:req.body.comments,
            resume:filedata.path.replace(/^../, '')};

        recruitment_profile.create(data).then(recruitmentprofile => {
            try {
                let recruitmentprofile_json = recruitmentprofile.toWeb();
                return ReS(res, {recruitmentprofile_json}, 201);
            } catch (e) {
                ReE(res, 'Error on resume uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });
    });
};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, recruitmentprofile;

    [err, recruitmentprofile] = await to(recruitment_profile.findAll({
         order: [['name', 'ASC']],
        include:[{model:consultant},{model:job_opening}]
    }));

    if (err) return ReE(res, err, 422);

    let recruitmentprofile_json = [];

    for (let i in recruitmentprofile) {
        let details = recruitmentprofile[i];
        var image_uri = PARAMS.baseurl + recruitmentprofile[i].resume.replace(/\\/g, "/").replace("public", "");
        details.resume    =   image_uri;
        let info = details.toWeb();
        recruitmentprofile_json.push(info);
    }
    return ReS(res, { recruitmentprofile: recruitmentprofile_json });
};

module.exports.getAll = getAll;

const getByJobId = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, recruitmentprofile;
    let jobid = parseInt(req.params.jobid);

    [err, recruitmentprofile] = await to(recruitment_profile.findAll({
        where: {
            job_id: jobid
        },
        include:[{model:consultant},{model:job_opening}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in recruitmentprofile) {
        let details = recruitmentprofile[i];
        var image_uri = PARAMS.baseurl + recruitmentprofile[i].resume.replace(/\\/g, "/").replace("public", "");
        details.resume    =   image_uri;
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { recruitmentprofile: employee_json });
};

module.exports.getByJobId = getByJobId;


const remove = async function (req, res) {
    let recruitmentprofiles, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, recruitmentprofiles] = await to(recruitment_profile.destroy({
        where: { id: id }
    }));
    //console.log(err);
    if (err) return ReE(res, 'error occured trying to delete recruitment profile');
    return ReS(res, { message: 'Deleted recruitment profile' }, 204);
};
module.exports.remove = remove;


const update = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            let dir1     =   '../public/files/recruitment-profiles' ;
            if (!fs.existsSync(dir1)){
                fs.mkdirSync(dir1);
            }
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            let name = req.body.name;
            let filename = name + '-' + Date.now() + path.extname(file.originalname);
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
    }).single('resume');

    upload(req, res, function (err) {
        console.log(req.body);
        let name = req.body.name;
        let id = req.params.id
        var filedata = req.file;
        console.log(filedata);
        if (err) {
            return ReE(res, 'Error on resume uploading.');
        }

        let data  =  {job_id:req.body.job_id,consultant_id:req.body.consultant_id,name:name,current_company:req.body.current_company
            ,total_experience:req.body.total_experience,current_salary:req.body.current_salary,expected_salary:req.body.expected_salary,
            contact:req.body.contact,email:req.body.email,is_hired:req.body.is_hired,comments:req.body.comments,
            resume:filedata.path.replace(/^../, '')};

        recruitment_profile.update(data, {
            where: {id: id}
        }).then(recruitmentprofile => {
            try {
                let recruitmentprofile_json = recruitmentprofile.toWeb();
                return ReS(res, {recruitmentprofile_json}, 201);
            } catch (e) {
                ReE(res, 'Error on resume uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });
    });
};

module.exports.update = update;


function validate(req) {
    const schema = {
        job_id: Joi.number().integer().required(),
        consultant_id: Joi.number().integer().required(),
        name: Joi.optional(),
        current_company: Joi.optional(),
        total_experience: Joi.optional(),
        current_salary: Joi.optional(),
        expected_salary: Joi.optional(),
        email: Joi.optional(),
        resume: Joi.optional(),
        is_hired: Joi.optional(),
        comments: Joi.optional(),
    };

    return Joi.validate(req, schema);
}
