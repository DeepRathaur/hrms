const Joi   =   require('joi');
const { Bank } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const Sequelize = require('sequelize');
const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, bank;

    [err, bank] = await to(Bank.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new bank.', bank: bank.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, bank

    [err, bank] = await to(Bank.findAll({
         order: [['name', 'ASC']],
    }));

    

    if (err) return ReE(res, err, 422)

    let bank_json = []

    for (let i in bank) {
        let details = bank[i];
        let info = details.toWeb();
        bank_json.push(info);
    }
    return ReS(res, { bank: bank_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, banks, data;
    let id = parseInt(req.params.id);
    data = req.body;
    //console.log(data);
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, banks] = await to(Bank.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of bank is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated bank : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let banks, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, banks] = await to(Bank.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete bank');

    return ReS(res, { message: 'Deleted bank' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        ifsc_code: Joi.string().required(),
        micr_code: Joi.string().required(),
        address : Joi.string(),
        contact: Joi.string(),
        city: Joi.string(),
        district: Joi.string(),
        state: Joi.string()
        
    };

    return Joi.validate(req, schema);
}