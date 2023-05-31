import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mailRulesRouter from './routes/mail-rules';
import passport from 'passport';
import session from 'express-session';

require('../initializers/passport-auth');

const app = express();

app.use(session({ secret: 'MYSECRET',saveUninitialized: false, resave: false, cookie: {secure: false} })); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use(function(req, res, next) {
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mail-rules', mailRulesRouter);


export default app;