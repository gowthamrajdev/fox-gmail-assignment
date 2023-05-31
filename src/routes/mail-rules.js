import express from 'express';
import { performAction } from '../service/fox-mail-actions';
import { getMailByRule } from '../service/fox-mail-rules';
import { FIELD, PREDICATE_STRING } from '../service/rules-constant/filters-conditions';
import { isLoggedIn } from '../util';

const router = express.Router();


router.get('/', function(req, res, next) {
    res.json({ message: 'mail routes' })
});

router.get('/rules', isLoggedIn, function(req, res, next) {
    const oAuth2Client = req.session.oAuth2Client;
    getMailByRule()
    .then(data => {
        console.log('--->', data)
        if (data.length > 0) {
            performAction(data, {}, oAuth2Client.credentials)
            .then(actionRes => {
                return res.json({ actionRes });
            });
        } else {
            return res.json({message: 'No Message Found'});
        }
    })
    
});

export default router;