import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.json({ message: 'user routes' })
});


router.get('/auth/login', passport.authenticate('google', { scope:
  [ 'email', 'profile' ] }
));

router.get('/auth/logout', (req, res, next) => {
  req.logout(() => {
    res.json({message: 'Logged Out successfully'})
  });
});

router.get('/auth/callback', 
      passport.authenticate( 'google', {
          successRedirect: '/users/auth/google/success',
          failureRedirect: '/users/auth/google/failure'
}));

router.get('/auth/google/success', (req, res, next) => {
  console.log('===success====')
  res.json({message: 'google login success'})
});

router.get('/auth/google/failure', (req, res, next) => {
  console.log('===failure====')
  res.json({message: 'google login failed'})
});

export default router;
