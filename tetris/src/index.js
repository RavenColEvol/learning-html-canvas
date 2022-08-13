import { board } from './canvas.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from './constants.js';
import { drawTetris, spawnNewBlock, hasBlockReachedBottom, setTetris, clearLines } from './utils.js';
const fast = 100;
const slow = 250;
window.currBlock = null;
const game = () => {
    board.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    drawTetris();
    if(!currBlock) {
        window.currBlock = spawnNewBlock();
    } else {
        if(hasBlockReachedBottom()) {
            if(currBlock.isDrop) dropSlow();
            setTetris();
            drawTetris();
            clearLines();
            window.currBlock = null;
        } else {
            currBlock.update();
        }
    }
}
window.dropFast = function() {
    clearInterval(window.render);
    window.render = setInterval(game, fast);
}
window.dropSlow = function() {
    clearInterval(window.render);
    window.render = setInterval(game, slow);
}
window.render = setInterval(game, slow)

addEventListener('keydown', (e) => {
    const currBlock = window.currBlock;
    switch(e.key) {
        case 'ArrowUp':
            return currBlock.rotateClock();
        case 'ArrowDown':
            return currBlock.rotateAntiClock();
        case 'ArrowRight':
            return currBlock.moveRight();
        case 'ArrowLeft':
            return currBlock.moveLeft();
        case ' ':
            return currBlock.drop();
    }
})