import OAuth2Data from '../initializers/google-credentials.json';
import { google } from 'googleapis';

export const DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';
export const GMAIL_API_VERSION = 'v1';
export const USER_ID = 'me';
export const MAX_RESULT_COUNT = 5;

export function isLoggedIn(req, res, next) {
    req.session.oAuth2Client ? next() : res.sendStatus(401);
}


export function getOAuthClient() {
    const CLIENT_ID = OAuth2Data.client.id;
    const CLIENT_SECRET = OAuth2Data.client.secret;
    const REDIRECT_URL = OAuth2Data.client.redirect

    return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
}