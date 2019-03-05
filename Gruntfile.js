module.exports = function(grunt) {

    //Project configuration.
    //https://gruntjs.com/configuring-tasks
    //https://gruntjs.com/getting-started
    //require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            options: {
 	        //Shared Options Hash
            },
            dev: {
                NODE_ENV : 'development',
                PORT:4000,
                DB_HOST:"localhost",
                DB_PORT:5432,
                DB_DBNAME:"lpcg"
            },
            prod: {
                NODE_ENV : 'production',
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
                cmd: './node_modules/typescript/bin/tsc --build'
            },
            runapp: {
                cmd: 'node typescript_dist/main.js'
            },
            setupDevLocal: {
                cmd: 'source env/DevLocal_EnvVarsSetup.sh'
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
                    {expand: true,
                     cwd: 'client_dist',
                     src: ['*min*.js'],
                     dest: 'client_public',
                     filter: 'isFile'},
                    {expand: true,
                     cwd:'src/client/views/',
                     src: ['css/**'],
                     dest: 'client_public'}                    
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
		suites: [ 'tests/unit/*.js', 'tests/integration/*.js' ],
		reporters: [ 'runner' ]
	    },
	    node: {
		options: {}
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
    
    grunt.registerTask('BuildMessage', 'Building project...', function() {
        grunt.log.write('Build sucessfully...').ok();
    });

    // Loading using a local git copy
    grunt.loadNpmTasks('intern');
    
    // Register a test task
    grunt.registerTask('test', ['intern:node']);
    
    // Register a task for webdriver tests
    grunt.registerTask('test:browser', ['intern:browser']);    

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'BuildMessage' ]);
    
    grunt.registerTask('dev', ['env:dev','clean','exec:tsc' , 'watch']);
    grunt.registerTask('runAppInDevEnv',  ['env:dev','clean','concat','copy','exec:tsc','exec:runapp']);
    grunt.registerTask('runAppInProdEnv', ['env:prod','clean','concat','copy','exec:tsc','exec:runapp']);
    
    grunt.registerTask('build', ['env:build', 'lint', 'other:build:tasks']);    
}
