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
var del = require('del');
var data = require('gulp-data');
var hash = require('gulp-hash');
var references = require('gulp-hash-references');
var imageMin = require('gulp-imagemin');
var changed = require('gulp-changed');
var flatten = require('gulp-flatten');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

    styles: {
        src: 'src/index.scss',
        dest: 'dist',
        watch: 'src/**/*.scss',
        compiled: 'dist/*.css'
    },

    scripts: {
        watch: 'src/**/*.{ts,tsx}',
        compiled: 'dist/*.js',
        vendor: [
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js',
            'node_modules/mobx/lib/mobx.umd.js',
        ],
        vendorBundle: 'vendor.js',
        dest:  'dist'
    },

    assets: {
        main: 'dist/.{html,css,js}',
        styles: '.',
        scripts: '.',
    },
};

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

gulp.task('compile-styles', function () {
    var sassOptions = {
        outputStyle: DEBUG ? 'expanded' : 'compressed',
        functions: sassFunctions(),
    };

    return gulp.src(paths.styles.src)
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
            .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('set-styles-hash', function () {
    return gulp.src(paths.styles.compiled)
            .pipe(hash())
            .pipe(gulp.dest(paths.jade.dest))
            .pipe(hash.manifest('hashStylesManifest.json'))
            .pipe(references(gulp.src(paths.jade.compiled)))
            .pipe(gulp.dest(paths.styles.dest))
    del(['dist/index.css']);
})

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

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-scripts', function() {
    var tsResult = tsProject.src()
            .pipe(gulpIf(DEBUG, sourceMap.init()))
            .pipe(tsProject())

    return tsResult.js
            .pipe(gulpIf(PROD, uglify()))
            .pipe(gulpIf(DEBUG, sourceMap.write()))
            .pipe(gulp.dest('dist'));
});

gulp.task('build-vendor-scripts', function () {
    return gulp.src(paths.scripts.vendor)
            .pipe(concat(paths.scripts.vendorBundle))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('set-scripts-hash', function () {
    return gulp.src(paths.scripts.compiled)
            .pipe(hash())
            .pipe(gulp.dest(paths.jade.dest))
            .pipe(hash.manifest('hashScriptsManifest.json'))
            .pipe(references(gulp.src(paths.jade.compiled)))
            .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('clean', function () {
    return del([paths.styles.dest]);
});

gulp.task('clean-non-hashed', function () {
    return del(['dist/index.js', 'dist/vendor.js', 'dist/index.css'])
})

gulp.task('watch', function () {
    gulp.watch(paths.images.watch, gulp.series('serve-compress-images'));
    gulp.watch(paths.styles.watch, gulp.series('compile-styles'));
    gulp.watch(paths.scripts.watch, gulp.series('build-scripts'));
    gulp.watch(paths.jade.watch, gulp.series('build-layouts'));

    liveReload.listen();

    gulp
            .watch(
                    [
                        paths.images.compiled,
                        paths.fonts.compiled,
                        paths.styles.compiled,
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
                    gulp.parallel('serve-compress-images', 'serve-fonts', 'compile-styles', 'build-vendor-scripts', 'build-scripts'),
                    'build-layouts'
            )
    );
} else {
    gulp.task('build',
            gulp.series(
                    'clean',
                    gulp.parallel('serve-compress-images', 'serve-fonts', 'compile-styles', 'build-vendor-scripts', 'build-scripts'),
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