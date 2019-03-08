
const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const background = [
    'rgba(30, 80, 100, 1)',
    'rgba(20, 20, 20, 1)',
];

const gravity = 5;
const xVelocity = -2;

const tl = 7;

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const pingoColor = [
    'rgba(255, 255, 255, 0)',
    'rgba(255, 255, 255, 0.35)',
];

class PingoDAgua {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = randomNumber(-.5, -1);
        this.dy = randomNumber(6, 18);
        this.afterX = this.x + this.dx * tl;
        this.afterY = this.y + this.dy * tl;

        this.update = () => {
            this.x += this.dx;
            this.y += this.dy;
            this.afterX = this.x + this.dx * tl;
            this.afterY = this.y + this.dy * tl;
            this.draw();
        }

        this.draw = () => {
            ctx.save();
            ctx.beginPath();

            const pingoGradient = ctx.createLinearGradient(this.x, this.y, this.afterX, this.afterY);
            pingoColor.forEach((color, i) => {
                pingoGradient.addColorStop(i / (pingoColor.length-1), color);
            });
            
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.afterX, this.afterY);
            ctx.strokeStyle = pingoGradient;
            ctx.stroke();

            ctx.closePath();
            ctx.restore();
        }
    }
}

const spawnNewPingoDAgua = () => {
    const x = randomNumber(0, canvas.width + canvas.width / 10);
    const y = randomNumber(0, -canvas.height * 1.5);
    return new PingoDAgua(x, y);
}

const pingosDAgua = [];
for(let i = 0; i < 250; i++) {
    pingosDAgua.push(spawnNewPingoDAgua());
}

// Criando o gradiente
const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
background.forEach((color, i) => {
    bgGradient.addColorStop(i / (background.length-1), color);
})

const animate = () => {

    requestAnimationFrame(animate);
    
    ctx.save();
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    pingosDAgua.forEach((pingoDAgua, i) => {
        pingoDAgua.update();
        
        if(pingoDAgua.y - gravity * tl > canvas.height) {
            pingosDAgua.splice(i, 1, spawnNewPingoDAgua());
        }
    });

}

animate();
