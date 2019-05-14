const Joi   =   require('joi');
const { Grade } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, grade;

    [err, grade] = await to(Grade.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new Grade.', grade: grade.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, grade

    [err, grade] = await to(Grade.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let Grade_json = []

    for (let i in grade) {
        let details = grade[i];
        let info = details.toWeb();
        Grade_json.push(info);
    }
    return ReS(res, { grade: Grade_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, Grades, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, Grades] = await to(Grade.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of Grade is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Grade : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let Grades, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, Grades] = await to(Grade.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Grade');

    return ReS(res, { message: 'Deleted Grade' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}