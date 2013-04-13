'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'

    };

    yeomanConfig.herokuConfig = {
        appName: 'calmme',
        herokuMain: 'heroku',
        herokuDist: 'heroku/app/'
    };

    yeomanConfig.vpsConfig = {
        appName: 'friend-shuffler',
        gitUrl: 'git@git.jainlabs.com:friendshuffler.jainlabs.com.git',
        vpsMain: 'vps/',
        vpsDist: 'vps/'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', 'test/.tmp', '<%= yeoman.dist %>', '<%= yeoman.herokuConfig.herokuMain %>', '<%= yeoman.vpsConfig.vpsMain %>'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '**/*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js',
                    preserve_dirs: true
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '**/*.coffee',
                    dest: 'test/.tmp',
                    ext: '.js',
                    preserve_dirs: true
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/main.js': [
                        '<%= yeoman.app %>/scripts/{,*/}*.js',
                        '.tmp/scripts/{,*/}*.js'
                    ],
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}'
                    ]
                }]
            },
            deployheroku: {
                files: [{
                    expand: true,
                    dot: true,
                    src: '**/*',
                    cwd: 'dist/',
                    dest: '<%= yeoman.herokuConfig.herokuDist %>',
                    filter: 'isFile'
                }]
            },
            deployvps: {
                files: [{
                    expand: true,
                    dot: true,
                    src: '**/*',
                    cwd: 'dist/',
                    dest: '<%= yeoman.vpsConfig.vpsDist %>',
                    filter: 'isFile'
                }]
            }
        },
        shell: {
            pushheroku: {
                command: 'cd <%= yeoman.herokuConfig.herokuMain %> && git add -A && git commit -m "' + Date.now() + '" && git push heroku master --force',
                options: {
                    stdout: true
                }
            },
            initheroku: {
                command: 'rm -rf <%= yeoman.herokuConfig.herokuMain %> && git clone git://github.com/JainLabs/heroku-yeoman-buildpack.git <%= yeoman.herokuConfig.herokuMain %> && mkdir -p <%= yeoman.herokuConfig.herokuDist %> && cd <%= yeoman.herokuConfig.herokuMain %> && git remote add heroku git@heroku.com:<%= yeoman.herokuConfig.appName %>.git && git remote rm origin && cd ..',
                options: {
                    stdout: true
                }
            },
            pushvps: {
                command: 'cd <%= yeoman.vpsConfig.vpsMain %> && git add -A && git commit -m "' + Date.now() + '" && git push vps master --force',
                options: {
                    stdout: true
                }
            },
            initvps: {
                command: 'rm -rf <%= yeoman.vpsConfig.vpsMain %> && mkdir -p <%= yeoman.vpsConfig.vpsDist %> && cd <%= yeoman.vpsConfig.vpsMain %> && git init && git remote add vps <%= yeoman.vpsConfig.gitUrl %> && cd ..',
                options: {
                    stdout: true
                }
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
                'clean:server',
                'coffee:dist',
                'compass:server',
                'livereload-start',
                'connect:livereload',
                'open',
                'watch'
            ]);
    });

    grunt.registerTask('test', [
            'clean:server',
            'coffee',
            'compass',
            'connect:test',
            'mocha'
        ]);

    grunt.registerTask('build', [
            'clean:dist',
            'coffee',
            'compass:dist',
            'useminPrepare',
            'imagemin',
            'htmlmin',
            'concat',
            'cssmin',
            'uglify',
            'copy:dist',
            'usemin'
        ]);

    grunt.registerTask('deploy:heroku', [
            'build',
            'shell:initheroku',
            'copy:deployheroku',
            'shell:pushheroku'
        ]);

    grunt.registerTask('deploy:vps', [
            'build',
            'shell:initvps',
            'copy:deployvps',
            'shell:pushvps'
        ]);

    grunt.registerTask('deploy', [
            'clean',
            'jshint',
            'test',
            'build',
            'shell:initheroku',
            'copy:deployheroku',
            'shell:pushheroku',
            'shell:initvps',
            'copy:deployvps',
            'shell:pushvps'
        ]);

    grunt.registerTask('default', [
            'coffee', // hack to get coffeescript files to be linted
            'jshint',
            'test',
            'build'
        ]);
};