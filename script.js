gsap.registerPlugin(ScrollTrigger);

// =============================================
// 1. CURSOR CUSTOMIZADO
// =============================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX - 11,
            y: e.clientY - 11,
            duration: 0.3
        });
    });

    // Garante que o cursor aparece ao mover o mouse (corrige o "preso" ao entrar na página)
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    // Efeito de escala em links e botões
    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 4, opacity: 0.3, duration: 0.2 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        });
    });
}

// =============================================
// 2. BACKGROUND ANIMADO (PARTÍCULAS) — só na index
// =============================================
const canvas = document.getElementById('bg-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width)  this.x = 0;
            if (this.x < 0)             this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0)             this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = '#5276da';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// =============================================
// 3. ANIMAÇÕES GSAP — Hero (só na index)
// =============================================
const revealElements = document.querySelectorAll('.reveal-text');

if (revealElements.length > 0) {
    gsap.from(revealElements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    });
}

// =============================================
// 4. SCROLL REVEAL — funciona nas duas páginas
// =============================================
gsap.utils.toArray('section').forEach(section => {
    const children = section.querySelectorAll('.container > *');
    if (children.length > 0) {
        gsap.from(children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
    }
});

gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8
    });
});

// =============================================
// 5. FORMULÁRIO — só na index
// =============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! (Simulação)');
    });
}