"use strict";

var gulp = require("gulp");
var run = require("run-sequence");
var del = require("del");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var notify = require("gulp-notify");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("images", function () {
  return gulp.src([
    "source/img/**/*.{png,jpg,svg}",
    "!source/img/sprite.svg"
  ])
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src("source/fonts/**/*.{woff,woff2}", {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("source/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("build/img/inline-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest("build"))
  .pipe(server.stream());
});

gulp.task("jsmin", function (){
  return gulp.src("source/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

gulp.task("delTempFiles", function () {
  return del("build/img/inline-*.svg");
});

gulp.task("build", function (done) {
  run(
    "clean",
    "images",
    "webp",
    "copy",
    "style",
    "sprite",
    "html",
    "jsmin",
    "delTempFiles",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["jsmin"]);
});
