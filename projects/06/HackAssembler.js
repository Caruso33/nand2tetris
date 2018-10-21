const asmFile = process.argv[2];

const IO = require('./IO');
const Parser = require('./Parser');

if (!asmFile)
    process.exit();

function Main() {
    const hackLines = [];

    const io = new IO();
    const parser = new Parser();

    io.readLines(asmFile, line => {
        parser.parseForDefinitions(line);
    });

    io.readLines(asmFile, line => {
        let hackLine = parser.parseFull(line);
 
        if (hackLine) {
            hackLines.push(hackLine);
        }
    })
        .then(() =>
            io.writeHackFile(
                asmFile,
                hackLines.join('\n')
            )
        );
}

Main();