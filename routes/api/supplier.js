const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Supplier = require('../../models/supplier');
const Application = require('../../models/application');
const EmpUnemployed= require('../../models/emp_unemployed');
const EmpRefugee= require('../../models/emp_refugee');
const EmpDisability = require('../../models/emp_disability');
const EmpAbo = require('../../models/emp_abo');

// ========================Login/Signup route========================
//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  console.log(user)
  const finalUser = new Supplier.model(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch((err) => {
      res.sendStatus(400);
    })
    ;
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local_supplier', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;

      return res.json({ user: user.getData() });
    }

    return res.status(400).json({
      errors: {
        message: "couldn't find user"
      }
    });
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  
  const { payload: { id } } = req;
  return Supplier.model.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.getData()});
    });
});

//GET current route (required, only authenticated users have access)
router.get('/user/:id', auth.optional, (req, res, next) => {
  
  return Supplier.model.findById(req.params.id
  ).then((user) => {

      return res.json({ user: user});
    }).catch((err) => {
      return res.status(400).json({ err: err});
    });
});

//PUT user route
router.put('/user/:id', auth.optional, (req, res) => {
  const { body: { data } } = req;

  return Supplier.model.updateOne({"_id": req.params.id}, 
  {$set:{"phone": data.phone, "street": data.street, "suburb": data.suburb, "state": data.state,
          "abn": data.abn, "company_name": data.company_name}
  }).then((result) => {
      console.log(result)

      return res.json({ result: result});
    }).catch((err) => {
      console.log(err)
    });
  
});


// ========================application route========================

//POST application route
router.post('/application/:id', auth.optional, (req, res, next) => {
  const { body: { data } } = req;

  let emp_unemployeds = data.unemployed
  let emp_refugees = data.refugee
  let emp_disabilities = data.disability
  let emp_abos = data.abo
  emp_unemployeds.forEach(function (empUnemployed, index) {
    const e = new EmpUnemployed.model(empUnemployed);
    e.supplier_id = data.supplier_id
    e.company_name = data.company_name
    emp_unemployeds[index] = e  
  });
  emp_refugees.forEach(function (emp_refugee, index) {
    const e = new EmpRefugee.model(emp_refugee);
    e.supplier_id = data.supplier_id
    e.company_name = data.company_name
    emp_refugees[index] = e  
  });
  emp_disabilities.forEach(function (emp_disabilitie, index) {
    const e = new EmpDisability.model(emp_disabilitie);
    e.supplier_id = data.supplier_id
    e.company_name = data.company_name
    emp_disabilities[index] = e  
  });
  emp_abos.forEach(function (emp_abo, index) {
    const e = new EmpAbo.model(emp_abo);
    e.supplier_id = data.supplier_id
    e.company_name = data.company_name
    emp_abos[index] = e  
  });

  const application = new Application.model();
  application.supplier_id = data.supplier_id
  application.emp_disability = emp_disabilities
  application.emp_refugee = emp_refugees
  application.emp_unemploy = emp_unemployeds
  application.emp_abo = emp_abos
  application.company_name = data.company_name
  application.created_date = new Date()


  try {
    EmpUnemployed.model.insertMany(emp_unemployeds);
    EmpAbo.model.insertMany(emp_abos);
    EmpRefugee.model.insertMany(emp_refugees);
    EmpDisability.model.insertMany(emp_disabilities);
    application.save();
    return res.sendStatus(201);
  } catch (e) {
    console.log(e.response);
    return res.send(e.response);
  }
});

//PUT application route
router.put('/application/:id', auth.optional, (req, res) => {
  const { body: { data } } = req;
  let update_data = new Object();
  if (data.abo_existing_data){
    update_data.abo_existing_data_status = data.abo_existing_data
  }
  return Application.model.updateOne({"_id": req.params.id}, 
  {$set:update_data},{multi:true}
  ).then((result) => {
      console.log(result)
      console.log(req.params.id)
      console.log(update_data)
      return res.json({ result: result});
    }).catch((err) => {
      console.log(err)
    });
  
});

//GET application details route by application id
router.get('/application/:id', auth.optional, (req, res) => {
  return Application.model.findOne({_id: req.params.id})
    .then((application) => {
      console.log(application)
      if(!application) {
        return res.sendStatus(400);
      }

      return res.json({ application: application.getData()});
    });
  
});

//GET all applications for the supplier route by user id 
router.get('/applications/:id', auth.optional, (req, res) => {
  return Application.model.find({supplier_id: req.params.id})
    .then((applications) => {
      if(!applications) {
        return res.sendStatus(400);
      }

      return res.json({ applications: applications});
    });
  
});

//Delete application route
router.delete('/application/:id', auth.optional, (req, res) => {
  Application.model.findOne({_id: req.params.id})
    .then((result) => {
      result.emp_recruit_abo.forEach(function (empRecruitAbo) {
        EmpRecruitAbo.model.deleteOne({"_id": empRecruitAbo._id}).then()
      });
      result.emp_cohorts.forEach(function (empCohort) {
        EmpCohort.model.deleteOne({_id: empCohort._id}).then()
      });
      result.social_benefit.forEach(function (socialBenefit) {
        SocialBenefit.model.deleteOne({_id: socialBenefit._id}).then()
      });
      result.readiness_act.forEach(function (readinessAct) {
        ReadinessAct.model.deleteOne({_id: readinessAct._id}).then().catch(err => {console.log(err)})
      });
    })
  
  return Application.model.deleteOne({_id: req.params.id})
    .then((result) => {
      res.status(204).send({result: result});
    });
  
});


module.exports = router;