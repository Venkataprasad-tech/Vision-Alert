document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('active');
          this.classList.toggle('open');
      });
  }
  
  // Pricing toggle functionality
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const monthlyPrices = document.querySelectorAll('.price');
  
  if (toggleBtns.length > 0) {
      // Define pricing plans
      const pricingPlans = {
          monthly: {
              basic: '$4.99<span>/month</span>',
              family: '$9.99<span>/month</span>',
              premium: '$19.99<span>/month</span>'
          },
          yearly: {
              basic: '$3.99<span>/month</span>',
              family: '$7.99<span>/month</span>',
              premium: '$15.99<span>/month</span>'
          }
      };
      
      // Set initial prices
      setPrices('monthly');
      
      // Add click event to toggle buttons
      toggleBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              // Remove active class from all buttons
              toggleBtns.forEach(b => b.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              // Determine which pricing to show
              const period = this.textContent.includes('Monthly') ? 'monthly' : 'yearly';
              setPrices(period);
          });
      });
      
      // Function to update prices
      function setPrices(period) {
          const prices = pricingPlans[period];
          document.querySelectorAll('.pricing-card').forEach((card, index) => {
              let plan;
              if (card.querySelector('h3').textContent.includes('Basic')) plan = 'basic';
              else if (card.querySelector('h3').textContent.includes('Family')) plan = 'family';
              else plan = 'premium';
              
              card.querySelector('.price').innerHTML = prices[plan];
          });
      }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (mobileMenu && mobileMenu.classList.contains('active')) {
                  mobileMenu.classList.remove('active');
                  mobileMenuBtn.classList.remove('open');
              }
          }
      });
  });
  
  // Free trial modal functionality
  const freeTrialBtn = document.getElementById('freeTrialBtn');
  const freeTrialModal = document.getElementById('freeTrialModal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  if (freeTrialBtn && freeTrialModal) {
      freeTrialBtn.addEventListener('click', function() {
          freeTrialModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
      });
  }
  
  // Close modal functionality
  if (closeModalBtns.length > 0) {
      closeModalBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              document.querySelectorAll('.modal').forEach(modal => {
                  modal.style.display = 'none';
              });
              document.body.style.overflow = 'auto';
          });
      });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
          e.target.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });
  
  // Form validation for free trial
  const freeTrialForm = document.getElementById('freeTrialForm');
  if (freeTrialForm) {
      freeTrialForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('trial-email').value;
          const password = document.getElementById('trial-password').value;
          
          // Simple validation
          if (!email || !password) {
              alert('Please fill in all fields');
              return;
          }
          
          // In a real implementation, you would send this data to your backend
          console.log('Free trial signup:', { email, password });
          
          // Show success message
          alert('Your free trial has started! Check your email for instructions.');
          
          // Close modal
          freeTrialModal.style.display = 'none';
          document.body.style.overflow = 'auto';
          
          // Reset form
          this.reset();
      });
  }
  
  // Animation on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.feature-card, .pricing-card, .demo-container');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.feature-card, .pricing-card, .demo-container').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Watch Full Demo button functionality
  const watchDemoBtn = document.querySelector('.btn.btn-primary.pulse-effect');
  const videoModal = document.getElementById('videoModal');
  const blurOverlay = document.getElementById('blurOverlay');
  const closeModal = document.getElementById('closeModal');
  const demoVideo = document.getElementById('demoVideo');

  if (watchDemoBtn && videoModal && blurOverlay && closeModal && demoVideo) {
    watchDemoBtn.addEventListener('click', () => {
      blurOverlay.style.display = 'block';
      videoModal.style.display = 'flex';
      demoVideo.muted = true;
      demoVideo.play().then(() => {
        demoVideo.muted = false;
      }).catch(() => {
        console.log('Autoplay prevented, user must click play');
      });
    });

    closeModal.addEventListener('click', () => {
      blurOverlay.style.display = 'none';
      videoModal.style.display = 'none';
      demoVideo.pause();
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        blurOverlay.style.display = 'none';
        videoModal.style.display = 'none';
        demoVideo.pause();
      }
    });
  }
});
