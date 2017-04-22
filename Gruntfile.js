module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: ['src-js/010-main.js', 'src-js/020-images.js'],
        dest: 'public/js/main.js'
      }
    },
    watch: {
      js: {
        files: ['src-js/*.js'],
        tasks: ['concat']
      },
      minjs: {
        files: ['public/js/main.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass-css']
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/main.min.js': ['public/js/main.js']
        }
      }
    }
  })

  grunt.registerTask('sass-css', function () {
    'sass sass/000-main.scss:public/css/main.css'
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['concat', 'watch'])
}
