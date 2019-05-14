const Joi   =   require('joi');
const { job_opening, Department, location, Employee, job_publish }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, jobopening;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, jobopening]       =   await to(job_opening.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new jobopening.', jobopening: jobopening.toWeb()}, 201);

};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        title:Joi.optional() ,
        type:Joi.optional(),
        description: Joi.optional(),
        opening_date: Joi.optional(),
        no_of_position: Joi.optional(),
        experience:Joi.optional() ,
        department_id: Joi.optional(),
        job_opening_by: Joi.optional(),
        location_id: Joi.optional(),
        job_status: Joi.optional(),
    };

    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, jobopening, jobpub, is_jobpub;

    [err, jobopening]     =   await to (job_opening.findAll({
        order:[['createdAt','DESC']],
        include: [{model:Department,attributes:['id','name']},{model:location,attributes:['id','name']},
            {model:Employee,attributes:['id','first_name']}]
    }));

    if (err)    return ReE(res, err, 422);

    let jobopening_json = [];
    for (let i in jobopening) {
        let details =   jobopening[i];
        let JobId = details.id;
        [err, jobpub]     =   await to (checkJobPublish(JobId));

        if (!jobpub) {
            is_jobpub = false;
        } else {
            is_jobpub = true;
        }
        let info    =   details.toWeb();
        info.jobpublished = is_jobpub;
        jobopening_json.push(info);
    }
    return ReS(res, {jobopenings:jobopening_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, jobopening, data;
    let jobopening_id = req.params.id;
    data = req.body;
    [err, jobopening] = await to(job_opening.update(data, {
        where: {id: jobopening_id}
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
    let jobopening, err ;
    let jobopening_id = req.params.id;
    data    =   req.body;
    [err, jobopening] = await to(job_opening.destroy({
        where: {id:jobopening_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete jobopening');

    return ReS(res, {message:'Deleted jobopening'}, 204);
};

module.exports.remove   =   remove;

const checkJobPublish = async (req, res) => {
    let err, jobpublish;
    [err, jobpublish] = await to(job_publish.findOne({
        where: {
            job_id : req
        }
    }));
    return  jobpublish ;
};