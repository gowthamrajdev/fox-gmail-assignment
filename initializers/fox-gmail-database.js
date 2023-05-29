const Sequelize = require('sequelize');
import changeCase from 'change-case';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let foxGmailDataBase = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres'
});


foxGmailDataBase.addHook('beforeDefine', (attributes) => {
    Object.keys(attributes).forEach((key) => {
        attributes[key].field = changeCase.snakeCase(key);
    });
});

export default foxGmailDataBase;
