const Joi   =   require('joi');
const { consultant }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');
const PARAMS                    = require('../config/globalparams');
const multer                    = require('multer');
const path                      = require('path');
const fs                        = require('fs');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            let dir1     =   'public/files/consultant-files' ;
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

        let data  =  {email:req.body.email,mobile_no:req.body.mobile_no,name:name,address_line1:req.body.address_line1
            ,address_line2:req.body.address_line2,city:req.body.city,state:req.body.state,pin_code:req.body.pin_code,
            term_condition:filedata.path.replace(/^/, '')};

        consultant.create(data).then(consultantp => {
            try {
                let consultantprofile_json = consultantp.toWeb();
                return ReS(res, {consultantprofile_json}, 201);
            } catch (e) {
                console.log(e);
                ReE(res, 'Error on consultant uploading.');
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
    let err, consultantdata;

    [err, consultantdata]     =   await to (consultant.findAll({
        order:[['name','ASC']]
    }));

    if (err)    return ReE(res, err, 422);

    let consultantdata_json = [];
    for (let i in consultantdata) {
        let details =   consultantdata[i];

        if (details.term_condition == null ){

            details.term_condition = null;
        } else {
            var file_uri = PARAMS.baseurl + details.term_condition.replace(/\\/g, "/").replace("public", "");
            details.term_condition    =   file_uri;
        }

        let info    =   details.toWeb();
        consultantdata_json.push(info);
    }
    return ReS(res, {consultant:consultantdata_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, consultantdata, data;
    let consultantdata_id = req.params.id;
    data = req.body;
    [err, consultantdata] = await to(consultant.update(data, {
        where: {id: consultantdata_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of consultantdata is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated consultantdata : '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let consultantdata, err ;
    let consultantdata_id = req.params.id;
    data    =   req.body;
    [err, consultantdata] = await to(consultant.destroy({
        where: {id:consultantdata_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete consultantdata');

    return ReS(res, {message:'Deleted consultantdata'}, 204);
};

module.exports.remove   =   remove;

