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
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
