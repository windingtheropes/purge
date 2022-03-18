const { exec } = require('pkg')
const { name } = require('./package.json')
exec([ process.argv[2] || '.', '--target', 'host', '--output', `bin/${process.argv[3] || `${name}.exe`}`]).then(function() {
    console.log('Complete.')
}).catch(function(error) {
    console.error(error)
})