// Function to scroll the browser tab title continuously
function scrollTitle(titleText, speed = 500) {
  // Add spacing so the end and start of the text don't stick together
  let text = titleText + "   •   "; 

  setInterval(() => {
    // Move the first character to the end of the string
    text = text.substring(1) + text.substring(0, 1);
    document.title = text;
  }, speed);
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


