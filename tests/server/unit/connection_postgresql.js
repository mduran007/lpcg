let path = require("path")
let connection_postgresqlModulePath = path.resolve(__dirname + "../../../../src/server/persistence/connection_postgresql.js");
let { conn } = require(connection_postgresqlModulePath);

const { assert } = intern.getPlugin('chai');
const { registerSuite } = intern.getPlugin('interface.object');


registerSuite('connection_postgresql.js', {

    'test if connection is not null'() {
        assert.isNotNull(conn);
    },

    'test ping connection'(){
        conn.query('SELECT NOW() AS "theTime"', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].theTime);
            // >> output: 2018-08-23T14:02:57.117Z
            //client.end(); not close connection becaouse end of the test it will ocurr automatically
        });
    }
});
