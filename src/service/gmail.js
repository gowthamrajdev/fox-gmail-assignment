import {google} from 'googleapis';

const GMAIL_API_VERSION = 'v1';
const USER_ID = 'me';
const MAX_RESULT_COUNT = 5;

async function getAllGmails(oAuth2Client) {
  const gmail = new google.gmail({version: GMAIL_API_VERSION, auth: oAuth2Client});
  return gmail.users.messages.list({userId: USER_ID, maxResults: MAX_RESULT_COUNT})
  .then(async res=> {
    return await getMailsById(gmail, res.data.messages);
  })
}

function getMailsById(gmail, messages) {
  const allGmailMessages = messages.map(message => {
    return gmail.users.messages.get({userId: USER_ID, id: message.id})
           .then(res => getProperGmailData(res.data))
  });
  return Promise.all(allGmailMessages)
}

function getProperGmailData(message) {
  const { headers } = message.payload;
 return {
    messageId: message.id,
    from: headers.find(m => m.name === 'From').value || '',
    to: headers.find(m => m.name === 'To').value || '',
    subject: headers.find(m => m.name === 'Subject').value || '',
    dateReceived: headers.find(m => m.name === 'Date').value || '',
    body: message.snippet
 } 
}

export {
    getAllGmails
}