const clearDirectory = require('.')
const query = process.argv[2]
const dir = process.argv[3]

const options = process.argv[4]

const flags = {}


if (options.startsWith('-')) {
    const option = options.split('-').pop()
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
                flags.log = true
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


clearDirectory(query, dir, flags, options)

