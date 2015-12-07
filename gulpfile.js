var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('compile-jsx', function() {
	return gulp.src('./app/components/**/*.jsx')
				.pipe(react())
				.pipe(gulp.dest('dist'));
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['compile-jsx'], function() {
	gulp.watch(
		'./app/components/**/*.jsx',
		['compile-jsx']
	).on('change', reportChange);
});