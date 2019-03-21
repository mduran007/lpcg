module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            options: {
                //Shared Options Hash
            },
            dev: {
                NODE_ENV: 'development',
                PORT: 4000,
                DB_HOST: "localhost",
                DB_PORT: 5432,
                DB_DBNAME: "lpcg"
            },
            prod: {
                NODE_ENV: 'production',
            }
        },
        exec: {
            eslint: {
                cmd: './node_modules/.bin/eslint src/main.js'
            },
            test: {
                cmd: './node_modules/.bin/intern env=devlocal'
            },
            tsc: {
                cmd: 'C:/Users/suellen.doy/Documents/github/lpcg/node_modules/.bin/tsc --build'
            },
            runapp: {
                cmd: 'node typescript_dist/main.js'
            },
            debugApp: {
                cmd: 'node --inspect typescript_dist/main.js'
            },
            setupDevLocal: {
                cmd: 'source env/DevLocal_EnvVarsSetup.sh'
            },
            dbSetup: {
                cmd: 'psql -U postgres'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            src_client_sources: {
                src: [
                    'src/client/**/*.js',
                    'src/**/*.js',
                    '!src/main.js'],
                dest: 'client_dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                ecma: 8
            },
            src_client_sources: {
                files: {
                    'client_dist/<%= pkg.name %>.min.js': ['<%= concat.src_client_sources.dest %>']
                }
            }
        },
        //https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'client_dist',
                        src: ['*min*.js'],
                        dest: 'client_public',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'src/client/views/',
                        src: ['css/**'],
                        dest: 'client_public'
                    }
                ]
            },
        },
        clean: {
            client_dist: ['client_dist/**'],
            client_public: ['client_public'],
            typescript_dist: ['typescript_dist/*']
            //contents: ['path/to/dir/*']
            //subfolders: ['path/to/dir/*/'],
            //css: ['path/to/dir/*.css'],
            //all_css: ['path/to/dir/**/*.css']
        },
        intern: {
            options: {
                //WARNING: excludeInstrumentation is deprecated, use coverage instead.
                //excludeInstrumentation: true,
                //require: 'app/Block.js',
                suites: ['tests/unit/*.js', 'tests/integration/*.js'],
                reporters: ['runner']
            },
            node: {
                options: {}
            }
        },
        pgdb: {
            copyTempDBToDev: {
                //https://www.npmjs.com/package/grunt-pg-db                
                options: {
                    //Type: string or object Default value: process.env.DATABASE_URL
                    //connection: using default
                    sql: [
                        'CREATE DATABASE lpcg_dev;',
                        'create table polos(id serial primary key, nome varchar(50) not null);',
                        'create table alunos( ' +
                        'id serial primary key,' +
                        '  nome varchar(100) not null,' +
                        '  dta_nasc date,' +
                        '  sexo varchar (10),' +
                        '  rg int,' +
                        '  escolaridade varchar(30),' +
                        '  cidade varchar(100),' +
                        '  estado varchar(10),' +
                        '  cep varchar(10),' +
                        '  endereco varchar(100),' +
                        '  bairro varchar(30),' +
                        '  celular varchar(13),' +
                        '  telefone varchar(13),' +
                        '  email varchar(50) not null,' +
                        '  profissao varchar(50),' +
                        '  ocupacao varchar(50),' +
                        '  local_trabalho varchar(100),' +
                        ' senha varchar(15) not null,' +
                        '   resp boolean not null,' +
                        '   fk_polo int not null,' +
                        '   foreign key (fk_polo) references polos(id)' +
                        '   );'
                    ]
                }
            }
        },
        watch: {
            files: ['src/**/*.ts'],
            tasks: ['exec:tsc']
        }
    });


    // Load the plugin that provides the "uglify" task.
    //https://davidburgos.blog/how-to-fix-grunt-contrib-uglify-for-es6/
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.loadNpmTasks('grunt-jslint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-env');
    //grunt.loadNpmTasks('grunt-pg-db');

    grunt.registerTask('BuildMessage', 'Building project...', function () {
        grunt.log.write('Build sucessfully...').ok();
    });

    // Loading using a local git copy
    grunt.loadNpmTasks('intern');

    // Register a test task
    grunt.registerTask('test', ['intern:node']);

    // Register a task for webdriver tests
    grunt.registerTask('test:browser', ['intern:browser']);

    grunt.registerTask('default', ['clean', 'concat', 'copy', 'BuildMessage']);

    grunt.registerTask('dev', ['env:dev', 'clean', 'exec:tsc', 'watch']);
    grunt.registerTask('runAppInDevEnv', ['env:dev', 'clean', 'concat', 'copy', 'exec:tsc', 'exec:runapp']);
    grunt.registerTask('runAppInProdEnv', ['env:prod', 'clean', 'concat', 'copy', 'exec:tsc', 'exec:runapp']);

    grunt.registerTask('build', ['env:build', 'lint', 'other:build:tasks']);
}
