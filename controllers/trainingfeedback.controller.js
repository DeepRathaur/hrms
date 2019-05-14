const Joi = require('joi');
const {training, training_feedback} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');


const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingfeedback;
    let body = req.body;

    const {error} = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, trainingfeedback] = await to(training_feedback.create(body));

    if (err) return ReE(res, err, 422);


    return ReS(res, {
        message: 'Successfully created new Training Feedback .',
        trainingfeedback: trainingfeedback.toWeb()
    }, 201);
};
module.exports.create = create;

function validate(req) {
    const schema = {
        training_id: Joi.required(),
        comments:Joi.optional(),
        rating:Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingfeedback;

    [err, trainingfeedback] = await to(training_feedback.findAll({
        order: [['createdAt', 'DESC']],
        include: [{model: training}]
    }));

    if (err) return ReE(res, err, 422);

    let trainingfeedback_json = [];
    for (let i in trainingfeedback) {
        let details = trainingfeedback[i];
        let info = details.toWeb();
        trainingfeedback_json.push(info);
    }
    return ReS(res, {trainingfeedbacks: trainingfeedback_json});
};
module.exports.getAll = getAll;


const getOne = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingfeedback;
    let trainingfeedback_id = req.params.id;
    [err, trainingfeedback] = await to(training_feedback.findAll({
        order: [['createdAt', 'DESC']],
        include: [{model: training}],
        where: {
            training_id:trainingfeedback_id
        }
    }));

    if (err) return ReE(res, err, 422);

    let trainingfeedback_json = [];
    for (let i in trainingfeedback) {
        let details = trainingfeedback[i];
        let info = details.toWeb();
        trainingfeedback_json.push(info);
    }
    return ReS(res, {trainingfeedbacks: trainingfeedback_json});
};
module.exports.getOne = getOne;


const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingfeedback, data;
    let trainingfeedback_id = req.params.id;
    data = req.body;


    [err, trainingfeedback] = await to(training_feedback.update(data, {
        where: {id: trainingfeedback_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'error';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated training feedback: '});
};

module.exports.update = update;

const remove = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let trainingfeedback, err;
    let trainingfeedback_id = req.params.id;
    data = req.body;
    [err, trainingfeedback] = await to(training_feedback.destroy({
        where: {id: trainingfeedback_id}
    }));

    if (err) return ReE(res, 'error occured trying to delete trainingfeedback');

    return ReS(res, {message: 'Deleted trainingfeedback'}, 204);
};
module.exports.remove = remove;