//!  =======Gulp-call-function======================================================================================================================================
const gulp = require('gulp');
// ? Include-html
const fileInclude = require('gulp-file-include');
const htmlClean = require('gulp-htmlclean');
const webpHtml = require('gulp-webp-html');
// ? SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');
// ? Server and clean
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
// ? Map
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');
// ? Optimization
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const changed = require('gulp-changed');
//!  =====Webpack========================================================================================================================================
const webpack = require('webpack-stream');
//!  =======Сode-Optimization======================================================================================================================================
const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};
const serverOptions = {
	livereload: true,
	open: true,
};
const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};
//?  ==========Tasks===================================================================================================================================
gulp.task('clean:docs', function (done) {
	if (fs.existsSync('./docs/')) {
		return gulp.
			src('./docs/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

gulp.task('html:docs', function () {
	return gulp
		.src('./src/*.html')
		.pipe(changed('./docs/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(webpHtml())
		.pipe(htmlClean())
		.pipe(gulp.dest('./docs/'))
});

gulp.task('sass:docs', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./docs/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(webpCss())
		.pipe(groupMedia())
		.pipe(sass())
		.pipe(csso())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./docs/css/'))
});

gulp.task('images:docs', function () {
	return gulp
		.src('./src/assets/**/*')
		.pipe(changed('./docs/assets/'))
		.pipe(webp())
		.pipe(gulp.dest('./docs/assets/'))
		.pipe(gulp.src('./src/assests/**/*'))
		.pipe(changed('./docs/assests/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./docs/assets/'));
	// .pipe(imagemin([
	// 	imagemin.gifsicle({ interlaced: true }),
	// 	imagemin.mozjpeg({ quality: 75, progressive: true }),
	// 	imagemin.optipng({ optimizationLevel: 5 }),
	// 	imagemin.svgo({
	// 		plugins: [
	// 			{ removeViewBox: true },
	// 			{ cleanupIDs: false }
	// 		]
	// 	})
	// ]))
});

gulp.task('fonts:docs', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./docs/fonts/'))
		.pipe(gulp.dest('./docs/fonts/'))
});

gulp.task('files:docs', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./docs/files/'))
		.pipe(gulp.dest('./docs/files/'))
});

gulp.task('js:docs', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./docs/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('../webpack.config.js')))
		.pipe(gulp.dest('./docs/js/'))
});

gulp.task('server:docs', function () {
	return gulp.src('./docs/')
		.pipe(server(serverOptions))
});
//  =============================================================================================================================================
