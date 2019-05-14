const Joi   =   require('joi');
const { course_topic, training_course }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, coursetopic;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, coursetopic]       =   await to(course_topic.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new Training Course .', coursetopic: coursetopic.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        course_id: Joi.required(),
        name: Joi.optional(),
        description: Joi.optional(),
    };
    return Joi.validate(req, schema);
}

const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, coursetopic;

    [err, coursetopic]     =   await to (course_topic.findAll({
        order:[['createdAt','DESC']],
        include:[{model:training_course}]
    }));

    if (err)    return ReE(res, err, 422);

    let coursetopic_json = [];
    for (let i in coursetopic) {
        let details =   coursetopic[i];
        let info    =   details.toWeb();
        coursetopic_json.push(info);
    }
    return ReS(res, {coursetopics:coursetopic_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, coursetopic;
    let course_id   =   req.params.id;
    [err, coursetopic]     =   await to (course_topic.findAll({
        where: {
            course_id: course_id
        },
        order:[['createdAt','DESC']]
    }));

    if (err)    return ReE(res, err, 422);

    let coursetopic_json = [];
    for (let i in coursetopic) {
        let details =   coursetopic[i];
        let info    =   details.toWeb();
        coursetopic_json.push(info);
    }
    return ReS(res, {coursetopics:coursetopic_json});
};
module.exports.getOne   =   getOne;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, coursetopic, data;
    let coursetopic_id = req.params.id;
    data = req.body;
    [err, coursetopic] = await to(course_topic.update(data, {
        where: {id: coursetopic_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The course is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated training course '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let coursetopic, err ;
    let coursetopic_id = req.params.id;
    data    =   req.body;
    [err, coursetopic] = await to(course_topic.destroy({
        where: {id:coursetopic_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete coursetopic');

    return ReS(res, {message:'Deleted coursetopic'}, 204);
};
module.exports.remove   =   remove;