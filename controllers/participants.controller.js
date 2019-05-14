const Joi   =   require('joi');
const { participant, training, Employee }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');


const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, participants;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, participants]       =   await to(participant.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new Participants .', participant: participants.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        training_id: Joi.required(),
        employee_id:Joi.required()
    };
    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, participants;

    [err, participants]     =   await to (participant.findAll({
        order:[['createdAt','DESC']],
        include: [{model:Employee ,attributes:['first_name','last_name']},{model:training}]
    }));

    if (err)    return ReE(res, err, 422);

    let participants_json = [];
    for (let i in participants) {
        let details =   participants[i];
        let info    =   details.toWeb();
        participants_json.push(info);
    }
    return ReS(res, {participants:participants_json});
};
module.exports.getAll   =   getAll;

const getOne    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, participants;
    let training_id = req.params.id;
    [err, participants]     =   await to (participant.findAll({
        order:[['createdAt','DESC']],
        include: [{model:Employee ,attributes:['first_name','last_name']},{model:training}],
        where:{
            training_id:training_id
        }
    }));

    if (err)    return ReE(res, err, 422);

    let participants_json = [];
    for (let i in participants) {
        let details =   participants[i];
        let info    =   details.toWeb();
        participants_json.push(info);
    }
    return ReS(res, {participants:participants_json});
};
module.exports.getOne   =   getOne;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, participants, data;
    let participants_id = req.params.id;
    data = req.body;


    [err, participants] = await to(participant.update(data, {
        where: {id: participants_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The participant is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated participant'});
};

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let participants, err ;
    let participants_id = req.params.id;
    data    =   req.body;
    [err, participants] = await to(participant.destroy({
        where: {id:participants_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete participants');

    return ReS(res, {message:'Deleted participants'}, 204);
};
module.exports.remove   =   remove;