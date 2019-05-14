const Joi   =   require('joi');
const { profile_shared_for_review, recruitment_profile, Employee, job_opening }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, profilesharedforreview;
    let body    =   req.body;
    let profileids  =   body.profile_id;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    for (let i=0 ; i<profileids.length ; i++){
        body.profile_id =  profileids[i] ;
        [err, profilesharedforreview]       =   await to(profile_shared_for_review.create(body));
        if(err) return ReE(res,err, 422);
    }
    return ReS(res,{message: 'Successfully created new profile shared for review.', profilesharedforreview: profilesharedforreview.toWeb()}, 201);

};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        profile_id:Joi.required(),
        shared_by:Joi.optional() ,
        review_by:Joi.optional() ,
        shared_date:Joi.optional() ,
        review_date:Joi.optional()  ,
        review_comment:Joi.optional() ,
        is_shortlisted: Joi.optional()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, profilesharedforreview;

    [err, profilesharedforreview]     =   await to (profile_shared_for_review.findAll({
        order:[['createdAt','DESC']],
        include: [{model:recruitment_profile, include:{model:job_opening}},{model:Employee,as: 'SharedBy',attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']},
            {model:Employee,as: 'ReviewBy',attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}]
    }));

    if (err)    return ReE(res, err, 422);

    let profilesharedforreview_json = [];
    for (let i in profilesharedforreview) {
        let details =   profilesharedforreview[i];
        let info    =   details.toWeb();
        profilesharedforreview_json.push(info);
    }
    return ReS(res, {profilesharedforreviews:profilesharedforreview_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, profilesharedforreview, data;
    let profilesharedforreview_id = req.params.id;
    data = req.body;
    [err, profilesharedforreview] = await to(profile_shared_for_review.update(data, {
        where: {id: profilesharedforreview_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The profile for shared is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated data  '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let profilesharedforreview, err ;
    let profilesharedforreview_id = req.params.id;
    data    =   req.body;
    
    [err, profilesharedforreview] = await to(profile_shared_for_review.destroy({
        where: {id:profilesharedforreview_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete profile shared for review');

    return ReS(res, {message:'Deleted profilesharedforreview'}, 204);
};

module.exports.remove   =   remove;