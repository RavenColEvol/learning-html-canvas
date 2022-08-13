import { board } from './canvas.js';
import { BLOCK_DIM, col } from './constants.js';

export default class Block {
    constructor(block) {
        this.dim = block.dim;
        this.color = block.color;
        this.x   = Math.floor(
            (col - block.dim[0].length) / 2
        );
        this.y   = 0;
        this.lock = false;
        this.isDrop = false;
    }
    draw() {
        const dim = this.dim;
        for(let i = 0; i < dim.length; i++) {
            for(let j = 0; j < dim[0].length; j++) {
                if(dim[i][j] == 1) {
                    board.fillStyle = this.color;
                    board.fillRect(
                        (this.x + j) * BLOCK_DIM,
                        (this.y + i) * BLOCK_DIM,
                        BLOCK_DIM,
                        BLOCK_DIM
                    )
                }
            }
        }
    }
    update() {
        this.y += 1;
        this.draw();
        this.lock = false;
    }
    rotate(clock = true) {
        const temp = [];
        const dim = this.dim;
        for(let j = 0; j < dim[0].length; j++) {
            temp.push([]);
            for(let i = 0; i < dim.length; i++) {
                temp[j].push(dim[i][j]);
            }
            if(clock) temp[j].reverse();
        }
        this.dim = temp;
    }
    rotateClock() { this.rotate(true) }
    rotateAntiClock() { this.rotate(false) }
    moveRight() {
        if(this.lock != false) return;
        if(this.x + this.dim[0].length + 1 > col) return;
        this.x += 1;
        this.y -= 1;
        this.lock = true;
    }
    moveLeft() {
        if(this.lock != false) return;
        if(this.x - 1 < 0) return;
        this.x -= 1;
        this.y -= 1;
        this.lock = true;
    }

    drop() {
        //todo
        if(this.isDrop) {
            this.isDrop = false;
            window.dropSlow();
        } else {
            console.log('called');
            this.isDrop = true;
            window.dropFast();
        }
    }
}