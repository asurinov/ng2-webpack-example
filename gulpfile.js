const gulp = require("gulp");
const debug = require("gulp-debug");
const sass = require('gulp-sass');
const path = require("path");

const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const rollupResolve = require('rollup-plugin-node-resolve');
const rollupCommonjs = require('rollup-plugin-commonjs');

const paths = {
    npmRoot: "./node_modules/",
    appRoot: "./app/",
    build: "./assets/",
    appScripts: "./app/**/*.ts"
};

const libsToMove = [
    paths.npmRoot + "zone.js/dist/zone.min.js",
    paths.npmRoot + "reflect-metadata/Reflect.js",
    paths.npmRoot + "core-js/client/shim.min.js"
];

const sources = {
    templates: paths.rootSrc + "Templates/**/*.html",
};

const target = {
    bundlePath: paths.build + "app/bundle.js",
    lib: paths.build + "/libs/",
    templates: paths.build,
};

gulp.task("moveToLibs", function () {
    return gulp.src(libsToMove)
        .pipe(gulp.dest(target.lib));
});
gulp.task("moveToStyles", function () {
    return gulp.src(sources.styles)
        .pipe(gulp.dest(target.css));
});

gulp.task("build", ["rollup_bundle", "moveToLibs"], () => {
    return gulp.src(target.bundlePath, { base: "./" })
        .pipe(gulp.dest("./"))
        .on("end", function () { console.log("Bundle completed") });
});

gulp.task("rollup_bundle", function () {
    return rollup.rollup({
        entry: `${paths.appRoot}main.ts`,
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            //next( warning );
        },
        plugins: [
            rollupTypescript({
                target: "ES5",
                module: "es6",
                moduleResolution: "node",
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                removeComments: false,
                noImplicitAny: false,
                noEmitOnError: false,
                typescript: require('typescript')
            }),
            rollupResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            rollupCommonjs({
                namedExport:  {
                    'ng2-youtube-player': ['YoutubePlayerModule']
                }
            })
        ]
    }).then(function(bundle) {
        bundle.write({
            format: "iife",
            dest: target.bundlePath,
            sourceMap: true
        });
    });
});

gulp.task("watch", ["build"], () => {
    gulp.watch(paths.appScripts, ["rollup_bundle"]);
});

gulp.task("default", ["build"]);