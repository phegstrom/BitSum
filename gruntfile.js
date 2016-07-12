module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		watch: {
			react: {
                files: ['./public/react/**/*.jsx'],
                tasks: ['browserify:jsx']
            }
		},
        browserify: {
            options: {
                debug: true,
                transform: [['babelify']]
            },
            jsx: {
                src: ['./public/react/**/*.jsx'],
                dest: './public/js/react/bundle.js'
            }
        },		
		sass: {
			dist:{
				files: [{
					expand: true,
					cwd: 'public/sass',
					src: ['**/*.scss'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'public/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'public/css/',
					ext: '.min.css'
				}]
			}
		}				
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['watch']);

	// individual commands that can be executed from command line
	// type 'grunt <task alias name>'
	grunt.registerTask('react', ['browserify:jsx']);
	grunt.registerTask('dev', ['watch:react']);
	grunt.registerTask('sassBuild',['sass']);
	grunt.registerTask('minify',['cssmin']);
	grunt.registerTask('css', ['sass', 'cssmin']);
	grunt.registerTask('build', ['browserify', 'sass', 'cssmin']);

};