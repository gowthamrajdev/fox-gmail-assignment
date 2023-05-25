import {google} from 'googleapis';
import fetch from 'node-fetch';

async function getAllGmails(oAuth2Client, res) {
    try {
      const gmail = new google.gmail({version: 'v1', auth: oAuth2Client});
      gmail.users.messages.list({userId: 'me', maxResults:5}, (err, result) => {
        if (err) return {error: err} 
        else {
          result.data.messages.map(m => {
              fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}`,
              {
                method: 'GET',
                headers: {Authorization: `Bearer ${oAuth2Client.credentials.access_token}`}
              }).then(data => data.json())
                .then(mainData => {
                  console.log('----mainData--->', mainData)
                })
          });
        }
      });
      return {messages: 'gmail data synced'}
    }
    catch {
      return {messages: 'gmail data synced failed'}
    }
    

    
}

export {
    getAllGmails
}