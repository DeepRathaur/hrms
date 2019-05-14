const Joi   =   require('joi');
const { training_vendor, vendor_expertise, training_course }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingvendor;
    let body    =   req.body;
    let expertise   =   body.training_expertise;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, trainingvendor]       =   await to(training_vendor.create(body));

    if(err) return ReE(res,err, 422);

    if (expertise.length>0) {
        let err,  expertisedata;
        for(let i = 0; i<expertise.length ;i++) {
            let data = {training_vendor_id:trainingvendor.id,training_course_id:expertise[i]} ;
                [err, expertisedata]       =   await to(vendor_expertise.create(data));
                if(err) return ReE(res,err, 422);
        }
    }
    return ReS(res,{message: 'Successfully created new Training Vendor .', trainingvendor: trainingvendor.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        contact_name: Joi.optional(),
        contact_number: Joi.optional(),
        address: Joi.optional(),
        remarks:Joi.optional(),
        training_expertise:Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingvendor;

    [err, trainingvendor]     =   await to (training_vendor.findAll({
        order:[['createdAt','DESC']],
        include: [{model:vendor_expertise , include:{model:training_course}}]
    }));

    if (err)    return ReE(res, err, 422);

    let trainingvendor_json = [];
    for (let i in trainingvendor) {
        let details =   trainingvendor[i];
        let info    =   details.toWeb();
        trainingvendor_json.push(info);
    }
    return ReS(res, {trainingvendors:trainingvendor_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, trainingvendor, data;
    let trainingvendor_id = req.params.id;
    data = req.body;
    [err, trainingvendor] = await to(training_vendor.update(data, {
        where: {id: trainingvendor_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The training_vendor is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated training_vendor '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let trainingvendor, err ;
    let trainingvendor_id = req.params.id;
    data    =   req.body;
    [err, trainingvendor] = await to(training_vendor.destroy({
        where: {id:trainingvendor_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete trainingvendor');

    return ReS(res, {message:'Deleted trainingvendor'}, 204);
};

module.exports.remove   =   remove;


const createExpertise    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingvendorexpertise;
    let body = req.body;
    let expertise   =   body.training_expertise;
    if (expertise.length>0) {
        for(let i = 0; i<expertise.length ;i++) {
            let data = {training_vendor_id:body.training_vendor_id,training_course_id:expertise[i]} ;
            [err, trainingvendorexpertise] = await to(vendor_expertise.create(data));
            if (err) return ReE(res, err, 422);
        }
        return ReS(res,{message: 'Successfully created new Training Vendor Expertise.'}, 201);
    }
};
module.exports.createExpertise  =   createExpertise;

const removeExpertise        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let trainingvendor, err ;
    let vendor_expertise_id = req.params.id;
    data    =   req.body;
    [err, trainingvendor] = await to(vendor_expertise.destroy({
        where: {id:vendor_expertise_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete vendor_expertise_id');

    return ReS(res, {message:'Deleted vendor_expertise_id'}, 204);
};

module.exports.removeExpertise   =   removeExpertise;


const getOneVendorExpertise    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let vendorId = req.params.id;
    let err, trainingvendor;

    [err, trainingvendor]     =   await to (vendor_expertise.findAll({
        order:[['createdAt','DESC']],
        where : {
            training_vendor_id : vendorId
        },
        include:[{model:training_course}]
    }));

    if (err)    return ReE(res, err, 422);

    let trainingvendor_json = [];
    for (let i in trainingvendor) {
        let details =   trainingvendor[i];
        let info    =   details.toWeb();
        trainingvendor_json.push(info);
    }
    return ReS(res, {trainingvendors:trainingvendor_json});
};
module.exports.getOneVendorExpertise   =   getOneVendorExpertise;
