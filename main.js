const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports = function (q, d, o) {
  const readDirs = (dir) => {
    const execPath = process.execPath
  if (!d) return console.log('A path must be provided.')
  if(!q) return console.log('A query must be provided.')

    let rootDir
    
    let files
    if (fs.existsSync(dir)) { files = fs.readdirSync(dir); rootDir = dir }
    else if (fs.existsSync(path.join(__dirname, dir))) { files = fs.readdirSync(path.join(__dirname, dir)); rootDir = path.join(__dirname, dir); }
    else if (fs.existsSync(path.join(execPath, dir))) { files = fs.readdirSync(path.join(execPath, dir)); rootDir = path.join(execPath, dir); }
    else return console.log('Directory does not exist.')

    if (o.verbose) console.log(`Reading directory "${dir}"`)

    for (const file of files) {
      try {
        const stat = fs.lstatSync(path.join(rootDir, file))
        if (stat.isDirectory()) {
          if (file === q) {
              deleteDirectory(path.join(rootDir, file), dir)
          }
          else {
            readDirs(path.join(dir, file))
          }
        }
      }
      catch(e)
      {
        if (o.verbose) console.log(`Error reading "${file}" in "${dir}".`)
        continue
      }
    }
  }

  function deleteDirectory(p, dir) {
    fs.rm(p, { recursive: true }, (err) => {
      if (err) {
        if (o.verbose) console.log(`Failed to delete "${q}" in "${dir}"`);
      }
      console.log(`Deleted "${q}" in "${dir}"`)
    });
  }

  readDirs(d)

}



