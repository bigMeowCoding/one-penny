import gulp from 'gulp';

import less from 'gulp-less';
import path from 'path';

import postcss from 'gulp-postcss';

import replace from 'gulp-replace';

import ts from 'gulp-typescript';

import del from 'del';

import webpackStream from 'webpack-stream';

import webpack from 'webpack';

import through from 'through2';

const vite = require('vite');

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import tsconfig from './tsconfig.json';

import packageJson from './package.json';

import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin';

import postcss_px_multiple from 'postcss-px-multiple';

import rename from 'gulp-rename';

import babel from 'gulp-babel';
const pxMultiplePlugin = postcss_px_multiple({ times: 2 });

function clean() {
  return del('./lib/**');
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/',
      ignore: ['**/demos/**/*', '**/tests/**/*', '*.patch.less'],
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      }),
    )
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'));
}

function buildPatchStyle() {
  return gulp
    .src(['./src/**/*.patch.less'], {
      base: './src/',
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      }),
    )
    .pipe(
      rename((path) => ({
        dirname: '',
        basename: path.basename.replace(/\.patch$/, ''),
        extname: '.css',
      })),
    )
    .pipe(gulp.dest('./lib/css-var-patch'));
}

function copyAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('lib/assets'))
    .pipe(gulp.dest('lib/es/assets'))
    .pipe(gulp.dest('lib/cjs/assets'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      }),
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: ['./babel-transform-less-to-css'],
      }),
    )
    .pipe(gulp.dest('lib/es/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('lib/es/'))
    .pipe(gulp.dest('lib/cjs/'));
}

function getViteConfigForPackage({ minify, formats, external }) {
  const name = packageJson.name;
  return {
    root: process.cwd(),

    logLevel: 'silent',

    build: {
      lib: {
        name,
        entry: './lib/es/index.js',
        formats,
        fileName: (format) => {
          const suffix = format === 'umd' ? '' : `.${format}`;
          return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`;
        },
      },
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          dir: './lib/bundle',
          exports: 'named',
          globals: {
            react: 'React',
          },
        },
      },
    },
  };
}

async function buildBundles(cb) {
  const dependencies = packageJson.dependencies || {};
  const externals = Object.keys(dependencies);

  const configs = [
    // esm/cjs bundle
    getViteConfigForPackage({
      minify: false,
      formats: ['es', 'cjs'],
      external: ['react', ...externals],
    }),
  ];

  await Promise.all(configs.map((config) => vite.build(config)));
  cb && cb();
}

function umdWebpack() {
  return gulp
    .src('lib/es/index.js')
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'one-penny.js',
            library: {
              type: 'umd',
              name: 'antdMobile',
            },
          },
          mode: 'production',
          optimization: {
            usedExports: true,
          },
          performance: {
            hints: false,
          },
          resolve: {
            extensions: ['.js', '.json'],
          },
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: 'report/report.html',
            }),
            new StatoscopeWebpackPlugin({
              saveReportTo: 'report/statoscope/report.html',
              saveStatsTo: 'report/statoscope/stats.json',
              open: false,
            }),
          ],
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          loose: true,
                          modules: false,
                          targets: {
                            chrome: '49',
                            ios: '10',
                          },
                        },
                      ],
                      '@babel/preset-typescript',
                      '@babel/preset-react',
                    ],
                  },
                },
              },
              {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                type: 'asset/inline',
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            ],
          },
          externals: [
            {
              react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React',
              },
              'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
                root: 'ReactDOM',
              },
            },
          ],
        },
        webpack,
      ),
    )
    .pipe(gulp.dest('lib/umd/'));
}

function copyMetaFiles() {
  return gulp.src(['./README.md']).pipe(gulp.dest('./lib/'));
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      }),
    )
    .pipe(gulp.dest('./lib/'));
}

function create2xFolder() {
  return gulp
    .src('./lib/**', {
      base: './lib/',
      ignore: ['./lib/2x/demos/**/*'],
    })
    .pipe(gulp.dest('./lib/2x/'));
}

function build2xCSS() {
  return gulp
    .src('./lib/2x/**/*.css', {
      base: './lib/2x/',
    })
    .pipe(postcss([pxMultiplePlugin]))
    .pipe(replace('--adm-hd: 1;', '--adm-hd: 2;'))
    .pipe(
      gulp.dest('./lib/2x', {
        overwrite: true,
      }),
    );
}

exports.umdWebpack = umdWebpack;
exports.buildBundles = buildBundles;

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  buildPatchStyle,
  copyAssets,
  copyMetaFiles,
  generatePackageJSON,
  gulp.series(create2xFolder, build2xCSS),
  gulp.parallel(umdWebpack, buildBundles),
);
