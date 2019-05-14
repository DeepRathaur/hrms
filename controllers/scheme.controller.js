const Joi   =   require('joi');
const { Scheme }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, schemes;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, schemes]       =   await to(Scheme.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new schemes.', schemes: schemes.toWeb()}, 201);

}
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, schemes;

    [err, schemes]     =   await to (Scheme.findAll({
        order:[['name','ASC']]
    }));

    if (err)    return ReE(res, err, 422);

    let schemes_json = [];
    for (let i in schemes) {
        let details =   schemes[i];
        let info    =   details.toWeb();
        schemes_json.push(info);
    }
    return ReS(res, {schemess:schemes_json});
}
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, schemes, data;
    let schemes_id = req.params.id;
    data = req.body;
    [err, schemes] = await to(Scheme.update(data, {
        where: {id: schemes_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of schemes is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated schemes : '});
}

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let schemes, err ;
    let schemes_id = req.params.id;
    data    =   req.body;
    [err, schemes] = await to(Scheme.destroy({
        where: {id:schemes_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete schemes');

    return ReS(res, {message:'Deleted schemes'}, 204);
}

module.exports.remove   =   remove;