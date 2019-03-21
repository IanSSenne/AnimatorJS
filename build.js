const minify = require('@node-minify/core');
const ujs = require("@node-minify/uglify-es");

minify({
    compressor: ujs,
    input: './src/*.js',
    output: './build/AnimatorJS.min.js',
    options: {
        mangle: true,
        output: {
            ast: true,
            ecma: 6
        },
        compress: true,
        compress: {
            inline: 3
        }
    },
    callback: function (err, min) {
        console.log("uglify-es DONE", err, min.length);
    }
}).catch(e => console.log("ERROR", e))
minify({
    compressor: ujs,
    input: './src/*.js',
    output: './build/AnimatorJS.js',
    options: {
        mangle: false,
        output: {
            ast: true,
            ecma: 5,
            beautify: true,
            comments: "all"
        }
    },
    callback: function (err, min) {
        console.log("uglify-es DONE pretty", err, min.length);
    }
}).catch(e => console.log("ERROR", e))