// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
// Pseudo:

// var sum = 0
// var i = 0
// loop R0 - i > 0
// R0 + R1 = sum
// i++

@RESET_R2
0;JMP

@LOOP
0;JMP

(RESET_R2)
    @R2
    M=0

(LOOP)
    @R0
    D=M
    
    @CYCLE
    D;JGT // if R0 > 0 goto CYCLE

    @END // else goto END
    0;JMP

(CYCLE)
    @ADD
    0;JMP

    @DECR
    0;JMP

(ADD)
    @R1
    D=M
    @R2
    M=M+D // sum += R1

(DECR)
    @R0
    M=M-1 // R0--
    
    @LOOP
    0;JMP

(END)
    @END
    0;JMP