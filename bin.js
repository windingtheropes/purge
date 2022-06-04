const clearDirectory = require('.')
const query = process.argv[2]
const dir = process.argv[3]
const {version} = require('./package.json')

const options = process.argv.splice(4,3)

const flags = {}

options.forEach(o => {
    if (o.startsWith('-')) {
        const option = o.split('-').pop()
        for (var i = 0; i < option.length; i++) {
            const char = option.charAt(i)
            switch (char) {
                case 'v':
                    flags.verbose = true;
                    break;
                case 'y':
                    flags.noAsk = true;
                    break;
                case 'l':
                    flags.logs = true
                    break;
                case 'o':
                    flags.overwriteLogs = true
                    break;
                case 'd':
                    flags.directory = true;
                    break;
                case 'f':
                    flags.file = true;
                    break;
                case 'L':
                    flags.verboseLogs = true;
                    break;
                case 'c':
                    flags.caseInsensitive = true;
                    break;
                case 'e':
                    flags.end = true;
                    break;
                case 's':
                    flags.start = true;
                    break;
            }
        }
    }
})

if(process.argv.length <= 2)
{
    console.log(`purge version ${version}\n\nUsage:\n\npurge.exe <query> <directory> <options>\nNote: at least one type (-f or -d) is required. \n\nOptions:\n\nTypes:\n-f Type: file\n-d Type: directory\n\nFlags:\n-l Minimal logging.\n-L Verbose logging.\n-o Overwrite logfile.\n-v Output will be more verbose.\n-y Delete without asking.\n-c Ignore capitalization.\n-e Search for <query> at end of file (extension)\n-s Search for <query> at start of file`)
}
else clearDirectory(query, dir, flags, options)

