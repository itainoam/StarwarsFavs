var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    wiredep = require('wiredep'),
    trackedDirectories = [
        'public/*.html',
        'public/!*.js',
        'public/controllers/!**',
        'public/directives/!**',
        'public/services/!**',
        'public/views/**'
    ];

gulp.task('less', function() {
    gulp.src(trackedDirectories)
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(trackedDirectories, ['less']);
});

//only after nodemon finishes will 'watch' start
gulp.task('server',['watch'], function () {
    nodemon({
        script: 'server.js'
    })
});

gulp.task('bower', function () {
    //without return gulp will not wait for the stream to return and will run the request not async
    return wiredep({
        src: 'public/index.html'
    });
});

//starts a node server with livereload
gulp.task('default', ['server']);



