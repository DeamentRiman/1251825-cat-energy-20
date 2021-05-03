const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
const del = require("del");

//Clean

const clean = () => {
  return del("build");
}
exports.clean = clean;

//Copy
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff2, woff}",
    "source/img/**",
    "source/js/**",
    ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

//HTML
const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest("build"));
}
exports.html = html;

//JS

const scripts = () => {
  return gulp.src('source/js/nav-open.js')
  .pipe(terser())
  .pipe(rename("nav-open.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}
exports.scripts = scripts;

//Imagemin

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
    ]))
  .pipe(gulp.dest("source/img"))
}
exports.images = images;

//WebP
const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
}
exports.webp = createWebp;

//SVG-sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, scripts,  server, watcher
);

/*gulp.task('build', gulp.series(clean, copy, styles, html, scripts));*/
gulp.task('build', gulp.series(clean, copy, styles, html, sprite, images, createWebp, scripts));
gulp.task("start", gulp.series("build", server));
