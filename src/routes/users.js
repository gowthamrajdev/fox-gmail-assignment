import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.json({ message: 'user routes' })
});


router.get('/auth', passport.authenticate('google', { scope:
  [ 'email', 'profile' ] }
));

router.get('/auth/callback', 
      passport.authenticate( 'google', {
          successRedirect: '/auth/google/success',
          failureRedirect: '/auth/google/failure'
}));

export default router;
