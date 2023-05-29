import FoxMail from "../../models/fox-mail";
import ruleOne  from '../../rules/rule-one.json';
import moment from 'moment';
import { FIELD, PREDICATE_STRING, PREDICATE_DATE, RULE_FILTER_TYPE, DATE_INTERVAL_TYPE } from '../service/rules-config/filters-conditions';
import { DATE_FORMAT } from "../util";

function getMailByRule() {
    return FoxMail.findAll({
        where: {
            mailContent: {
                [RULE_FILTER_TYPE[ruleOne.ruleType]]: ruleToQuery(ruleOne.rules)
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
        return {
            [FIELD[rule.field]]: {
              [PREDICATE_DATE.LESS_THAN]: now,
              [PREDICATE_DATE.GREATER_THAN]: moment(now).subtract(rule.value, DATE_INTERVAL_TYPE.DAY).format(DATE_FORMAT)
            }
          }
    } else {
        return {
            [FIELD[rule.field]]: {
              [PREDICATE_DATE.LESS_THAN]: moment(now).add(rule.value, DATE_INTERVAL_TYPE.DAY).format(DATE_FORMAT),
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