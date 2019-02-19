/*jslint es6:true*/
var path = require("path");
var webapp = require("./server/server.js").webapp;
var persistence = require("./server/persist_in_elephantsql.js").persistence;

//cria banco de dados
//caso o banco ja exista, nao faz nada
persistence.createDatabase();

webapp.post('/login', function (req, res) {
    'use strict';
    res.status(200);
    res.redirect("/");
});

//so o responsavel escolhe um papel
webapp.get('/escolhepapel', function (req, res) {
    'use strict';
    res.sendFile(path.resolve(__dirname + '/client/views/escolhepapel.html'));
});

webapp.get('/paginadoaluno', function (req, res) {
    'use strict';
    res.sendFile(path.resolve(__dirname + '/client/views/aluno.html'));
});

webapp.get('/paginadoresponsavel', function (req, res) {
    'use strict';
    res.sendFile(path.resolve(__dirname + '/client/views/responsavel.html'));
});

webapp.get('/responsavelchamada', function (req, res) {
    'use strict';
    res.sendFile(path.resolve(__dirname + '/client/views/responsavelchamada.html'));
});




