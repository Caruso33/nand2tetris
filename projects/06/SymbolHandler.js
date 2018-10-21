function SymbolHandler() {
    const predefinedSymbols = {
        'R0': 0,
        'R1': 1,
        'R2': 2,
        'R3': 3,
        'R4': 4,
        'R5': 5,
        'R6': 6,
        'R7': 7,
        'R8': 8,
        'R9': 9,
        'R10': 10,
        'R11': 11,
        'R12': 12,
        'R13': 13,
        'R14': 14,
        'R15': 15,
        'SCREEN': 16384,
        'KBD': 24576,
        'SP': 0,
        'LCL': 1,
        'ARG': 2,
        'THIS': 3,
        'THAT': 4
    }
    const symbolTable = {};

    let variableIndex = 16;

    this.saveDefinition = function (definition, index) {
        // console.log('saving', definition, 'line', index);
        symbolTable[
            cutParenthesis(definition)
        ] = index;
    }

    this.handleSymbol = function (symbol) {
        const stripedSymb = cutAtSign(symbol);

        if (predefinedSymbols.hasOwnProperty(stripedSymb)) {
            return convertToBinary(predefinedSymbols[stripedSymb]);
        }

        if (symbolTable.hasOwnProperty(stripedSymb)) {
            return convertToBinary(symbolTable[stripedSymb]);
        }

        if (!Number.isNaN(Number(stripedSymb))) { // is a straight number (@2)
            return convertToBinary(stripedSymb);
        }


        // console.log('variable', stripedSymb, 'index', variableIndex);
        symbolTable[stripedSymb] = variableIndex; // is a variable (@sum)
        variableIndex++;
        return convertToBinary(symbolTable[stripedSymb]);
    }

    const cutAtSign = line => line.slice(1);
    const cutParenthesis = line => line.slice(1, line.length - 1)
    const convertToBinary = symbol => Number(symbol).toString(2).padStart('16', '0')
}

module.exports = SymbolHandler;