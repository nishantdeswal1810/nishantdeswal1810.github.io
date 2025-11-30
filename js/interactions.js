// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('expand');
    cursorDot.classList.add('expand');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('expand');
    cursorDot.classList.remove('expand');
});

// Add hover effect to clickable elements
const clickables = document.querySelectorAll('a, button, .skill-badge, .glass-card');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// --- Superhero Interactions Setup (Must be before animation loop) ---

// 1. Smooth Ripple Effect (Improved Web Shooter)
let ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 150;
        this.opacity = 1;
        this.speed = 5;
    }

    draw(ctx) {
        if (this.radius < this.maxRadius) {
            this.radius += this.speed;
            this.opacity = 1 - (this.radius / this.maxRadius);
        } else {
            this.opacity -= 0.05;
        }

        // Draw outer ripple
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${this.opacity * 0.6})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw inner ripple (slightly delayed)
        if (this.radius > 20) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 20, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Draw web pattern expanding from center
        if (this.radius > 10) {
            const webLines = 8;
            for (let i = 0; i < webLines; i++) {
                const angle = (Math.PI * 2 / webLines) * i;
                const lineLength = this.radius * 0.8;
                
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(
                    this.x + Math.cos(angle) * lineLength,
                    this.y + Math.sin(angle) * lineLength
                );
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

document.addEventListener('click', (e) => {
    // Prevent ripple when clicking buttons/links
    if (!e.target.closest('a') && !e.target.closest('button')) {
        ripples.push(new Ripple(e.clientX, e.clientY));
    }
});

// Interactive Particles Background (Web Network)
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-2';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.random() > 0.5 ? '6, 182, 212' : '139, 92, 246'}, ${Math.random() * 0.5})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

// --- Superhero Background Animations (Enhanced & Interactive) ---
// COMMENTED OUT - User requested to disable animations

/*
// Track mouse position for interactivity
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Spiderman swinging across screen (Enhanced)
class Spiderman {
    constructor() {
        this.reset();
        this.isReacting = false;
        this.reactionTimer = 0;
    }

    reset() {
        this.x = -100;
        this.y = Math.random() * 200 + 100;
        this.speed = 2.5 + Math.random() * 1.5;
        this.swingPhase = 0;
        this.size = 50;
        this.webLength = 80 + Math.random() * 40;
        this.rotation = 0;
    }

    update() {
        this.x += this.speed;
        this.swingPhase += 0.08;
        
        // Swinging motion with more realistic arc
        this.currentY = this.y + Math.sin(this.swingPhase) * 40;
        this.rotation = Math.sin(this.swingPhase) * 0.3;
        
        // React to mouse proximity
        const distToMouse = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.currentY - mouseY, 2));
        if (distToMouse < 150 && !this.isReacting) {
            this.isReacting = true;
            this.reactionTimer = 30;
        }
        
        if (this.reactionTimer > 0) {
            this.reactionTimer--;
            // Swing faster when reacting
            this.swingPhase += 0.1;
        } else {
            this.isReacting = false;
        }
        
        // Reset when off screen
        if (this.x > canvas.width + 100) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        
        // Draw web line with gradient
        const webGradient = ctx.createLinearGradient(this.x, this.currentY - this.webLength, this.x, this.currentY);
        webGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        webGradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.currentY - this.webLength);
        ctx.lineTo(this.x, this.currentY - this.size * 0.6);
        ctx.strokeStyle = webGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.translate(this.x, this.currentY);
        ctx.rotate(this.rotation);
        
        // Shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        
        // Body (more detailed)
        const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.5);
        bodyGradient.addColorStop(0, 'rgba(220, 38, 38, 0.9)');
        bodyGradient.addColorStop(1, 'rgba(185, 28, 28, 0.7)');
        
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.35, this.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head with mask detail
        ctx.fillStyle = 'rgba(220, 38, 38, 0.9)';
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.45, this.size * 0.28, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes (white)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.12, -this.size * 0.48, this.size * 0.08, this.size * 0.12, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(this.size * 0.12, -this.size * 0.48, this.size * 0.08, this.size * 0.12, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Web pattern on suit
        ctx.strokeStyle = 'rgba(139, 0, 0, 0.4)';
        ctx.lineWidth = 1;
        for (let i = -2; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(i * this.size * 0.1, -this.size * 0.3);
            ctx.lineTo(i * this.size * 0.1, this.size * 0.3);
            ctx.stroke();
        }
        
        // Arms (dynamic based on swing)
        const armAngle = Math.sin(this.swingPhase) * 0.6;
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.9)';
        ctx.lineWidth = this.size * 0.18;
        ctx.lineCap = 'round';
        
        // Left arm
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.15, -this.size * 0.2);
        ctx.lineTo(-this.size * 0.4 + Math.cos(armAngle) * 10, -this.size * 0.5 + Math.sin(armAngle) * 15);
        ctx.stroke();
        
        // Right arm reaching up
        ctx.beginPath();
        ctx.moveTo(this.size * 0.15, -this.size * 0.2);
        ctx.lineTo(this.size * 0.3, -this.size * 0.7);
        ctx.stroke();
        
        // Legs (dynamic)
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.1, this.size * 0.35);
        ctx.lineTo(-this.size * 0.25, this.size * 0.75);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.size * 0.1, this.size * 0.35);
        ctx.lineTo(this.size * 0.3, this.size * 0.7);
        ctx.stroke();
        
        // Glow effect when reacting
        if (this.isReacting) {
            ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

// Batmobile driving across screen (Enhanced)
class Batmobile {
    constructor() {
        this.reset();
        this.isBoosting = false;
        this.boostTimer = 0;
    }

    reset() {
        this.x = canvas.width + 100;
        this.y = canvas.height - 180;
        this.speed = 5 + Math.random() * 2;
        this.size = 70;
        this.wheelRotation = 0;
        this.exhaustIntensity = 0.4;
    }

    update() {
        this.x -= this.speed;
        this.wheelRotation += this.speed * 0.1;
        
        // React to mouse proximity
        const distToMouse = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2));
        if (distToMouse < 200 && !this.isBoosting) {
            this.isBoosting = true;
            this.boostTimer = 40;
        }
        
        if (this.boostTimer > 0) {
            this.boostTimer--;
            this.speed = 8;
            this.exhaustIntensity = 0.8;
        } else {
            this.isBoosting = false;
            this.speed = 5 + Math.random() * 2;
            this.exhaustIntensity = 0.4;
        }
        
        // Reset when off screen
        if (this.x < -250) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = -8;
        ctx.shadowOffsetY = 8;
        
        // Main body with gradient
        const bodyGradient = ctx.createLinearGradient(-this.size, -this.size * 0.4, this.size, 0);
        bodyGradient.addColorStop(0, 'rgba(20, 20, 20, 0.9)');
        bodyGradient.addColorStop(0.5, 'rgba(40, 40, 40, 0.9)');
        bodyGradient.addColorStop(1, 'rgba(20, 20, 20, 0.9)');
        
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.moveTo(-this.size * 1.1, 0);
        ctx.lineTo(-this.size * 0.8, -this.size * 0.35);
        ctx.lineTo(-this.size * 0.4, -this.size * 0.45);
        ctx.lineTo(this.size * 0.2, -this.size * 0.45);
        ctx.lineTo(this.size * 0.8, -this.size * 0.25);
        ctx.lineTo(this.size * 1.1, -this.size * 0.1);
        ctx.lineTo(this.size * 1.1, 0);
        ctx.closePath();
        ctx.fill();
        
        // Cockpit with gradient
        const cockpitGradient = ctx.createLinearGradient(0, -this.size * 0.5, 0, -this.size * 0.3);
        cockpitGradient.addColorStop(0, 'rgba(30, 58, 138, 0.8)');
        cockpitGradient.addColorStop(1, 'rgba(59, 130, 246, 0.5)');
        
        ctx.fillStyle = cockpitGradient;
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.35, -this.size * 0.45);
        ctx.lineTo(-this.size * 0.15, -this.size * 0.55);
        ctx.lineTo(this.size * 0.15, -this.size * 0.55);
        ctx.lineTo(this.size * 0.25, -this.size * 0.45);
        ctx.closePath();
        ctx.fill();
        
        // Bat symbol on hood
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.moveTo(this.size * 0.4, -this.size * 0.35);
        ctx.lineTo(this.size * 0.5, -this.size * 0.3);
        ctx.lineTo(this.size * 0.55, -this.size * 0.4);
        ctx.lineTo(this.size * 0.5, -this.size * 0.35);
        ctx.lineTo(this.size * 0.55, -this.size * 0.3);
        ctx.lineTo(this.size * 0.5, -this.size * 0.25);
        ctx.lineTo(this.size * 0.4, -this.size * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Wheels with rotation
        ctx.save();
        ctx.translate(-this.size * 0.6, this.size * 0.15);
        ctx.rotate(this.wheelRotation);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.22, 0, Math.PI * 2);
        ctx.fill();
        
        // Wheel rim with glow
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.16, 0, Math.PI * 2);
        ctx.stroke();
        
        // Spokes
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            const angle = (Math.PI * 2 / 5) * i;
            ctx.lineTo(Math.cos(angle) * this.size * 0.15, Math.sin(angle) * this.size * 0.15);
            ctx.stroke();
        }
        ctx.restore();
        
        // Rear wheel
        ctx.save();
        ctx.translate(this.size * 0.6, this.size * 0.15);
        ctx.rotate(this.wheelRotation);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.22, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.16, 0, Math.PI * 2);
        ctx.stroke();
        
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            const angle = (Math.PI * 2 / 5) * i;
            ctx.lineTo(Math.cos(angle) * this.size * 0.15, Math.sin(angle) * this.size * 0.15);
            ctx.stroke();
        }
        ctx.restore();
        
        // Exhaust with dynamic glow
        const exhaustGradient = ctx.createRadialGradient(-this.size * 1.05, -this.size * 0.05, 0, -this.size * 1.05, -this.size * 0.05, this.size * 0.25);
        exhaustGradient.addColorStop(0, `rgba(236, 72, 153, ${this.exhaustIntensity})`);
        exhaustGradient.addColorStop(0.5, `rgba(236, 72, 153, ${this.exhaustIntensity * 0.5})`);
        exhaustGradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        
        ctx.fillStyle = exhaustGradient;
        ctx.beginPath();
        ctx.arc(-this.size * 1.05, -this.size * 0.05, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        
        // Boost effect when reacting
        if (this.isBoosting) {
            ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
            ctx.shadowBlur = 30;
            
            for (let i = 0; i < 3; i++) {
                ctx.fillStyle = `rgba(236, 72, 153, ${0.4 - i * 0.1})`;
                ctx.beginPath();
                ctx.arc(-this.size * (1.1 + i * 0.2), -this.size * 0.05, this.size * (0.2 + i * 0.1), 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }
}

// Create superhero instances
const spiderman = new Spiderman();
const batmobile = new Batmobile();
*/

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Web Network
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 - distance/1000})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw Superheroes - COMMENTED OUT
    /*
    spiderman.update();
    spiderman.draw();
    
    batmobile.update();
    batmobile.draw();
    */
    
    // Draw Ripples
    ripples.forEach((ripple, index) => {
        ripple.draw(ctx);
        if (ripple.opacity <= 0) {
            ripples.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// --- Advanced Animations (Preserved) ---

// 2. 3D Tilt Effect
const tiltCards = document.querySelectorAll('.glass-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Magnetic effect removed for smoother UX

// 3. Bat-Signal Spotlight (Yellow/Gold glow on hover)
const spotlightCards = document.querySelectorAll('.glass-card');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
