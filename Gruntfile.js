module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		compass: {
			dist: {
				options: {
				sassDir: 'app/style/sass',
				cssDir: 'build/style',
				environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'app/style/sass',
					cssDir: 'app/style'
				}
			}
		},

		sass: {
		    dist: {
		        options: {
		            compass: true,
		        },
		        files: {
		            'app/style/app.css' : 'app/style/sass/bootstrap.scss'
		        }
		    }
		},

		concat: {
		    options: {
		        separator: ';',
		        stripBanners: true,
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },

		    dist: {
		        src: ['js/*.js'],
		        dest: 'js/main.min.js'
		    }
		},

		uglify: {
	        options: {
	            manage: false,
	            preserveComments: 'all' //preserve all comments on JS files
	        },
	        my_target:{
	            files: {
	                'js/main.min.js' : ['js/*.js']
	            }
	        }
	    },
		// task "cssmin"
	    cssmin: {
	        my_target: {
	            files: [{
	                expand: true,
	                cwd: 'build/style/',
	                src: ['*.css', '!*.min.css'],
	                dest: 'build/style/',
	                ext: '.min.css'
	            }]
	        }
	    },

		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						jobs: grunt.file.readJSON('data.json')
					}
				},
				files: {
					"build/index.html": "app/views/jobs.jade"
				}
			}
		},
		copy: {
			build: {
				cwd: 'app',
				src: [ 'js/*','style/*', '!**/*.jade' ],
				dest: 'build',
				expand: true
			}
		},

		watch: {
			grunt: { files: ['Gruntfile.js'] },
			jade: {
				files: ['app/views/**/*.jade', '*.json'],
				tasks: ['jade']
			},

			sass: {
				files: ['app/style/**/*.scss'],
				tasks: ['sass']
			},
		},
		connect: {
			server: {
				options: {
					port: 4000,
					base: 'build',
					hostname: '*'
				}
			}
		}
	});


	// Load the plugin that provides the "compass" task.
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin that provides the "sass" task.
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin that provides the "cssmin" task.
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task.
	grunt.registerTask('default',"Convert Jade templates into html templates", [ 'uglify', 'sass', 'jade', 'copy', 'watch']);
	grunt.registerTask('devel',"only for developement", ['sass', 'jade', 'watch']);
};
