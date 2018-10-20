// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// start loop
// RAM[24576] keyboard
// if (!= 0)
//  then black screen
// else
//  white screen
// goto loop
//
// black screen:
//  loop all rows
//   RAM[address] = -1 // 1111111111111111111111
//
// white screen:
//  loop all rows
//   RAM[address] = 0 // 0000000000000000000000
@INIT
0;JMP

(INIT)
    @STATUS
    M=-1 // initialize to turn screens black
    D=0 // ARG passed

    @SET_SCREEN
    0;JMP

(SET_SCREEN) // set D = new status before here
    @ARG
    M=D // ARG stored

    @STATUS
    D=D-M // D = ARG - STATUS > has something changed?

    @WAIT_FOR_KBD
    D;JEQ // wait for new input if no new STATUS

    @ARG
    D=M
    
    @STATUS
    M=D // STATUS = ARG

    @SCREEN
    D=A // D = screen address
    @8192   // (512 * 32) / 16
    D=D+A // D = pass last screen address
    @i
    M=D // i = last SCREEN address

    @SET
    0;JMP

(WAIT_FOR_KBD)
    @KBD
    D=M // D = Input of keyboard
    @SET_SCREEN
    D;JEQ // if no key, set screen to white (0)
    D=-1 // if key, set screen to black (-1)
    
    @SET_SCREEN
    0;JMP

(SET)
    @i
    D=M-1
    M=D // i -= 1
    @WAIT_FOR_KBD
    D;JLT // if i < 0 goto SET_SCREEN
    
    @STATUS
    D=M
    @i
    A=M // indirect, Screen[row*32 + col/16] to set pixel
    M=D // M[screen address] = status
    @SET
    0;JMP