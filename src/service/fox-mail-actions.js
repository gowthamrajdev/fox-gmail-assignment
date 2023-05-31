import {google} from 'googleapis';
import { GMAIL_API_VERSION, USER_ID } from './gmail-auth';
import {ACTION_KEYS_WORDS, ACTION_TYPE} from '../service/rules-constant/actions-conditions';
import { getOAuthClient } from '../util';


function performAction(filteredMails, actionConfig, oAuth2Client) {
    const ids = filteredMails.map(m => m.messageId);
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