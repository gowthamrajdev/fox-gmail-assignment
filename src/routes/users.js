import express from 'express';
import { getGmailDataAndSync } from '../service/gmail-auth';
import OAuth2Data from '../../initializers/google-credentials.json';
import { getOAuthClient } from '../util';

const router = express.Router();
const oAuth2Client = getOAuthClient()

router.get('/', function(req, res, next) {
  res.json({ message: 'user routes' })
});

// Login And Gmail Sync
router.get('/auth/gmail/login', (req, res, next) => {
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: OAuth2Data.client.scope
      });
    res.redirect(url);  
});

router.get('/auth/gmail/callback', (req, res, next) => {
  const code = req.query.code;
  if (code) {
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return res.json({err});
        oAuth2Client.setCredentials(token);
        req.session.oAuth2Client = oAuth2Client;
        getGmailDataAndSync(oAuth2Client)
          .then(data => res.json({message: data}))
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


export default router;
