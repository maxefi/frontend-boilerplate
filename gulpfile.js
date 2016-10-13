'use strict';

var env = require('./build-env');
// noinspection ES6ModulesDependencies
env.init(process.env.NODE_ENV);

var DEBUG = env.isDebugEnabled();
var PROD = env.isProdEnv();
var WATCH = env.isWatchEnabled();

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var liveReload = require('gulp-livereload');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var sourceMap = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack');
var notifier = require('node-notifier');
var gulpLog = require('gulplog');
var del = require('del');
var data = require('gulp-data');
var hash = require('gulp-hash');
var references = require('gulp-hash-references');
var imageMin = require('gulp-imagemin');
var changed = require('gulp-changed');
var flatten = require('gulp-flatten');

var clientWebpackConfig = require('./webpack.config.js');

var paths = {
    images: {
        src: 'src/components/App/**/*.{jpg,jpeg,png,gif,svg}',
        dest: 'dist/images',
        watch: 'src/components/App/**/*.{jpg,jpeg,png,gif,svg}',
        compiled: 'dist/images/**/*.{jpg,jpeg,png,gif,svg}',
    },

    fonts: {
        src: 'src/fonts/*.{woff,woff2}',
        dest: 'dist/fonts',
        watch: 'src/fonts/**/*.{woff,woff2}',
        compiled: 'dist/fonts/**/*.{woff,woff2}',
    },

    jade: {
        src: 'src/layout/**/*.jade',
        dest: 'dist',
        watch: 'src/layout/**/*.jade',
        compiled: 'dist/*.html'
    },

    scss: {
        src: 'src/index.scss',
        dest: 'dist',
        watch: 'src/**/*.scss',
        compiled: 'dist/*.css'
    },

    scripts: {
        watch: 'src/**/*.{ts,tsx}',
        compiled: 'dist/*.js'
    },

    assets: {
        main: 'dist/.{html,css,js}',
        styles: '.',
        scripts: '.',
    }
};

function sassFunctions(options) {
    options = options || {};
    options.base = options.base || process.cwd();

    var fs = require('fs');
    var path = require('path');
    var types = require('node-sass').types;

    var funcs = {};

    funcs['inline-image($file)'] = function (file, done) {
        var file = path.resolve(options.base, file.getValue());
        var ext = file.split('.').pop();
        ;
        fs.readFile(file, function (err, data) {
            if (err) {
                return done(err);
            }
            data = new Buffer(data);
            data = data.toString('base64');
            data = 'url(data:image/' + ext + ';base64,' + data + ')';
            data = types.String(data);
            done(data);
        });
    };

    return funcs;
}

function handleError(error, title) {
    notifier.notify({
        title: title,
        message: error
    });

    gulpLog.error(error);
}

function runWebpack(config, callback) {
    webpack(config, function (error, stats) {
        // no hard error, try to get a soft error from stats
        if (!error) {
            error = stats.toJson().errors[0];
        }

        if (error) {
            handleError(error, 'Build scripts');
        } else {
            gulpLog.info(stats.toString({
                colors: true,
                chunkModules: false,
            }));
        }

        // task never errs in watch mode, it waits and recompiles
        if (!config.watch && error) {
            callback(error);
        } else {
            callback();
        }
    });
}

gulp.task('serve-compress-images', function () {
    return gulp.src(paths.images.src)
            .pipe(plumber())
            .pipe(changed(paths.images.src))
            .pipe(imageMin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(flatten())
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.images.dest));
});

gulp.task('serve-fonts', function () {
    return gulp.src(paths.fonts.src)
            .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('compile-styles', function () {
    var sassOptions = {
        outputStyle: DEBUG ? 'expanded' : 'compressed',
        functions: sassFunctions(),
    };

    return gulp.src(paths.scss.src)
            .pipe(plumber())
            .pipe(data(function () {
                return {
                    imagesPath: paths.assets.scripts,
                    fontsPath: paths.assets.styles,
                };
            }))
            .pipe(gulpIf(DEBUG, sourceMap.init()))
            .pipe(sass(sassOptions).on('error', sass.logError), sass(sassOptions))
            .pipe(gulpIf(PROD, csso({
                restructure: true,
                sourceMap: false,
                debug: true
            })))
            .pipe(autoprefixer({
                browsers: ['> 1%']
            }))
            .pipe(gulpIf(DEBUG, sourceMap.write()))
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('build-layouts', function () {
    return gulp.src(paths.jade.src)
            .pipe(plumber())
            .pipe(data(function () {
                return {
                    scriptPath: paths.assets.scripts,
                    stylePath: paths.assets.styles,
                };
            }))
            .pipe(jade({
                pretty: '\t',
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.jade.dest));
});

gulp.task('set-styles-hash', function () {
    return gulp.src(paths.scss.compiled)
            .pipe(hash())
            .pipe(gulp.dest(paths.jade.dest))
            .pipe(hash.manifest('hashManifest.json'))
            .pipe(references(gulp.src(paths.jade.compiled)))
            .pipe(gulp.dest(paths.jade.dest))
    del(['dist/index.css']);
})

gulp.task('set-scripts-hash', function () {
    return gulp.src(paths.scripts.compiled)
            .pipe(hash())
            .pipe(gulp.dest(paths.jade.dest))
            .pipe(hash.manifest('hashManifest.json'))
            .pipe(references(gulp.src(paths.jade.compiled)))
            .pipe(gulp.dest(paths.jade.dest))
})

gulp.task('build-client-app', function (callback) {
    runWebpack(clientWebpackConfig, callback);
});

gulp.task('clean', function () {
    return del([paths.scss.dest]);
});

gulp.task('clean-non-hashed', function () {
    return del(['dist/bundle.js', 'dist/bundle.js.map', 'dist/index.css'])
})

gulp.task('watch', function () {
    gulp.watch(paths.images.watch, gulp.series('serve-compress-images'));
    gulp.watch(paths.scss.watch, gulp.series('compile-styles'));
    gulp.watch(paths.scripts.watch, gulp.series('build-client-app'));
    gulp.watch(paths.jade.watch, gulp.series('build-layouts'));

    liveReload.listen();

    gulp
            .watch(
                    [
                        paths.images.compiled,
                        paths.fonts.compiled,
                        paths.scss.compiled,
                        paths.jade.compiled,
                        paths.scripts.compiled,
                    ]
            )
            .on('change', liveReload.changed);
});

if (DEBUG) {
    gulp.task('build',
            gulp.series(
                    'clean',
                    gulp.parallel('serve-compress-images', 'serve-fonts', 'compile-styles', 'build-client-app'),
                    'build-layouts'
            )
    );
} else {
    gulp.task('build',
            gulp.series(
                    'clean',
                    gulp.parallel('serve-compress-images', 'serve-fonts', 'compile-styles', 'build-client-app'),
                    'build-layouts',
                    gulp.parallel('set-styles-hash', 'set-scripts-hash'),
                    'clean-non-hashed'
            )
    );
}

if (WATCH) {
    gulp.task('default', gulp.series('build', gulp.parallel('watch')));
} else {
    gulp.task('default', gulp.series('build'));
}