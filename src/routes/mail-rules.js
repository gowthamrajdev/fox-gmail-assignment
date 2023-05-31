import express from 'express';
import { performAction } from '../service/fox-mail-actions';
import { getMailByRule } from '../service/fox-mail-rules';
import { isLoggedIn } from '../util';
import rulesDetails from '../../rules/rules-details.json'

const router = express.Router();


router.get('/', function(req, res, next) {
    res.json({ message: 'mail routes' })
});

router.get('/rules', isLoggedIn, function(req, res, next) {
    const oAuth2Client = getOAuthClient();
    const token = req.session.oAuth2Client.token;
    oAuth2Client.setCredentials(token);

    getMailByRule()
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