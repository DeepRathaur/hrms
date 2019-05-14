const Joi   =   require('joi');
const { training_course }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingcourse;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, trainingcourse]       =   await to(training_course.create(body));

    if(err) return ReE(res,{message:'This course is already exist.Please try another!'}, 422);

    return ReS(res,{message: 'Successfully created new Training Course .', trainingcourse: trainingcourse.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        description: Joi.optional(),
        remarks: Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainingcourse;

    [err, trainingcourse]     =   await to (training_course.findAll({
        order:[['createdAt','DESC']]
    }));

    if (err)    return ReE(res, err, 422);

    let trainingcourse_json = [];
    for (let i in trainingcourse) {
        let details =   trainingcourse[i];
        let info    =   details.toWeb();
        trainingcourse_json.push(info);
    }
    return ReS(res, {trainingcourses:trainingcourse_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, trainingcourse, data;
    let trainingcourse_id = req.params.id;
    data = req.body;
    [err, trainingcourse] = await to(training_course.update(data, {
        where: {id: trainingcourse_id}
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
    let trainingcourse, err ;
    let trainingcourse_id = req.params.id;
    data    =   req.body;
    [err, trainingcourse] = await to(training_course.destroy({
        where: {id:trainingcourse_id}
    }));
    console.log(err);
    if(err) return ReE(res, 'error occured trying to delete training course');

    return ReS(res, {message:'Deleted training course'}, 204);
};
module.exports.remove   =   remove;