const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pen = canvas.getContext('2d');
const colors = ['#F3C178', '#00A878', '#FE5E41', '#0B0500'];

function getColor() {
    const idx = Math.floor(
        getRandom(0, colors.length - 1)
    );
    return colors[idx];
}
let currX = -1000;
let currY = -1000;
class Circle {
    constructor(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.originalR = r;
        this.dx = dx;
        this.dy = dy;
        this.color = getColor();
    }

    draw() {
        pen.beginPath();
        pen.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        pen.fillStyle = this.color;
        pen.fill();
    }

    update() {
        const isOutXBound = (
            this.x + this.r >= window.innerWidth ||
            this.x - this.r <= 0
        );
        const isOutYBound = (
            this.y + this.r >= window.innerHeight ||
            this.y - this.r <= 0
        );
        if(isOutXBound) this.dx = -this.dx;
        if(isOutYBound) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        const shrink = 2;
        const scale = 40;
        if(getDist(this.x, this.y)) {
            if(this.r + shrink < scale)
                this.r += shrink;
        } else {
            if(this.r - shrink < this.originalR) {
                this.r = this.originalR;
            } else {
                this.r -= shrink;
            }
        }
        this.draw();
    }
}

function getRandom(start, end) {
    const diff = end - start + 1;
    return (Math.random() * diff) + start
}

function getDist(x, y) {
    const radi = 100;
    return (
        Math.abs(x - currX) < radi &&
        Math.abs(y - currY) < radi
    );
}

const circles = [];

function draw() {
    for(let i = 0; i < 500; i++) {
        const radi = Math.floor(getRandom(3, 7));
        const x = getRandom(radi, window.innerWidth - radi);
        const y = getRandom(radi, window.innerHeight - radi);
        const dx = getRandom(0, .3);
        const dy = getRandom(0, .3);
        const circle = new Circle(x, y, radi, dx, dy);
        circle.draw();
        circles.push(circle);
    }
}

function animate() {
    requestAnimationFrame(animate);
    pen.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(const circle of circles) {
        circle.update();
    }
}

draw();
animate();
addEventListener('mousemove', (e) => {
    currX = e.clientX;
    currY = e.clientY;
});