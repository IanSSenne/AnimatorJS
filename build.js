const minify = require('@node-minify/core');
const ujs = require("@node-minify/uglify-es");

minify({
    compressor: ujs,
    input: './src/AnimatorJS.js',
    output: './build/AnimatorJS.min.js',
    options: {
        mangle: true,
        output: {
            ast: true,
            ecma: 6
        },
        compress: true,
        compress: {
            inline: 3,
            drop_console: true
        }
    },
    callback: function (err, min) {
        console.log("uglify-es DONE", err);
    }
}).catch(e => console.log("ERROR", e));
minify({
    compressor: ujs,
    input: './src/AnimatorJS.dom.js',
    output: './build/AnimatorJS.dom.min.js',
    options: {
        mangle: true,
        output: {
            ast: true,
            ecma: 6
        },
        compress: true,
        compress: {
            inline: 3,
            drop_console: true
        }
    },
    callback: function (err, min) {
        console.log("uglify-es DONE", err);
    }
}).catch(e => console.log("ERROR", e));