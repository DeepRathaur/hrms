const Joi                       =   require('joi');
const { policy_guideline }     = require('../models');
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
            let dir1     =   '../public/files/documents' ;
            if (!fs.existsSync(dir1)){
                fs.mkdirSync(dir1);
            }
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            let filename = Date.now()+'_' + file.originalname;
            callback(null, filename)
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            //let ext = path.extname(file.originalname).toLowerCase();
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
        let filedata = req.file;
        let data  =  {name:req.body.name,description:req.body.description,attachment:filedata.path};
        policy_guideline.create(data).then(documents => {
            try {
                let documents_json = documents.toWeb();
                return ReS(res, {documents_json}, 201);
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
    let err, policyguideline;
    [err, policyguideline] = await to(policy_guideline.findAll({
        where:{
            status:true
        }
    }));
    if (err) return ReE(res, err, 422);
    let documents_json = [];
    for (let i in policyguideline) {
        let details = policyguideline[i];
        let image_uri = PARAMS.baseurl +'/'+ policyguideline[i].attachment.replace(/\\/g, "/");
        details.attachment    =   image_uri.replace("/public", "");
        let info = details.toWeb();
        documents_json.push(info);
    }
    return ReS(res, { documents: documents_json });
};
module.exports.getAll = getAll;

const remove = async function (req, res) {
    let policyguideline, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, policyguideline] = await to(policy_guideline.destroy({
        where: { id: id }
    }));
    if (err) return ReE(res, 'error occured trying to delete policy_guideline');
    return ReS(res, { message: 'Deleted policy_guideline' }, 204);
};
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        description: Joi.optional(),
        file: Joi.optional()
    };
    return Joi.validate(req, schema);
}