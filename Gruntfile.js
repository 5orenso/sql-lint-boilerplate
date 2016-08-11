module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        sqllint: {
            files: ['./test/*.sql'],
            tasks: ['shell:sqlint', 'shell:pgsanity']
        },
        watch: {
            files: ['./test/*.sql'],
            tasks: ['shell:sqlint', 'shell:pgsanity'],
            // options: { spawn: false }
        },
        shell: {
            options: {
                stdout: true,
            },
            pgsanity: {
                options: {
                    stdout: true,
                },
                command: '/usr/local/bin/pgsanity <%= sqllint.files %>'
            },
            sqlint: {
                command: '/usr/local/bin/sqlint <%= sqllint.files %>'
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' might have ' + action);
        grunt.config('sqllint.files', filepath);
    });

    // Loading task plugins.
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-then');

    // Registering my tasks.
    grunt.registerTask('sql', ['shell:pgsanity', 'shell:sqlint']);
    grunt.registerTask('default', ['sql']);
};