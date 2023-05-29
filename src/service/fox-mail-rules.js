import FoxMail from "../../models/fox-mail";
import { Op } from 'sequelize';
import ruleOne  from '../../rules/rule-one.json'
import { FIELD, PREDICATE_STRING } from '../service/rules-config/filters-conditions';


function getMailByRule(field, predicate, value) {
    return FoxMail.findAll({
        where: {
            mailContent: {
                [Op.and]: ruleToQuery(ruleOne)
            }
        }
    })
}

function ruleToQuery(rules) {
    return rules.map(rule => {
        return {
            [FIELD[rule.field]]: {
                [PREDICATE_STRING[rule.predicate]]: getValueByType(rule.value, PREDICATE_STRING[rule.predicate])
            }
        }
    })
}

function getValueByType(filterValue, predicate) {
   return (predicate === PREDICATE_STRING.CONTAINE || predicate === PREDICATE_STRING.NOT_CONTAIN) ? `%${filterValue}%` : filterValue; 
}

export {
    getMailByRule
}