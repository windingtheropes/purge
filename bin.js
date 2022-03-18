const clearDirectory = require('.')
const query = process.argv[2]
const dir = process.argv[3]

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
            }
        }
    }
})



clearDirectory(query, dir, flags, options)

