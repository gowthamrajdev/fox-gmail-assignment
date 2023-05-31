import FoxMail from "../../models/fox-mail";
import ruleDetails  from '../../rules/rules-details.json';
import moment from 'moment';
import { FIELD, PREDICATE_STRING, PREDICATE_DATE, RULE_FILTER_TYPE, DATE_INTERVAL_TYPE } from './rules-constant/filters-conditions';
import { DATE_FORMAT } from "../util";

function getMailByRule() {
    return FoxMail.findAll({
        where: {
            mailContent: {
                [RULE_FILTER_TYPE[ruleDetails.ruleType]]: ruleToQuery(ruleDetails.rules)
            }
        }
    })
}

function ruleToQuery(rules) {
    return rules.map(rule => {
        return FIELD[rule.field] !== FIELD.DATE_RECEIVED ? stringQuery(rule) : dateQuery(rule); 
    })
}

function stringQuery(rule) {
    return {
        [FIELD[rule.field]]: {
            [PREDICATE_STRING[rule.predicate]]: getValueByType(rule.value, PREDICATE_STRING[rule.predicate])
        }
    } 
} 

function dateQuery(rule) {
    const now = moment().format(DATE_FORMAT);
    if (PREDICATE_DATE[rule.predicate] === PREDICATE_DATE.LESS_THAN) {
        const maxDate = moment().subtract(rule.value, DATE_INTERVAL_TYPE.DAY).format(DATE_FORMAT);
        return {
            [FIELD[rule.field]]: {
              [PREDICATE_DATE.LESS_THAN]: now,
              [PREDICATE_DATE.GREATER_THAN]: maxDate
            }
          }
    } else {
        return {
            [FIELD[rule.field]]: {
              [PREDICATE_DATE.LESS_THAN]: moment().add(rule.value, DATE_INTERVAL_TYPE.DAY).format(DATE_FORMAT),
              [PREDICATE_DATE.GREATER_THAN]: now
            }
          }
    }
    
}

function getValueByType(filterValue, predicate) {
   return (predicate === PREDICATE_STRING.CONTAINE || predicate === PREDICATE_STRING.NOT_CONTAIN) ? `%${filterValue}%` : filterValue; 
}

export {
    getMailByRule
}