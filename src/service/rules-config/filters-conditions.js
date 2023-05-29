import { Op } from 'sequelize';

export const FIELD = {
    FROM: 'from',
    TO: 'to',
    SUBJECTS: 'subject',
    DATE_RECEIVED: 'date'
}

export const PREDICATE_STRING = {
    CONTAINE: Op.like,
    NOT_CONTAIN: Op.notLike,
    EQUAL: Op.eq,
    NOT_EQUAL: Op.ne
}


export const PREDICATE_DATE = {
    LESS_THAN: 'Less than',
    GREATER_THAN: 'Greater than'
}

export const PREDICATE_DATE_INTERVAL_TYPE = {
    DAYS: 'Days',
    MONTHS: 'Months'
}

export const PREDICATE_FILTER_TYPE = {
    ALL: Op.and,
    ANY: Op.or
}