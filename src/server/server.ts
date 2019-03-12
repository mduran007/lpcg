import { v4 as uuid } from 'uuid';
import express from 'express';
import session from 'express-session';

import * as connectPgSimple from 'connect-pg-simple';
let pgSession = connectPgSimple.default(session);

let envDATABASE_URL = process.env.DATABASE_URL;


import bodyParser from 'body-parser';
import path from "path";

//import expressValidator from 'express-validator';

const id: string = uuid();
const expressApp: express.Application = express();

// client_public is generated by copy grunt task
expressApp.use(express.static(path.join('client_public')));
expressApp.set('view engine', 'ejs');
expressApp.set('views', path.join(__dirname, './../../src/client/views')) // . dir is the typescript_dist dir

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));



//With elephant sql there are just 5 connections simultaneusly for free
//We will use connection pool
//let pgClients: ArrayL


//expressApp.use(compression());
//expressApp.use(expressValidator());


//https://expressjs.com/en/resources/middleware/session.html
let pgStoreOptions = {
    conString: process.env.DATABASE_URL
    //schemaName: "lpcg",
    //tableName: "session"
}
let pgStore = new pgSession(pgStoreOptions);


let sessionOptions = {
    //genid: (req: Request) => {
    //    console.log("expressApp.use(session({... genid: (req: Request) => {...");
    //    let id: string = uuid();
    //    console.log(id);
    //    return id;
    //},
    store: pgStore,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    secret: 'keyboard cat',
    cookie: { secure: false }
}

if (process.env.NODE_ENV === 'production') {
    expressApp.set('trust proxy', 1); // trust first proxy
    sessionOptions.cookie.secure = true; // serve secure cookies
}

expressApp.use(session(sessionOptions));



//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());
//app.use(lusca.xframe("SAMEORIGIN"));


import { LoginController } from './Controllers/LoginController';
//expressApp.use("/", LoginController);

export const ExpressWebApp: express.Application = expressApp;

