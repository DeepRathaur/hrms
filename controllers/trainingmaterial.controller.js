const Joi   =   require('joi');
const { training_material, training }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');
const PARAMS                    = require('../config/globalparams');
const multer                    = require('multer');
const path                      = require('path');
const fs                        = require('fs');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            let dir1     =   'public/files/training-materials' ;
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
    }).single('file');

    upload(req, res, function (err) {
        //console.log(req.body);
        if (err) {
            return ReE(res, 'Error on resume uploading.');
        }
        let name = req.body.name;
        var filedata = req.file;

        let data  =  {name:name,training_id:req.body.training_id,attachment:filedata.path.replace(/^/, '')};

        training_material.create(data).then(trainingMaterials => {
            try {
                let trainingMaterials_json = trainingMaterials.toWeb();
                return ReS(res, {trainingMaterials_json}, 201);
            } catch (e) {
                console.log(e);
                ReE(res, 'Error on training Materials uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });
    });
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        mobile_no: Joi.optional(),
        email:Joi.optional() ,
        address_line1:Joi.optional() ,
        address_line2: Joi.optional(),
        city:Joi.optional(),
        state: Joi.optional(),
        pin_code: Joi.optional(),
        term_condition: Joi.optional(),
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingmaterial;

    [err, trainingmaterial]     =   await to (training_material.findAll({
        order:[['name','ASC']],
        include:[{model:training}]
    }));

    if (err)    return ReE(res, err, 422);

    let trainingmaterial_json = [];
    for (let i in trainingmaterial) {
        let details =   trainingmaterial[i];
        if (details.attachment == null ){
            details.attachment = null;
        } else {
            var file_uri = PARAMS.baseurl + details.attachment.replace(/\\/g, "/").replace("public", "");
            details.attachment    =   file_uri;
        }
        let info    =   details.toWeb();
        trainingmaterial_json.push(info);
    }
    return ReS(res, {trainingmaterials:trainingmaterial_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingmaterial;
    let training_id = req.params.id;
    [err, trainingmaterial]     =   await to (training_material.findAll({
        order:[['name','ASC']],
        include:[{model:training}],
        where:{
            training_id:training_id
        }
    }));

    if (err)    return ReE(res, err, 422);

    let trainingmaterial_json = [];
    for (let i in trainingmaterial) {
        let details =   trainingmaterial[i];
        if (details.attachment == null ){
            details.attachment = null;
        } else {
            var file_uri = PARAMS.baseurl + details.attachment.replace(/\\/g, "/").replace("public", "");
            details.attachment    =   file_uri;
        }
        let info    =   details.toWeb();
        trainingmaterial_json.push(info);
    }
    return ReS(res, {trainingmaterials:trainingmaterial_json});
};
module.exports.getOne   =   getOne;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let trainingmaterial, err ;
    let trainingmaterial_id = req.params.id;
    data    =   req.body;
    [err, trainingmaterial] = await to(training_material.destroy({
        where: {id:trainingmaterial_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete trainingmaterial');

    return ReS(res, {message:'Deleted trainingmaterial'}, 204);
};

module.exports.remove   =   remove;