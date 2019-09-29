const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Verifier = require('../../models/verifier');
const Application = require('../../models/application');


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  console.log("api create user")
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Verifier.model(user);

  finalUser.setPassword(user.password);
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch((err) => {
      console.log(err);
    })
    ;
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local_verifier', { session: false }, (err, passportUser, info) => {
    if (err) {
      console.log(err)
      return next(err);
    }

    if (passportUser) {
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

  return Verifier.model.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.getData() });
    });
});

//PUT user route
router.put('/user/:id', auth.optional, (req, res) => {
  const { body: { data } } = req;

  return Verifier.model.updateOne({ "_id": req.params.id },
    {
      $set: { "activity_type": data.activity_type, "abn": data.abn, "company_name": data.company_name }
    }).then((result) => {
      console.log(result)
      return res.json({ result: result });
    }).catch((err) => {
      console.log(err)
    });
});

//GET all applications route 
router.get('/applications', auth.optional, (req, res) => {

  return Application.model.find()
    .then((applications) => {
      if (!applications) {
        return res.sendStatus(400);
      }
      console.log(applications)
      return res.json({ applications: applications });
    });

});


module.exports = router;