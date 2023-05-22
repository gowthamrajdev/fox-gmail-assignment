import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import passport from 'passport';
import session from 'express-session';

require('../initializers/passport-auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: false })); 

// passport initialization
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use('/', indexRouter);
app.use('/users', usersRouter);


export default app;