import gulp from "gulp";
import del from "del";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

const sass = require("gulp-sass")(require("node-sass"));
const routes = {
    css: {
        watch: "src/scss/*",
        src: "src/scss/styles.scss", //여기서 일어나는 모든 일은 css로 compile된다.
        dest: "dest/css",
    },
};

const styles = () =>
    gulp
        .src(routes.css.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                flexbox: true,
                grid: "autoplace",
            })
        )
        .pipe(minify())
        .pipe(gulp.dest(routes.css.dest));

const watch = () => {
    gulp.watch(routes.css.watch, styles);
};

const clean = () => del(["dest/"]); //컴파일된 css가 담기는 곳이다.

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
