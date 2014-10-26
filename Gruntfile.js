function configureGrunt(grunt) {
  require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    express: {
      test: {
        options: {
          script: 'local_server/server.js',
          output: 'Express server listening on port 3000'
        }
      }
    },

    mochacli: {
      all: {
        options: { files: ['test/for_all_tests.js', 'test/**/*_spec.js']}
      },
      remote: {
        options: { files: ['test/for_all_tests.js', 'test/remote_server/*_spec.js']}
      },
      local: {
        options: { files: ['test/for_all_tests.js', 'test/local_server/*_spec.js']}
      }
    }
  });

  grunt.registerTask('remote', 'test against remote servers', ['mochacli:remote']);
  grunt.registerTask('local', 'test with a local server', ['express:test', 'mochacli:local']);
  grunt.registerTask('default', 'TEST ALL THE THINGS with just one chromedriver instance',
      ['express:test', 'mochacli:all']
  )
}

// Export the configuration
module.exports = configureGrunt;
