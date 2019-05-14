const Joi   =   require('joi');
const { job_publish, consultant }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');
const { massMailer }  =   require('../services/mail');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, jobpublish;
    let body    =   req.body;
    console.log(body);
    //var listofemails = ["deepak.singh@spaaksupertec.com","niraj.kumar@spaaksupertec.com","naresh.kumar@spaaksupertec.com"];
    var listofemails = [];


    let consultantD  =  body.consultant_id;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    for (let i= 0 ; i<consultantD.length ; i++){

        let  consultantdata;

        [err, consultantdata]     =   await to (consultant.findOne({
            where: {
                id : consultantD[i]
            }
        }));

        if (err)    return ReE(res, err, 422);

        let consultantEmail =   consultantdata.email;

        listofemails.push(consultantEmail);

        let data = {job_id:body.job_id,consultant_id:consultantD[i],job_published_by:body.job_published_by,
            job_publish_date:body.job_publish_date,message:body.message};
            [err, jobpublish]       =   await to(job_publish.create(data));
            if(err) return ReE(res,err, 422);
    }
    massMailer({emails:listofemails,jobid:body.job_id}) ;


    return ReS(res,{message: 'Successfully created new job publish.', jobpublish: jobpublish.toWeb()}, 201);
};
module.exports.create   =   create;

function validate(req) {
    const schema = {
        job_id:Joi.optional() ,
        consultant_id:Joi.optional(),
        job_published_by: Joi.optional(),
        job_publish_date: Joi.optional(),
        message: Joi.optional()
    };

    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, jobpublish;

    [err, jobpublish]     =   await to (job_publish.findAll({
        order:[['createdAt','DESC']]
    }));

    if (err)    return ReE(res, err, 422);

    let jobpublish_json = [];
    for (let i in jobpublish) {
        let details =   jobpublish[i];
        let info    =   details.toWeb();
        jobpublish_json.push(info);
    }
    return ReS(res, {jobpublishs:jobpublish_json});
};
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, jobpublish, data;
    let jobpublish_id = req.params.id;
    data = req.body;
    [err, jobpublish] = await to(job_publish.update(data, {
        where: {id: jobpublish_id}
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
    let jobpublish, err ;
    let jobpublish_id = req.params.id;
    data    =   req.body;
    [err, jobpublish] = await to(job_publish.destroy({
        where: {id:jobpublish_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete jobpublish');

    return ReS(res, {message:'Deleted jobpublish'}, 204);
};

module.exports.remove   =   remove;

const sendEmails = async(req, res) => {
    var listofemails = ["deepak.singh@spaaksupertec.com","niraj.kumar@spaaksupertec.com","naresh.kumar@spaaksupertec.com"];
    massMailer(listofemails) ;
};
module.exports.sendEmails= sendEmails ;