const clearDirectory = require('.') /* the current working directory so that means main.js because of package.json */
let dir = process.argv[2] /* what the user enters as first argument */

clearDirectory(dir)

