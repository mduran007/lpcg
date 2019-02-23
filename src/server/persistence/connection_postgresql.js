/*jslint es6:true*/
let path = require("path");
let modulePathEnvironment = path.resolve(__dirname + "/../../../env/environments.js")
const env = require(modulePathEnvironment).env;

let connection = null;

let pg = require('pg');

let host = env.DB_HOST
let port = env.DB_PORT
let db = env.DB_USER
let user = env.DB_USER
let password = env.DB_PASSWORD

let conString = "postgres://"+user+":"+password+"@"+host+":"+port+"/"+db

let client = new pg.Client(conString);

client.connect( err => {

    if(err) {
        console.error(err);
        return null;
    }    

});

exports.conn = client;
 


