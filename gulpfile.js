const file = require('gulp-file-include');
const tidy = require('gulp-html-beautify');
const sync = require('browser-sync').create();
const { src, dest, watch, series, task } = require('gulp');

const assets = () => {
	return src(['src/assets/**']).pipe(dest('dist/assets'));
};

const html = () => {
	return src('src/html/*.html').pipe(file({
			prefix: '@@',
			basepath: '@file',
		}))
		.pipe(dest('dist'));
};

const beauty = () => {
	return src('./dist/*.html')
		.pipe(tidy({
			indent_size: 4,
		}))
		.pipe(dest('./dist'));
};

task('build', async function () {
	html();
	beauty();
	assets();
});

task('watch', function () {

	sync.init({
		server: {
			baseDir: './dist/',
		},
	});

	watch(['src/html/**/*', 'src/assets/**'], series(html, beauty, assets))
		.on('change', sync.reload);
});
