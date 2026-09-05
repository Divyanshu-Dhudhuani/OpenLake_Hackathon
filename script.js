// Function to scroll the browser tab title continuously
function scrollTitle(titleText, speed = 500) {
  // Add spacing so the end and start of the text don't stick together
  let text = titleText + "   •   "; 
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
  setInterval(() => {
    // Move the first character to the end of the string
    
    text = text.substring(1) + text.substring(0, 1);
    document.title = text;
  }, speed);
}
}

// Pass your club or hackathon website title here
scrollTitle("OpenLake - An Open Road to OpenSource");

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('main-logo');

  if (logo) {
    logo.addEventListener('click', (e) => {
      // Find exact position of the main logo
      const rect = logo.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      // Spawn 12 mini logos per click
      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('img');
        particle.src = logo.src;
        particle.className = 'logo-pop-particle';

        // Position directly over center of main logo
        particle.style.left = `${originX - 16}px`;
        particle.style.top = `${originY - 16}px`;

        // Calculate random scatter directions (X, Y) and rotations
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 140; // Scatter distance range
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rot = (Math.random() - 0.5) * 720; // 2 full spins

        // Pass dynamic movement variables to CSS animation
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(particle);

        // Clean up DOM element after animation finishes
        setTimeout(() => {
          particle.remove();
        }, 1200);
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.animate-pop');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-pop');

  const observerOptions = {
    root: null,
    threshold: 0.15 // Triggers when 15% of the card is visible in viewport
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Runs animation once per card
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('memberSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.member-card');
    const categoryTitles = document.querySelectorAll('.category-title');
    const noResultsMsg = document.getElementById('noResults');

    function filterMembers() {
        const query = searchInput.value.toLowerCase().trim();
        const activeRole = document.querySelector('.filter-btn.active').dataset.role;
        let visibleCount = 0;

        cards.forEach(card => {
            const name = card.querySelector('.member-name').textContent.toLowerCase();
            const role = card.querySelector('.member-role').textContent.toLowerCase();

            const matchesSearch = name.includes(query);
            const matchesRole = activeRole === 'all' || role === activeRole;

            if (matchesSearch && matchesRole) {
                card.style.display = 'block';
                card.classList.remove('fade-in');
                // Trigger reflow to restart animation
                void card.offsetWidth;
                card.classList.add('fade-in');
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Hide category titles if no cards in that section are visible
        categoryTitles.forEach(title => {
            const grid = title.nextElementSibling;
            if (grid && grid.classList.contains('team-grid')) {
                const hasVisibleCards = Array.from(grid.querySelectorAll('.member-card'))
                    .some(card => card.style.display !== 'none');
                
                title.style.display = hasVisibleCards ? 'block' : 'none';
                grid.style.display = hasVisibleCards ? 'grid' : 'none';
            }
        });

        // Toggle "No results" message
        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Input listener for live typing
    if (searchInput) {
        searchInput.addEventListener('input', filterMembers);
    }

    // Button click listeners for tag filtering
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterMembers();
        });
    });
});
// Interactive Canvas Particle Network
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw(color) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    let particles = [];
    function initParticles() {
        particles = [];
        // Adjust particle density based on screen size
        const count = Math.floor((width * height) / 12000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Dynamic color fetching based on Light/Dark mode
    function getThemeColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            nodeColor: isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(0, 168, 232, 0.6)',
            lineColor: isDark ? '56, 189, 248' : '0, 168, 232'
        };
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const { nodeColor, lineColor } = getThemeColors();

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(nodeColor);

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${lineColor}, ${1 - dist / 100})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }

            // Connect particles to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${lineColor}, ${1 - dist / mouse.radius})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}); 
// Roadmap Interactivity Logic
const roadmapData = {
    webdev: [
        { step: "Step 1", title: "Git & Version Control", desc: "Master branches, pull requests, and Git workflows.", mentor: "Ashish Kumar Dash", resources: ["Official Git Docs", "GitHub Skills Interactive Guide"] },
        { step: "Step 2", title: "HTML, CSS & Modern JS", desc: "Learn DOM manipulation, async JavaScript, and responsive design.", mentor: "Garvit Sharma", resources: ["MDN Web Docs", "JavaScript.info"] },
        { step: "Step 3", title: "Frontend Frameworks (React)", desc: "Build dynamic web UIs using React, hooks, and state management.", mentor: "Aditya Kumar Gautam", resources: ["React Official Documentation"] },
        { step: "Step 4", title: "Backend API & Databases", desc: "Build REST & GraphQL APIs using Node.js/Express and PostgreSQL.", mentor: "Rudra Dudhat", resources: ["Express.js Docs", "PostgreSQL Tutorial"] }
    ],
    appdev: [
        { step: "Step 1", title: "Dart & Flutter Basics", desc: "Understand Flutter architecture and cross-platform UI widgets.", mentor: "Lakshya Soni", resources: ["Flutter Docs", "Dart Language Tour"] },
        { step: "Step 2", title: "State Management", desc: "Master Provider, Riverpod, or BLoC patterns for app state.", mentor: "Kamireddi Jaswanth Kumar", resources: ["Flutter State Management Guide"] }
    ],
    aiml: [
        { step: "Step 1", title: "Python & Data Processing", desc: "Learn NumPy, Pandas, and data analysis fundamentals.", mentor: "Taha Hussain", resources: ["Kaggle Python Course", "Pandas Docs"] },
        { step: "Step 2", title: "Machine Learning Foundations", desc: "Build models using Scikit-Learn and understand core algorithms.", mentor: "Akshat Kansal", resources: ["Scikit-Learn User Guide"] }
    ]
};

function loadTrack(trackKey, evt) {
    if (evt) {
        document.querySelectorAll('.track-btn').forEach(btn => btn.classList.remove('active'));
        evt.target.classList.add('active');
    }

    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    roadmapData[trackKey].forEach((node) => {
        const card = document.createElement('div');
        card.className = 'node-card';
        card.onclick = () => openDrawer(node);
        card.innerHTML = `
            <div class="node-step">${node.step}</div>
            <div class="node-title">${node.title}</div>
            <div class="node-desc">${node.desc}</div>
        `;
        timeline.appendChild(card);
    });
}

function openDrawer(node) {
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerDesc = document.getElementById('drawerDesc');
    const drawerMentor = document.getElementById('drawerMentor');
    const resContainer = document.getElementById('drawerResources');

    if (drawerTitle) drawerTitle.textContent = node.title;
    if (drawerDesc) drawerDesc.textContent = node.desc;
    if (drawerMentor) drawerMentor.textContent = node.mentor;

    if (resContainer) {
        // Rendered as non-clickable styled resource items
        resContainer.innerHTML = node.resources.map(r => `
            <div class="resource-item">
                <span>📖</span> ${r}
            </div>
        `).join('');
    }

    document.getElementById('drawerOverlay')?.classList.add('active');
    document.getElementById('drawer')?.classList.add('active');
}

function closeDrawer() {
    document.getElementById('drawerOverlay')?.classList.remove('active');
    document.getElementById('drawer')?.classList.remove('active');
}

// Automatically populate the default 'webdev' track on homepage load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('timeline')) {
        loadTrack('webdev');
    }
});
async function fetchOpenLakeStats() {
    try {
        const response = await fetch('https://api.github.com/orgs/openlake/repos');
        const repos = await response.json();
        
        if (Array.isArray(repos)) {
            const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
            
            document.getElementById('statStars').textContent = totalStars;
            document.getElementById('statRepos').textContent = repos.length;
            document.getElementById('statForks').textContent = totalForks;
        }
    } catch (err) {
        console.error('Failed to load GitHub stats:', err);
    }
}

document.addEventListener('DOMContentLoaded', fetchOpenLakeStats);
