/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },

        copy: {
            main: {
                files: [{
                    //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/jquery/dist',
                    src: ['jquery.min.js','jquery.min.map'],
                    dest: 'public/js'
                },{
                    //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'public'
                },{
                    //for weather fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/weather-icons',
                    src: ['font/*.*'],
                    dest: 'public'
                },{
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'public'
                },
                {
                    //for Images
                    expand: true,
                    dot: true,
                    cwd: 'angular-app/images',
                    src: ['*.*','background/*','logo/*'],
                    dest: 'public/images'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    'public/js/app.js': [ 'public/js/app.js' ]
                },
                options: {
                    mangle: false,
                    preserveComments: 'some'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/css/main.css': [
                        'bower_components/fontawesome/css/font-awesome.min.css',
                        'bower_components/weather-icons/css/weather-icons.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                        'bower_components/chartist/dist/chartist.min.css',
                        'angular-app/styles/main.css'
                    ]
                }
            },
            add_banner: {
                options: {
                    banner: '/* My minified admin css file */'
                },
                files: {
                    'public/css/main.css': ['public/css/main.css']
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'angular-app/app/views/*.html','angular-app/app/views/charts/*.html','angular-app/app/views/forms/*.html','angular-app/app/views/mail/*.html','angular-app/app/views/maps/*.html','angular-app/app/views/pages/*.html','angular-app/app/views/tables/*.html','angular-app/app/views/tables/*.html','angular-app/app/views/tasks/*.html','angular-app/app/views/ui_elements/*.html' ],
                dest: 'tmp/views.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'angular-app/scripts/gmap.js',
                    'bower_components/slimScroll/jquery.slimscroll.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/raphael/raphael-min.js',
                    'bower_components/morrisjs/morris.min.js',
                    'bower_components/flot/jquery.flot.js',
                    'bower_components/flot/jquery.flot.canvas.js',
                    'bower_components/flot/jquery.flot.categories.js',
                    'bower_components/flot/jquery.flot.crosshair.js',
                    'bower_components/flot/jquery.flot.image.js',
                    'bower_components/flot/jquery.flot.navigate.js',
                    'bower_components/flot/jquery.flot.time.js',
                    'bower_components/flot/jquery.flot.pie.js',
                    'bower_components/flot/jquery.flot.resize.js',
                    'bower_components/flot/jquery.flot.selection.js',
                    'bower_components/flot/jquery.flot.stack.js',
                    'bower_components/chartjs/Chart.min.js',
                    'bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
                    'bower_components/easypie/dist/angular.easypiechart.min.js',
                    'bower_components/angular-wizard/dist/angular-wizard.js',
                    'bower_components/rangy/rangy-core.min.js',
                    'bower_components/rangy/rangy-selectionsaverestore.min.js',
                    'bower_components/textAngular/dist/textAngular.min.js',
                    'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
                    'bower_components/jqvmap/jqvmap/jquery.vmap.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'angular-app/scripts/other_charts.js',
                    'angular-app/scripts/extras.js',
                    'bower_components/chartist/dist/chartist.js',
                    'bower_components/angular-chartist.js/dist/angular-chartist.min.js',
                    'angular-app/app/*.js' ],
                dest: 'public/js/app.js'
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'angular-app/app/*.js', 'angular-app/app/**/*.js' ]
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'angular-app/app/*.js', 'angular-app/styles/*.scss' ],
                tasks: [ 'jshint','html2js:dist','copy:main', 'concat:dist', 'clean:temp', 'sass', 'cssmin' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'angular-app/app/*.js', 'angular-app/styles/*.scss' ],
                tasks: [ 'jshint','html2js:dist','copy:main', 'concat:dist', 'clean:temp', 'uglify:dist','cssmin' ],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'index.html' ],
                    dest: '/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }]
            }
        },
		 
		sass: {
            dist: {
                files: {
                    'angular-app/styles/main.css': 'angular-app/styles/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', [ 'bower', 'watch:dev' ]);
    grunt.registerTask('minified', [ 'bower', 'watch:min' ]);
};