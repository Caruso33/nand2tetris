const SymbolHandler = require('./SymbolHandler');
const Translator = require('./Translator');

function Parser() {
    const symbolHandler = new SymbolHandler();
    const translator = new Translator();

    let lineIndex = 0;

    const isComment = /^\/\//;
    // const isEmpty = /^ /; // /^\s*$/;
    const isDefinition = /^\(/;
    const isAInstruction = /^@/;
    const isCInstruction = /(=|;)/;
    const hasAssignment = /=/;
    const hasJump = /;/;

    const stripComments = s => {
        // console.log('stripComments', s, s.substring(0, s.indexOf('/')));
        return s.substring(0, s.indexOf('/'));
    }
    const stripWhiteSpace = s => {
        // console.log('stripWhiteSpace', s, s.replace(/\s/g, ''));
        return s.replace(/\s/g, '');
    }
    const strip = s => {
        const withoutWhiteSpace = stripWhiteSpace(s);

        if (withoutWhiteSpace.indexOf('/') > -1)
            return stripComments(withoutWhiteSpace);

        return withoutWhiteSpace;
    }

    this.parseForDefinitions = function (asmFull) {
        const asm = strip(asmFull);

        if (isDefinition.test(asm)) {
            return symbolHandler.saveDefinition(asm, lineIndex);
        }

        if (isComment.test(asm))
            return;

        if (isAInstruction.test(asm) || isCInstruction.test(asm)) {
            // console.log('parseForDefinitions', asm, 'line', lineIndex);
            lineIndex++;
        }
    }

    this.parseFull = function (asmFull) {
        const asm = strip(asmFull);
        
        if (!asm) {
            // console.log('isEmpty', asm);
            return;

        } else if (isComment.test(asm)) {
            // console.log('isComment', asm);
            return;

        } else if (isDefinition.test(asm)) {
            // console.log('isDefinition', asm);
            return;

        } else if (isAInstruction.test(asm)) {
            let symbol = symbolHandler.handleSymbol(asm, lineIndex);
            // console.log('isAInstruction', asm, symbol, 'line ', lineIndex);
            lineIndex++;
            return symbol;

        } else if (isCInstruction.test(asm)) {
            let dest, comp, jump;

            if (hasAssignment.test(asm)) {

                eqIndex = asm.match(hasAssignment).index;
                dest = translator.dest(asm.slice(0, eqIndex));
                comp = translator.comp(asm.slice(eqIndex + 1))
                jump = translator.jump('null')
            }

            if (hasJump.test(asm)) {

                commaIndex = asm.match(hasJump).index;
                dest = translator.dest('null');
                comp = translator.comp(asm.slice(0, commaIndex))
                jump = translator.jump(asm.slice(commaIndex + 1))
            }
            // console.log('isCInstruction', asm, lineIndex, '111' + comp + dest + jump);

            lineIndex++;
            return '111' + comp + dest + jump;

        } else {
            throw Error(
                `Parsing error: Line could not getting parsed: ${asm} --- line ${lineIndex}`
            );
        }
    }

    this.resetLineIndex = () => lineIndex = 0;
}
module.exports = Parser;