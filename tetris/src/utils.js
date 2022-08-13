import { board } from './canvas.js';
import { BLOCK_DIM, BOARD_HEIGHT, BOARD_WIDTH, pieces, col, row } from './constants.js';
import Block from './Block.js';


const tetris = Array.from({ length: row }, () => {
    return new Array(col).fill(null);
})

export function hasBlockReachedBottom() {
    const dim = currBlock.dim;
    const { x, y } = currBlock;

    for (let i = 0; i < dim.length; i++) {
        for (let j = 0; j < dim[0].length; j++) {
            if (dim[i][j] == 1) {
                const blockY = y + i + 1;
                if (blockY == row || tetris[blockY][x + j] != null) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function drawTetris() {
    for (let y = 0; y < row; y++) {
        for (let x = 0; x < col; x++) {
            if (tetris[y][x] != null) {
                board.fillStyle = tetris[y][x];
                board.fillRect(
                    x * BLOCK_DIM,
                    y * BLOCK_DIM,
                    BLOCK_DIM,
                    BLOCK_DIM
                );
            }
        }
    }
}

export function setTetris() {
    const dim = currBlock.dim;
    const { x, y, color } = currBlock;
    for (let i = 0; i < dim.length; i++) {
        for (let j = 0; j < dim[0].length; j++) {
            if (dim[i][j] == 1) {
                tetris[y + i][x + j] = color;
            }
        }
    }
}

export function spawnNewBlock() {
    const idx = Math.floor(getRandomBtw(0, pieces.length - 1));
    return new Block(pieces[idx], idx);
}

export function getRandomBtw(start, end) {
    const diff = end - start + 1;
    return Math.random() * diff + start;
}

export function clearLines() {
    for(let i = 0; i < row; i++) {
        if(tetris[i].every(cell => cell != null)) {
            tetris.splice(i, 1);
            tetris.unshift(new Array(col).fill(null));
        }
    }
}
