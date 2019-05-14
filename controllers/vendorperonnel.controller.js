const Joi   =   require('joi');
const { vendor_personnel, training_vendor, Designation }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, vendorpersonnel;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, vendorpersonnel]       =   await to(vendor_personnel.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new Vendor Personnel .', vendorpersonnel: vendorpersonnel.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        vendor_id: Joi.optional(),
        name: Joi.optional() ,
        employee_id: Joi.optional(),
        designation_id: Joi.optional(),
        expertise: Joi.optional(),
        contact_no: Joi.optional(),
        address:Joi.optional() ,
        remarks: Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, vendorpersonnel;

    [err, vendorpersonnel]     =   await to (vendor_personnel.findAll({
        order:[['createdAt','DESC']],
        include: [{model:training_vendor }, {model:Designation }]
    }));

    if (err)    return ReE(res, err, 422);

    let vendorpersonnel_json = [];
    for (let i in vendorpersonnel) {
        let details =   vendorpersonnel[i];
        let info    =   details.toWeb();
        vendorpersonnel_json.push(info);
    }
    return ReS(res, {vendorpersonnels:vendorpersonnel_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, vendorpersonnel;
    let vendorid = req.params.id;
    [err, vendorpersonnel]     =   await to (vendor_personnel.findAll({
        where :{
            vendor_id:vendorid
        },
        order:[['createdAt','DESC']],
        include: [{model:training_vendor }]
    }));

    if (err)    return ReE(res, err, 422);

    let vendorpersonnel_json = [];
    for (let i in vendorpersonnel) {
        let details =   vendorpersonnel[i];
        let info    =   details.toWeb();
        vendorpersonnel_json.push(info);
    }
    return ReS(res, {vendorpersonnels:vendorpersonnel_json});
};
module.exports.getOne   =   getOne;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, vendorpersonnel, data;
    let vendorpersonnel_id = req.params.id;
    data = req.body;
    [err, vendorpersonnel] = await to(vendor_personnel.update(data, {
        where: {id: vendorpersonnel_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The vendor_personnel is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated vendor_personnel : '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let vendorpersonnel, err ;
    let vendorpersonnel_id = req.params.id;
    data    =   req.body;
    [err, vendorpersonnel] = await to(vendor_personnel.destroy({
        where: {id:vendorpersonnel_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete vendorpersonnel');

    return ReS(res, {message:'Deleted vendorpersonnel'}, 204);
};
module.exports.remove   =   remove;