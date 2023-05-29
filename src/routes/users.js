import express from 'express';
import passport from 'passport';
import { getGmailsDataAndSync } from '../service/gmail-auth';
import OAuth2Data from '../../initializers/google-credentials.json';
import {google} from 'googleapis';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: 'user routes' })
});

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
  const code = req.query.code;
  if (code) {
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return res.json({err});
      oAuth2Client.setCredentials(token);
      getGmailsDataAndSync(oAuth2Client)
      .then(data => {
        res.json({message: data})
      })
      
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


// Normal Google Auth No Need for Now 
router.get('/auth/login', passport.authenticate('google', { scope:
  ['profile' ] }
));

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
