const Joi   =   require('joi');
const { Asset }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, asset;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, asset]       =   await to(Asset.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new asset.', asset: asset.toWeb()}, 201);

}
module.exports.create   =   create;

const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, asset;

    [err, asset]     =   await to (Asset.findAll({
        order:[['name','ASC']]
    }));

    if (err)    return ReE(res, err, 422);

    let asset_json = [];
    for (let i in asset) {
        let details =   asset[i];
        let info    =   details.toWeb();
        asset_json.push(info);
    }
    return ReS(res, {assets:asset_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, asset, data;
    let asset_id = req.params.id;
    data = req.body;
    [err, asset] = await to(Asset.update(data, {
        where: {id: asset_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of asset is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated asset : '});
}

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let asset, err ;
    let asset_id = req.params.id;
    data    =   req.body;
    [err, asset] = await to(Asset.destroy({
        where: {id:asset_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete asset');

    return ReS(res, {message:'Deleted asset'}, 204);
}

module.exports.remove   =   remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        serial_number: Joi.string().required(),
        description: Joi.optional(),
        value: Joi.number().integer().required()        
    };

    return Joi.validate(req, schema);
}