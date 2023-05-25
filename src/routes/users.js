import express from 'express';
import passport from 'passport';
import { getAllGmails } from '../service/gmail';
import OAuth2Data from '../../initializers/google-credentials.json';
import {google} from 'googleapis';

const router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.json({ message: 'user routes' })
});


router.get('/auth/login', passport.authenticate('google', { scope:
  [ 'email', 'profile' ] }
));

// Below test 
const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const REDIRECT_URL = OAuth2Data.client.redirect

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


router.get('/auth/gmail/login', (req, res, next) => {
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://mail.google.com/'
          ]
      });
    res.redirect(url);  
});


router.get('/auth/gmail/callback', (req, res, next) => {
  // console.log('--req--->', req)
  const code = req.query.code;
  if (code) {
    oAuth2Client.getToken(code, (err, token) => {
      console.log('--coming in---')
      console.log('--tokens---', token)
      // console.log('--before---', oAuth2Client)
      if (err) return res.json({err});
      oAuth2Client.setCredentials(token)
      console.log('--oAuth2Client->', getAllGmails(oAuth2Client, res));
      res.json({message: 'time to lead'})
    })
  } else {
    res.json({message: 'No Google Auth Token'})
  }
  
});

router.get('/auth/logout', (req, res, next) => {
  req.logout(() => {
    res.json({message: 'Logged Out successfully'})
  });
});

// Google Auth

router.get('/auth/callback', 
      passport.authenticate( 'google', {
          failureRedirect: '/users/auth/google/failure'
}), (req, res) => {
  getAllGmails(req.user.accessToken, req.query.code, res)
  .then(data => {
    res.json({data})
  });
});

router.get('/auth/google/failure', (req, res, next) => {
  res.json({message: 'google login failed'})
});

export default router;
