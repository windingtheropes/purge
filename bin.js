const clearDirectory = require('.') 

const query = process.argv[2]
const dir = process.argv[3]

let options = process.argv
options.shift()
options.shift()
options.shift()
options.shift()

let flags = {}

options.forEach(o => {
    if(o.startsWith('-'))
    {
        switch(o.replace('-', ''))
        {
            case 'verbose':
            case 'v':
                flags.verbose = true;
                break;
            case 'n':
                flags.ask = true;
                break;
        }
    }
})

clearDirectory(query, dir, flags)

