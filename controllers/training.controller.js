const Joi   =   require('joi');
const { training,trainers_external, trainers_internal, Employee, vendor_personnel, training_course, course_topic, training_feedback,participant }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, trainings,traininginternal, trainingexternal;
    let body    =   req.body;
    let trainingprovider   =   body.training_provider;   //INTERNAL, EXTERNAL

    if (trainingprovider =='') {
        return ReE(res,'Training provider is mandatory.', 422);
    }

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, trainings]       =   await to(training.create(body));


    if(err) return ReE(res,err, 422);

    let data;
    if (trainingprovider === 'INTERNAL') {
         data = {training_id:trainings.id,trainer_id:body.employee_id};
        [err, traininginternal]       =   await to(trainers_internal.create(data));

        if(err) return ReE(res,err, 422);
    } else {
        console.log(body.vendor_personnel_id);
        data = {training_id:trainings.id,vaendor_personnel_id:body.vendor_personnel_id};
        [err, trainingexternal]       =   await to(trainers_external.create(data));

        if(err) return ReE(res,err, 422);
    }

    return ReS(res,{message: 'Successfully created new Training Vendor .', trainings: trainings.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        description: Joi.optional(),
        course_id:Joi.required() ,
        // course_topic_id:Joi.required() ,
        start_date:Joi.optional(),
        end_date: Joi.optional(),
        no_of_days:Joi.optional(),
        training_provider: Joi.required(),
        delivery_location:Joi.optional(),
        delivery_method: Joi.optional(),
        training_cost: Joi.optional(),
        status: Joi.optional(),
        vendor_personnel_id: Joi.optional(),
        employee_id: Joi.optional(),
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainings;

    [err, trainings]     =   await to (training.findAll({
        order:[['createdAt','DESC']],
        include: [{model:training_course ,include:{model:course_topic}},{model:trainers_internal , include:{model:Employee,attributes:['first_name','last_name']}},
            {model:trainers_external,include:{model:vendor_personnel,attributes:['name']}},{model:training_feedback}],

    }));

    if (err)    return ReE(res, err, 422);

    let trainings_json = [];
    for (let i in trainings) {
        let details =   trainings[i];
        let info    =   details.toWeb();
        trainings_json.push(info);
    }
    return ReS(res, {trainingss:trainings_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainings;
    let training_id =  req.params.id ;
    [err, trainings]     =   await to (training.findAll({
        where : {
          id : training_id
        },
        order:[['createdAt','DESC']],
        include: [{model:training_course ,include:{model:course_topic}},{model:trainers_internal , include:{model:Employee,attributes:['first_name','last_name']}},
            {model:trainers_external,include:{model:vendor_personnel,attributes:['name']}},
            {model:training_feedback},{model:participant,include:[{model:Employee,attributes:['first_name','last_name']}]}],
    }));

    if (err)    return ReE(res, err, 422);

    let trainings_json = [];
    for (let i in trainings) {
        let details =   trainings[i];
        let info    =   details.toWeb();
        trainings_json.push(info);
    }
    return ReS(res, {trainingss:trainings_json});
};
module.exports.getOne   =   getOne;

const getByParticipants    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, trainings;
    let participant_id =  req.params.id ;
    [err, trainings]     =   await to (training.findAll({
        order:[['createdAt','DESC']],
        include: [{model:participant, where: {employee_id:participant_id}, required: true,include:[{model:Employee,attributes:['first_name','last_name']}]},
            {model:training_course ,include:{model:course_topic}},{model:trainers_internal , include:{model:Employee,attributes:['first_name','last_name']}},
            {model:trainers_external,include:{model:vendor_personnel,attributes:['name']}},{model:training_feedback}],
    }));

    if (err)    return ReE(res, err, 422);

    let trainings_json = [];
    for (let i in trainings) {
        let details =   trainings[i];
        let info    =   details.toWeb();
        trainings_json.push(info);
    }
    return ReS(res, {trainingss:trainings_json});
};
module.exports.getByParticipants   =   getByParticipants;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, trainings, data;
    let trainings_id = req.params.id;
    data = req.body;

    [err, trainings] = await to(training.update(data, {
        where: {id: trainings_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The training is already exist';
        return ReE(res, err);
    }
    return ReS(res, {message: 'Updated Training '});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let trainings, err ;
    let trainings_id = req.params.id;
    data    =   req.body;
    [err, trainings] = await to(training.destroy({
        where: {id:trainings_id}
    }));
    console.log(err);
    if(err) return ReE(res, 'error occured trying to delete trainings');

    return ReS(res, {message:'Deleted trainings'}, 204);
};
module.exports.remove   =   remove;