import {google} from 'googleapis';
import { createOrUpdateMail } from './fox-mail-sync';
import moment from 'moment';
import { DATE_FORMAT } from '../util';

export const GMAIL_API_VERSION = 'v1';
export const USER_ID = 'me';
export const MAX_RESULT_COUNT = 5;

async function getGmailsDataAndSync(oAuth2Client) {
  console.log('--main oauth---', oAuth2Client);
  const gmail = new google.gmail({version: GMAIL_API_VERSION, auth: oAuth2Client});
  return gmail.users.messages.list({userId: USER_ID, maxResults: MAX_RESULT_COUNT})
          .then(async res=> {
            return await getMailsById(gmail, res.data.messages);
  })
}

function getMailsById(gmail, messages) {
  const allGmails = messages.map(message => {
    return gmail.users.messages.get({userId: USER_ID, id: message.id})
            .then(async res => {
                const mailDetails = getProperMailDetails(res.data);
                return  createOrUpdateMail(mailDetails)                          
            });
  });
  return Promise.all(allGmails)
}

function getProperMailDetails(message) {
  const { headers } = message.payload;
 return {
    messageId: message.id,
    from: headers.find(m => m.name === 'From')?.value || '',
    to: headers.find(m => m.name === 'To')?.value || '',
    subject: headers.find(m => m.name === 'Subject')?.value || '',
    dateReceived: moment(headers.find(m => m.name === 'Date')?.value).format(DATE_FORMAT)  || '',
    body: message.snippet
 } 
}


export {
  getGmailsDataAndSync
}