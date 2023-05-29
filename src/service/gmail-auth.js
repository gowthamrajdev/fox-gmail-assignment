import {google} from 'googleapis';
import { createOrUpdateMail } from './fox-mail-sync';

const GMAIL_API_VERSION = 'v1';
const USER_ID = 'me';
const MAX_RESULT_COUNT = 10;

async function getGmailsDataAndSync(oAuth2Client) {
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
    dateReceived: headers.find(m => m.name === 'Date')?.value || '',
    body: message.snippet
 } 
}


export {
  getGmailsDataAndSync
}