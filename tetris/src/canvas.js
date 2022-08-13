import { BOARD_WIDTH, BOARD_HEIGHT, BLOCK_DIM } from './constants.js';

const game = document.getElementById('tetris');
game.width = BOARD_WIDTH;
game.height = BOARD_HEIGHT;

game.style.background = `
    repeating-linear-gradient(90deg, black 0, transparent 1px, transparent ${BLOCK_DIM}px),                    
    repeating-linear-gradient(180deg, black 0, transparent 1px, transparent ${BLOCK_DIM}px)
`

export const board = game.getContext('2d');