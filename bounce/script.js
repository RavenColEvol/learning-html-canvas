const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

// SETUP
const canvas = document.getElementById('canvas');
canvas.width = winWidth;
canvas.height = winHeight;

const pen = canvas.getContext('2d');

const balls = 50;
const gravity = 2;
const bouncingCoefficient = .88;
const colors = ['#F3C178', '#00A878', '#FE5E41', '#0B0500'];
// Shapes
function getRandom(start, end) {
    const diff = end - start + 1;
    return (Math.random() * diff) + start
}

function getColor() {
    const idx = Math.floor(
        getRandom(0, colors.length - 1)
    );
    return colors[idx];
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dy = .88;
        this.color = getColor();
    }

    draw() {
        pen.beginPath();
        pen.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        pen.fillStyle = this.color;
        pen.fill();
        pen.stroke();
        pen.closePath();
    }

    update() {
        const assumeStrokeWidth = 2;
        const ballBottomSectionY = (
            this.y + this.r + this.dy + assumeStrokeWidth
        );
        if(ballBottomSectionY > window.innerHeight) {
            this.dy = -(this.dy * bouncingCoefficient);
        } else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.draw();
    }
}

const circles = [];

function draw() {
    for(let i = 0; i < balls; i++) {
        const radi = Math.floor(getRandom(10, 30));
        const x = getRandom(radi, winWidth - radi);
        const y = getRandom(radi, winHeight - radi);
        const circle = new Circle(x, y, radi);
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