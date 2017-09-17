let path = require('path');

module.exports = {
    // developer directory.
    devDir: path.resolve(process.cwd(), 'src'),
    distDir: path.resolve(process.cwd(), 'dist'),
    // template extension.
    tplExtension: '.ejs',

    // javascript extension.
    jsExtension: '.js',

    // css extension.
    cssExtension: '.css',

    // command name.
    command: 'Lich',

    // declare rules.
    rules: {

    }
};