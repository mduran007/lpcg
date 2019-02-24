let path = require("path")
let connection_postgresqlModulePath = path.resolve(__dirname + "../../../../src/server/persistence/connection_postgresql.js");
let { conn } = require(connection_postgresqlModulePath);

const { assert } = intern.getPlugin('chai');
const { registerSuite } = intern.getPlugin('interface.object');

registerSuite('connection_postgresql.js', {

    'test if connection is not null or is defined'() {
        //assert.ifEmpty(conn, 'conexao com banco retornou erro');
        //assert.isNotNull(conn, 'conexao com o banco nao he nula');
    },

    'test if SELECT NOW() AS theTime returns a date'(){
        let d = null;
        conn.query('SELECT NOW() AS "theTime"', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            d = result.rows[0].theTime;
        });
        // to fix: Test if what was returned was a date
        //assert.doesNotThrow(new Date(d))
    }
});
