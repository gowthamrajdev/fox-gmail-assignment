import {google} from 'googleapis';
import { GMAIL_API_VERSION, USER_ID } from './gmail-auth';
import OAuth2Data from '../../initializers/google-credentials.json';
import {ACTION_KEYS_WORDS, ACTION_TYPE} from '../service/rules-constant/actions-conditions';

function getOAuthClient() {
    const CLIENT_ID = OAuth2Data.client.id;
    const CLIENT_SECRET = OAuth2Data.client.secret;
    const REDIRECT_URL = OAuth2Data.client.redirect

    return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
}

function performAction(filteredMails, actionConfig, token) {
    const ids = filteredMails.map(m => m.messageId);
    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials(token);
    const gmail = new google.gmail({version: GMAIL_API_VERSION, auth: oAuth2Client});
    const reqBody = getRequestBobyByConfig(actionConfig, ids);
    return gmail.users.messages.batchModify(reqBody)
          .then(async res=> {
            return {data: 'Data updated in google gmail'};
  })
}

function getRequestBobyByConfig(actionConfig, ids) {
    return {
        userId: USER_ID, 
        ids,  
        addLabelIds: actionConfig.filter(action => action.field === ACTION_TYPE.ADD).map(a => ACTION_KEYS_WORDS[a.value]),
        removeLabelIds: actionConfig.filter(action => action.field === ACTION_TYPE.REMOVE).map(a => ACTION_KEYS_WORDS[a.value])
    };
}

export {
    performAction
}