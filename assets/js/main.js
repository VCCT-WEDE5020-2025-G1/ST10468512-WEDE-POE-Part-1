/**
 * Enhanced JavaScript for Friendly Fix Plumbing
 * 
 * This module provides enhanced functionality for the plumbing website including:
 * - Mobile navigation with accessibility features
 * - Smooth scrolling and animations
 * - Form handling with loading states
 * - Performance optimizations
 * - User experience enhancements
 * 
 * @author Friendly Fix Plumbing
 * @version 2.0.0
 */

(function () {
  'use strict';

  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  
  // Cache frequently used DOM elements for better performance
  const toggle = document.querySelector('.nav-toggle');        // Mobile nav toggle button
  const nav = document.querySelector('.site-nav');             // Main navigation menu
  const year = document.getElementById('year');                // Footer year element
  const contactForm = document.querySelector('.contact-form'); // Contact form element
  const cards = document.querySelectorAll('.card');            // All card elements for animations

  // ==========================================================================
  // MOBILE NAVIGATION
  // ==========================================================================
  
  /**
   * Initialize mobile navigation functionality
   * Handles toggle button, outside clicks, and link navigation
   */
  function initMobileNav() {
    // Only initialize if both toggle and nav elements exist
  if (toggle && nav) {
      // Toggle button click handler
    toggle.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
        
        // Add/remove outside click listener based on nav state
        if (isOpen) {
          document.addEventListener('click', closeNavOnOutsideClick);
        } else {
          document.removeEventListener('click', closeNavOnOutsideClick);
        }
      });

      // Close navigation when clicking on any nav link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', closeNavOnOutsideClick);
        });
      });
    }
  }

  /**
   * Handle clicks outside the navigation menu
   * Closes the mobile nav if user clicks outside of it
   * @param {Event} event - The click event
   */
  function closeNavOnOutsideClick(event) {
    // Check if click target is outside both nav and toggle button
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeNavOnOutsideClick);
    }
  }

  // ==========================================================================
  // SMOOTH SCROLLING
  // ==========================================================================
  
  /**
   * Initialize smooth scrolling for anchor links
   * Provides smooth scrolling behavior for internal page links
   */
  function initSmoothScrolling() {
    // Find all anchor links (links starting with #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip empty anchor links
        if (targetId === '#') return;
        
        // Find the target element
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault(); // Prevent default jump behavior
          
          // Smooth scroll to target element
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================================================
  // FORM HANDLING
  // ==========================================================================
  
  /**
   * Initialize contact form with loading states and validation
   * Handles form submission with visual feedback
   */
  function initContactForm() {
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Add loading state to button
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          // Remove loading state
          submitBtn.classList.remove('loading');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Show success notification
          showNotification('Thanks! We\'ll be in touch shortly.', 'success');
          
          // Reset form fields
          this.reset();
        }, 2000);
      });
    }
  }

  // ==========================================================================
  // NOTIFICATION SYSTEM
  // ==========================================================================
  
  /**
   * Show a toast notification to the user
   * @param {string} message - The notification message
   * @param {string} type - The notification type (success, error, info)
   */
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Apply inline styles for immediate display
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '1000',
      transform: 'translateX(100%)',  // Start off-screen
      transition: 'transform 0.3s ease-in-out',
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on notification type
    const colors = {
      success: '#10b981',  // Green for success
      error: '#ef4444',    // Red for errors
      info: '#3b82f6'      // Blue for info
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in from right
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      // Remove from DOM after animation completes
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // ==========================================================================
  // SCROLL ANIMATIONS
  // ==========================================================================
  
  /**
   * Initialize scroll-triggered animations using Intersection Observer
   * Animates elements as they come into view for better user experience
   */
  function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      // Create observer with custom options
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation class when element comes into view
            entry.target.classList.add('fade-in-up');
            // Stop observing this element after animation
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,                    // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'   // Start animation 50px before element is fully visible
      });

      // Observe all card elements
      cards.forEach(card => {
        observer.observe(card);
      });

      // Observe all headings for staggered animations
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        observer.observe(heading);
      });
    }
  }

  // ==========================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ==========================================================================
  
  /**
   * Initialize lazy loading for images to improve page load performance
   * Only loads images when they're about to come into view
   */
  function initLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      // Create image observer
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Load image from data-src attribute
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              // Stop observing this image
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Find all lazy-loaded images
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ==========================================================================
  // KEYBOARD NAVIGATION
  // ==========================================================================
  
  /**
   * Initialize keyboard navigation improvements
   * Provides better accessibility for keyboard users
   */
  function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      // Close mobile navigation with Escape key
      if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus(); // Return focus to toggle button
      }
    });
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  
  /**
   * Initialize all website functionality
   * Sets up all interactive features and enhancements
   */
  function init() {
    // Set current year in footer
    if (year) {
      year.textContent = new Date().getFullYear();
    }

    // Initialize all feature modules
    initMobileNav();           // Mobile navigation functionality
    initSmoothScrolling();     // Smooth scrolling for anchor links
    initContactForm();         // Contact form handling
    initScrollAnimations();    // Scroll-triggered animations
    initLazyLoading();         // Image lazy loading
    initKeyboardNavigation();  // Keyboard accessibility

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
  }

  // ==========================================================================
  // MODULE INITIALIZATION
  // ==========================================================================
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already loaded, initialize immediately
    init();
  }

  // ==========================================================================
  // PUBLIC API
  // ==========================================================================
  
  /**
   * Expose public functions for external use
   * Allows other scripts to interact with the module
   */
  window.FriendlyFix = {
    showNotification,        // Show toast notifications
    initScrollAnimations     // Re-initialize scroll animations
  };

})();


