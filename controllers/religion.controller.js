const Joi   =   require('joi');
const { Religion }     =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);
    
    if (!body.name) {
        return ReE(res, 'Please enter a name of religion.');
    } else {
        let err, religions;

        [err, religions] = await to(Religion.create(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully created new religion.', religion: religions.toWeb()}, 201);
    }
}

module.exports.create   =   create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, religions

    [err, religions] = await to(Religion.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let board_json = []

    for (let i in religions) {
        let details = religions[i];
        let info = details.toWeb();
        board_json.push(info);
    }
    return ReS(res, {religion: board_json});
}

module.exports.getAll   =   getAll;

const update    =   async function (req, res) {
    let err, religions, data;
    let id = parseInt(req.params.id);
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of religion.');
    }else {

        [err, religions] = await to(Religion.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of religion is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Religion : '+ data.name});
    }
}

module.exports.update      =    update  ;


const remove    =   async function (req, res) {
    let religions, err ;
    let id = parseInt(req.params.id);
    data    =   req.body;
    [err, religions] = await to(Religion.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete religion');

    return ReS(res, {message:'Deleted religion'}, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}