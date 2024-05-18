const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js', 
        init: './src/init.js'
     },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    watch: true
}