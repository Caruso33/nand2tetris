const rl = require('readline');
const fs = require('fs');

function IO() {
    this.readLines = function (file, action) {
        lines = [];

        lineReader = rl.createInterface({
            input: fs.createReadStream(file)
        });

        lineReader.on('line', line => {
            lines.push(
                action(line)
            );
        });

        const once = (target, event) => new Promise(res => target.on(event, res));

        return once(lineReader, "close").then(() => Promise.all(lines));
    }

    this.writeHackFile = function (asmFile, hack) {
        fs.writeFileSync(
            asmFile.replace(/.asm/, '.hack'),
            hack,
            ({ encoding: 'utf-8' })
        )
    }
}

module.exports = IO;

    // const asm = readAsmFile(asmFile);
    // const parsed = parse(asm);

    // function readAsmFile(file) {
    //     const readAsm = fs.readFileSync(
    //         file,
    //         { encoding: 'utf-8' },
    //         (err, data) => {
    //             if (err)
    //                 return console.log(err);
    //             const lines = data.split(/\r?\n/);
    //             console.log('lines', lines);
    //             return lines;
    //         });
    //     // fs.closeSync();
    //     return readAsm;
    // };