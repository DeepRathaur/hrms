const Joi   =   require('joi');
const { interview, interview_rating }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, interviewratings;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, interviewratings]       =   await to(interview_rating.create(body));

    if(err) return ReE(res,'Duplicate value not allow', 422);

    return ReS(res,{message: 'Successfully created new Interview .', interviewratings: interviewratings.toWeb()}, 201);

};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        interview_id:Joi.number().required() ,
        relevant_education:Joi.optional() ,
        relevant_work_exp: Joi.optional(),
        tech_skill:Joi.optional() ,
        machine_test:Joi.optional() ,
        communication:Joi.optional() ,
        potential:Joi.optional(),
        adaptability:Joi.optional() ,
        attitude: Joi.optional(),
        leadership:Joi.optional() ,
        stress_tolerance:Joi.optional(),
        neatly_groomed:Joi.optional() ,
        integrity: Joi.optional(),
        stability:Joi.optional() ,
        overall_rating:Joi.optional(),
        overall_rating_auto:Joi.optional(),
        remarks:Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, interviewratings;

    [err, interviewratings]     =   await to (interview_rating.findAll({
        order:[['createdAt','DESC']],
        //include: [{model:recruitment_profile}]
    }));

    if (err)    return ReE(res, err, 422);

    let interviewratings_json = [];
    for (let i in interviewratings) {
        let details =   interviewratings[i];
        let info    =   details.toWeb();
        interviewratings_json.push(info);
    }
    return ReS(res, {interviewratingss:interviewratings_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, interviewratings, id;
    id = req.params.id;
    [err, interviewratings]     =   await to (interview_rating.findAll({
        order:[['createdAt','DESC']],
        where: {
            interview_id:id
        }
        //include: [{model:recruitment_profile}]
    }));

    if (err)    return ReE(res, err, 422);

    let interviewratings_json = [];
    for (let i in interviewratings) {
        let details =   interviewratings[i];
        let info    =   details.toWeb();
        interviewratings_json.push(info);
    }
    return ReS(res, {interviewratingss:interviewratings_json});
};
module.exports.getOne   =   getOne;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, interviewratings, data;
    let interviewratings_id = req.params.id;
    data = req.body;
    [err, interviewratings] = await to(interview_rating.update(data, {
        where: {id: interviewratings_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The job opening is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated job opening : '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let interviewratings, err ;
    let interviewratings_id = req.params.id;
    data    =   req.body;
    [err, interviewratings] = await to(interview_rating.destroy({
        where: {id:interviewratings_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete interviewratings');

    return ReS(res, {message:'Deleted interviewratings'}, 204);
};

module.exports.remove   =   remove;