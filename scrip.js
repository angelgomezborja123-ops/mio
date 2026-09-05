const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let time = 0;

class Particle {
  constructor(targetX, targetY) {
    // Posición inicial aleatoria
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    // Posición donde debe formar el corazón
    this.targetX = targetX;
    this.targetY = targetY;

    this.size = Math.random() * 2 + 1;
  }

  update() {
    // El corazón se desarma
    let explosion = Math.sin(time) * 200;

    let dx = this.targetX - canvas.width / 2;
    let dy = this.targetY - canvas.height / 2;

    // Posición animada
    let currentX = this.targetX + (dx / 200) * explosion;

    let currentY = this.targetY + (dy / 200) * explosion;

    // Movimiento suave hacia la posición
    this.x += (currentX - this.x) * 0.05;
    this.y += (currentY - this.y) * 0.05;
  }

  draw() {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00d9ff";

    ctx.fillStyle = "#00d9ff";

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fill();
  }
}

function createHeart() {
  particles = [];

  for (let t = 0; t < Math.PI * 2; t += 0.02) {
    let x = 16 * Math.pow(Math.sin(t), 3);

    let y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    x = x * 18 + canvas.width / 2;

    y = -y * 18 + canvas.height / 2;

    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  time += 0.02;

  particles.forEach((particle) => {
    particle.update();

    particle.draw();
  });

  requestAnimationFrame(animate);
}

createHeart();

animate();
