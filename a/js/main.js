// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobileMenu');
  const openMenuBtn = document.getElementById('openMenu');
  const closeMenuBtn = document.getElementById('closeMenu');

  if (openMenuBtn && closeMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // FAQ accordion
  const faqButtons = document.querySelectorAll('.faq-button');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('svg');

      // Toggle content
      content.classList.toggle('hidden');

      // Rotate icon
      icon.classList.toggle('rotate-180');
    });
  });

  // Course section accordion
  const sectionButtons = document.querySelectorAll('.section-button');
  sectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('svg');

      // Toggle content visibility
      content.classList.toggle('hidden');

      // Rotate icon when expanded
      icon.classList.toggle('rotate-180');
    });
  });

  // Form validation for signup and login
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      // Simple validation example
      const email = form.querySelector('input[type="email"]');
      const password = form.querySelector('input[type="password"]');

      if (email && !email.value) {
        e.preventDefault();
        alert('Please enter your email address');
        email.focus();
        return false;
      }

      if (password && !password.value) {
        e.preventDefault();
        alert('Please enter your password');
        password.focus();
        return false;
      }

      // For signup form
      if (form.id === 'signupForm') {
        const confirmPassword = form.querySelector('#confirm-password');
        if (confirmPassword && password && password.value !== confirmPassword.value) {
          e.preventDefault();
          alert('Passwords do not match');
          confirmPassword.focus();
          return false;
        }
      }

      return true;
    });
  });

  // Dashboard mobile menu toggle
  const dashboardMenuButton = document.querySelector('.dashboard-menu-button');
  const sidebar = document.querySelector('.sidebar');

  if (dashboardMenuButton && sidebar) {
    dashboardMenuButton.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });
  }

  // Initialize carousels if elements exist
  initializeCarousels();
});

// Course carousel functionality
function initializeCarousels() {
  // Course carousel
  const courses = document.querySelectorAll('.course-card');
  if (courses.length > 0) {
    let currentCourse = 0;

    function showCourse(index) {
      courses.forEach((course, i) => {
        course.classList.toggle('hidden', i !== index);
      });
    }

    window.nextCourse = function () {
      currentCourse = (currentCourse + 1) % courses.length;
      showCourse(currentCourse);
    };

    window.prevCourse = function () {
      currentCourse = (currentCourse - 1 + courses.length) % courses.length;
      showCourse(currentCourse);
    };

    // Initialize
    showCourse(0);
  }

  // Testimonial carousel
  let currentTestimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');

  window.nextTestimonial = function () {
    if (testimonials.length > 0) {
      testimonials[currentTestimonialIndex].classList.add('hidden');
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      testimonials[currentTestimonialIndex].classList.remove('hidden');
    }
  }

  window.prevTestimonial = function () {
    if (testimonials.length > 0) {
      testimonials[currentTestimonialIndex].classList.add('hidden');
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      testimonials[currentTestimonialIndex].classList.remove('hidden');
    }
  }
}