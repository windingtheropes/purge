const fs = require('fs');
const path = require('path');
module.exports = function(d) {
    if(!d) return console.log('A valid path must be provided.')

    const readDirs = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));

        if(!files) return console.log('Directory does not exist.')

        for (const file of files) {
          const stat = fs.lstatSync(path.join(__dirname, dir, file))
          if (stat.isDirectory()) {
            if(file === 'node_modules')
            {
              fs.rm(path.join(__dirname, dir, file), { recursive: true }, (err) => {
                  if (err) {
                      throw err;
                  }
                  console.log(`Deleted node_modules in ${dir}`)
              });
            }
            else
            {
              readDirs(path.join(dir, file))
            }
          } 
        }
      }
      
      readDirs(d)
}
    


