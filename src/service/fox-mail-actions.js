import {google} from 'googleapis';
import { GMAIL_API_VERSION, USER_ID } from './gmail-auth';
import OAuth2Data from '../../initializers/google-credentials.json';

function getOAuthClient() {
    const CLIENT_ID = OAuth2Data.client.id;
    const CLIENT_SECRET = OAuth2Data.client.secret;
    const REDIRECT_URL = OAuth2Data.client.redirect

    return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
}

function performAction(filteredMails, actionConfig, token) {
    console.log('--filteredMails---->', )
    const ids = filteredMails.map(m => m.messageId);
    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials(token);
    const gmail = new google.gmail({version: GMAIL_API_VERSION, auth: oAuth2Client});
    const reqBody = {userId: USER_ID, ids,  addLabelIds: ['UNREAD']};
    return gmail.users.messages.batchModify(reqBody)
          .then(async res=> {
            return {data: 'Data updated in google gmail'};
  })
}

export {
    performAction
}