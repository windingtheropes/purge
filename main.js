const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require('prompt-sync')({ sigint: true });


module.exports = function (q, d, o, f) {

  var logsEnabled = o.verboseLogs || o.logs



  var logger = fs.createWriteStream('purge.log.txt', {
    flags: (o.overwriteLogs ? undefined : 'a')
  })


  if (!o.file && !o.directory) return log("Not searching, no types specified.")

  const startTime = new Date()

  var month = startTime.getMonth() + 1
  if (month < 10) month = `0${month}`
  var day = startTime.getDate();
  if (day < 10) day = `0${day}`
  var year = startTime.getFullYear()
  if (year < 10) year = `0${year}`

  var hours = startTime.getHours()
  if (hours < 10) hours = `0${hours}`
  var minutes = startTime.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  var seconds = startTime.getSeconds()
  if (seconds < 10) seconds = `0${seconds}`
  var milliseconds = startTime.getMilliseconds()
  if (milliseconds < 10) milliseconds = `0${milliseconds}`

  const dateString = `[${month}//${day}//${year}] [${hours}:${minutes}.${seconds}.${milliseconds}]`

  if (!o.overwriteLogs) logger.write(`\n${dateString}\nQuery: ${q}\nDirectory: ${d}\nOptions: ${f}\n\n`)

  const readDirs = (dir) => {
    const execPath = process.execPath
    if (!d) return log('A path must be provided.')
    if (!q) return log('A query must be provided.')

    if(o.caseInsensitive) q = q.toLowerCase()

    let rootDir

    let files
    if (fs.existsSync(dir)) { files = fs.readdirSync(dir); rootDir = dir }
    else if (fs.existsSync(path.join(__dirname, dir))) { files = fs.readdirSync(path.join(__dirname, dir)); rootDir = path.join(__dirname, dir); }
    else if (fs.existsSync(path.join(execPath, dir))) { files = fs.readdirSync(path.join(execPath, dir)); rootDir = path.join(execPath, dir); }
    else return log('Directory does not exist.')

    log(`Reading directory "${dir}"`, true)

    for (let file of files) {
      try {
        
        if(o.caseInsensitive) file = file.toLowerCase()
        
        const stat = fs.lstatSync(path.join(rootDir, file))
        
        if (stat.isDirectory() && file != q) {
          readDirs(path.join(dir, file))
        }
        else {
          if (
            // handle if end is passed
            (
              o.end && ((file.endsWith(q) && o.file && stat.isFile())
               ||
               (file.endsWith(q) && o.directory && stat.isDirectory()))
             ) ||
             // handle if s is passed
            (
               o.start && ((file.startsWith(q) && o.file && stat.isFile())
                ||
                (file.startsWith(q) && o.directory && stat.isDirectory()))
            ) ||
            // if neither end or start are passed
            (
              !o.end && !o.start && ((file === q && o.file && stat.isFile())
               ||
               (file === q && o.directory && stat.isDirectory()))
             )

          ) {
            log(`Found "${dir}\\${file}"`)
            if (o.noAsk) {
              deleteDirectory(path.join(rootDir, file), dir)
            }
            else {
              const r = prompt(`Delete "${dir}\\${file}"? [Y or N] `)
              switch (r.toLowerCase()) {
                case 'y':
                  deleteDirectory(path.join(rootDir, file), dir)
                  break;
                default:
                  log(`Not deleting "${dir}\\${file}"`)
                  break;
              }
            }
          }
        }


      }
      catch (e) {
        log(`Error reading "${dir}\\${file}".`, true)
        continue
      }
    }
  }

  function log(c, v) {
    const date = new Date()

    var hours = date.getHours()
    if (hours < 10) hours = `0${hours}`
    var minutes = date.getMinutes()
    if (minutes < 10) minutes = `0${minutes}`
    var seconds = date.getSeconds()
    if (seconds < 10) seconds = `0${seconds}`
    var milliseconds = date.getMilliseconds()
    if (milliseconds < 10) milliseconds = `0${milliseconds}`

    const timeString = `[${hours}:${minutes}.${seconds}.${milliseconds}]`

    if (v && o.verbose) console.log(c)
    else if (v && !o.verbose);
    else console.log(c)

    if (v && o.verboseLogs) logger.write(`${timeString} ${c}\n`)
    else if (v && !o.verboseLogs) return;
    else if (logsEnabled) logger.write(`${timeString} ${c}\n`)
    else;
  }

  function deleteDirectory(p, dir) {
    fs.rm(p, { recursive: true }, (err) => {
      if (err) {
        log(`Failed to delete "${q}" in "${dir}"`, true);
      }
      log(`Deleted "${q}" in "${dir}"`)
    });
  }

  readDirs(d)

}
