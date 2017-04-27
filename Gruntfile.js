module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: ['src-js/*.js'],
        dest: 'public/js/main.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/main.min.js': ['public/js/main.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/main.css': 'sass/000-main.scss'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      js: {
        files: ['src-js/*.js'],
        tasks: ['concat']
      },
      minjs: {
        files: ['public/js/main.js'],
        tasks: ['uglify']
      },
      watchSass: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['concat', 'watch'])
}
