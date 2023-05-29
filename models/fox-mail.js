import foxGmailDataBase from "../initializers/fox-gmail-database";
import Sequelize from 'sequelize';

const FoxMail = foxGmailDataBase.define('fox_mail', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    messageId: {type: Sequelize.STRING},
    mailSource: {type: Sequelize.STRING},
    mailContent: {type: Sequelize.JSONB},
    createdAt: {type: Sequelize.DATE},
    updatedAt: {type: Sequelize.DATE}
},{
    freezeTableName: true,
});

export default FoxMail;
