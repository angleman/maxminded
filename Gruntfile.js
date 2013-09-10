module.exports = function(grunt){

grunt.initConfig({
  license: {
    options: {
    	output: 'LICENSES'
    },
    your_target: {
    	output: 'LICENSES2'
    },
  },
})

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-license');

};