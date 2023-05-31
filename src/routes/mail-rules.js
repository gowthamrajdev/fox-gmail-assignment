import express from 'express';
import { performAction } from '../service/fox-mail-actions';
import { getMailByRule } from '../service/fox-mail-rules';
import { getOAuthClient, isLoggedIn } from '../util';
import rulesDetails from '../../rules/rules-details.json'

const router = express.Router();


router.get('/', function(req, res, next) {
    res.json({ message: 'mail routes' })
});

router.get('/submit', isLoggedIn, function(req, res, next) {
    const credentials = req.session.oAuth2Client.credentials;
    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials(credentials);

    getMailByRule(rulesDetails)
    .then(data => {
        if (data.length > 0) {
            performAction(data, rulesDetails.actions, oAuth2Client)
            .then(actionRes => {
                return res.json({ actionRes });
            });
        } else {
            return res.json({message: 'No Message Found'});
        }
    })
    
});

export default router;