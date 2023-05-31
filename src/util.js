export const DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';

export function isLoggedIn(req, res, next) {
    req.session.oAuth2Client ? next() : res.sendStatus(401);
}