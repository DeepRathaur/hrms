const Joi   =   require('joi');
const { interview,recruitment_profile, Employee, job_opening, interview_rating }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, interviews;
    let body    =   req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, interviews]       =   await to(interview.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new Interview .', interviews: interviews.toWeb()}, 201);

};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        profile_id:Joi.number().required(),
        schedule_date: Joi.optional(),
        scheduled_by:Joi.number().required() ,
        interviewer:Joi.number().required() ,
        interview_round: Joi.optional(),
        interview_mode:Joi.optional() ,
        interview_status:Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, interviews, intrating, is_interviewrating;

    [err, interviews]     =   await to (interview.findAll({
        order:[['createdAt','DESC']],
        include: [{model:recruitment_profile , include:{model:job_opening}},{model:Employee, as:'ScheduledBy',attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}
        ,{model:Employee, as:'InterviewBy', attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}]
    }));

    if (err)    return ReE(res, err, 422);

    let interviews_json = [];
    for (let i in interviews) {
        let details =   interviews[i];
        let interviewid = details.id;

        [err, intrating]     =   await to (checkIntRating(interviewid));

        if (!intrating) {
            is_interviewrating = false;
        } else {
            is_interviewrating = true;
        }
        let info    =   details.toWeb();
        info.interviewrating = is_interviewrating;
        interviews_json.push(info);
    }
    return ReS(res, {interviewss:interviews_json});
};
module.exports.getAll   =   getAll;


const getBymanagerId    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, interviews, intrating, is_interviewrating;
    let managerId = req.params.id;
    [err, interviews]     =   await to (interview.findAll({
        order:[['createdAt','DESC']],
        include: [{model:recruitment_profile , include:{model:job_opening}},{model:Employee, as:'ScheduledBy',attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}
            ,{model:Employee, as:'InterviewBy', attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}],
        where :{
            interviewer:managerId
        }
    }));

    if (err)    return ReE(res, err, 422);

    let interviews_json = [];
    for (let i in interviews) {
        let details =   interviews[i];
        let interviewid = details.id;

        [err, intrating]     =   await to (checkIntRating(interviewid));

        if (!intrating) {
            is_interviewrating = false;
        } else {
            is_interviewrating = true;
        }
        let info    =   details.toWeb();
        info.interviewrating = is_interviewrating;
        interviews_json.push(info);
    }
    return ReS(res, {interviewss:interviews_json});
};
module.exports.getBymanagerId   =   getBymanagerId;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, interviews, data;
    let interviews_id = req.params.id;
    data = req.body;
    [err, interviews] = await to(interview.update(data, {
        where: {id: interviews_id}
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
    let interviews, err ;
    let interviews_id = req.params.id;
    data    =   req.body;
    [err, interviews] = await to(interview.destroy({
        where: {id:interviews_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete interviews');

    return ReS(res, {message:'Deleted interviews'}, 204);
};

const checkIntRating = async (req, res) => {
    let err, interviewsrating;
    [err, interviewsrating] = await to(interview_rating.findOne({
        where: {
            interview_id : req
        }
    }));
    return  interviewsrating ;
};


module.exports.remove   =   remove;