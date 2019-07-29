const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-merge-media-queries'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    minifycss = require('gulp-clean-css'),
    wait = require('gulp-wait');

/* paths */
let path = {
    css: {
        // sciezka dla gulp watch
        dev: [
            '../src/scss/**/*.scss',
        ],
        // sciezka buildu
        prod: '../src/',
    }
};

// tutaj dodajemy core-owe pliki SCSS z importami
let scssFileNames = [
    'index'
];


let onError = (err) => {
    console.log(err);
};

function css(done) {
    scssFileNames.forEach((name) => {
        coreScss(name);
    });
    done();
    notify("CSS-y ogarnięte!").write('');
}

function cssProd(done) {
    scssFileNames.forEach((name) => {
        cssMin(name);
    });
    done();
    notify("MINIFIKACJA CSS - ogarnięte!").write('');
}

function coreScss(name) {
    return gulp.src('../src/scss/' + name + '.scss')
        .pipe(plumber({
            handleError: onError
        }))
        .pipe(wait(500))
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: "cover 100%"
        }))
        .pipe(cmq())
        .pipe(concat(name + '.css'))
        .pipe(gulp.dest(path.css.prod))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest(path.css.prod))
    //.pipe(notify('CSS [' + name + '.css] ... done!'));
}

function cssMin(name) {
    coreScss(name)
        .pipe(gulp.dest(path.css.prod))
        .pipe(minifycss())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest(path.css.prod))
    //.pipe(notify('CSS - minify - [' + name + '.min.css] ... done!'));
}


gulp.task('default', gulp.parallel(css), done => {
    done()
});

gulp.task('prod', gulp.parallel(cssProd), done => {
    done();
});

gulp.task('watch', done => {
    gulp.watch(path.css.dev, gulp.series(css));
    done();
});

gulp.task('test', done => {
    console.log(`
      ____       _         _  _    ___  
     / ___|_   _| |_ __   | || |  / _ \\ 
    | |  _| | | | | '_ \\  | || |_| | | |
    | |_| | |_| | | |_) | |__   _| |_| |
     \\____|\\__,_|_| .__/     |_|(_)___/ 
                  |_|                             
    `);
    done();
});