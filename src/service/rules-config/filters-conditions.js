import { Op } from 'sequelize';

export const FIELD = {
    FROM: 'from',
    TO: 'to',
    SUBJECTS: 'subject',
    DATE_RECEIVED: 'dateReceived'
}

export const PREDICATE_STRING = {
    CONTAINE: Op.like,
    NOT_CONTAIN: Op.notLike,
    EQUAL: Op.eq,
    NOT_EQUAL: Op.ne
}


export const PREDICATE_DATE = {
    LESS_THAN: Op.lt,
    GREATER_THAN: Op.gt
}

export const DATE_INTERVAL_TYPE = {
    DAY: 'day',
    MONTHS: 'months'
}

export const RULE_FILTER_TYPE = {
    ALL: Op.and,
    ANY: Op.or
}
