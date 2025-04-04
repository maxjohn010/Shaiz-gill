  // Advanced 3D Scene with Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene').appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x00ffcc, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Interactive 3D Cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x00ffcc,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Particle System
        const particles = new THREE.Group();
        const particleCount = 150;
        const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });

        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            );
            particles.add(particle);
        }
        scene.add(particles);

        camera.position.z = 10;

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            particles.rotation.y += 0.002;
            renderer.render(scene, camera);
        }
        animate();

        // Responsive Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Mouse Interaction
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            gsap.to(cube.rotation, {
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // Navigation
        gsap.registerPlugin(ScrollTrigger);
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        if (window.innerWidth <= 768) navLinks.classList.remove('active');
                    }
                });
            });
        });

        // Hide nav on scroll down, show on scroll up
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 100) {
                document.querySelector('nav').classList.add('hidden');
            } else {
                document.querySelector('nav').classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });

        // Animations
        // gsap.from('.hero h1', { duration: 1, y: -100, opacity: 0, ease: 'power3.out' });
        // gsap.from('.hero p', { duration: 1, y: 100, opacity: 0, ease: 'power3.out', delay: 0.3 });

        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section.querySelectorAll('.content > *'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });

        // Skill Card 3D Effects
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(item, {
                    duration: 0.3,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Modal Functionality
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-modal');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                modal.style.display = 'flex';
                gsap.from(modal.querySelector('.modal-content'), {
                    duration: 0.5,
                    y: -100,
                    opacity: 0,
                    ease: 'back.out(1.7)'
                });
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                gsap.to(modal.querySelector('.modal-content'), {
                    duration: 0.3,
                    y: 100,
                    opacity: 0,
                    ease: 'power2.in',
                    onComplete: () => modal.style.display = 'none'
                });
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    gsap.to(modal.querySelector('.modal-content'), {
                        duration: 0.3,
                        y: 100,
                        opacity: 0,
                        ease: 'power2.in',
                        onComplete: () => modal.style.display = 'none'
                    });
                }
            });
        });

        document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add API call here
});