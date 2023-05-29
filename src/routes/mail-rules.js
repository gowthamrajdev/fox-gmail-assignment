import express from 'express';
import { getMailByRule } from '../service/fox-mail-rules';
import { FIELD, PREDICATE_STRING } from '../service/rules-config/filters-conditions';

const router = express.Router();


router.get('/', function(req, res, next) {
    res.json({ message: 'mail routes' })
});

router.get('/rules', function(req, res, next) {
    getMailByRule(FIELD.FROM, PREDICATE_STRING.EQUALS, 'Special Dispatch <newsletter@indiaretailnews.com>')
    .then(data => {
        res.json({ data })
    })
    
});

export default router;