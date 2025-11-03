/**
 * Enhanced JavaScript for Friendly Fix Plumbing
 * 
 * This module provides enhanced functionality for the plumbing website including:
 * - Mobile navigation with accessibility features
 * - Smooth scrolling and animations
 * - Form handling with loading states
 * - Interactive elements (tabs, accordions, modals)
 * - Image gallery with lightbox
 * - Search and filter functionality
 * - Dynamic content loading
 * - Performance optimizations
 * - User experience enhancements
 * 
 * @author Friendly Fix Plumbing
 * @version 3.0.0
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
    
    // Initialize new interactive features
    initTabs();                // Tab navigation
    initAccordions();          // Accordion panels
    initModals();              // Modal dialogs
    initLightbox();            // Image lightbox gallery
    initSearch();              // Search and filter
    initDynamicContent();      // Dynamic content loading
    initAdvancedAnimations();  // Advanced animations

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
  
  // ==========================================================================
  // TABS FUNCTIONALITY
  // ==========================================================================
  
  /**
   * Initialize tab navigation
   * Allows switching between different content panels
   */
  function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
      const tabButtons = container.querySelectorAll('.tab-button');
      const tabPanels = container.querySelectorAll('.tab-panel');
      
      tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          // Remove active state from all buttons and panels
          tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
          });
          tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
          });
          
          // Add active state to clicked button and corresponding panel
          button.classList.add('active');
          button.setAttribute('aria-selected', 'true');
          tabPanels[index].classList.add('active');
          tabPanels[index].setAttribute('aria-hidden', 'false');
          
          // Animate panel entrance
          tabPanels[index].style.animation = 'fadeInUp 0.3s ease-out';
        });
        
        // Keyboard navigation for tabs
        button.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % tabButtons.length;
          } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
          } else if (e.key === 'Home') {
            newIndex = 0;
          } else if (e.key === 'End') {
            newIndex = tabButtons.length - 1;
          } else {
            return;
          }
          
          e.preventDefault();
          tabButtons[newIndex].click();
          tabButtons[newIndex].focus();
        });
      });
    });
  }

  // ==========================================================================
  // ACCORDION FUNCTIONALITY
  // ==========================================================================
  
  /**
   * Initialize accordion panels
   * Expandable/collapsible content sections
   */
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
      const items = accordion.querySelectorAll('.accordion-item');
      
      items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        if (!header || !content) return;
        
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          
          // Close all other items if not multi-open
          if (!accordion.hasAttribute('data-multi-open')) {
            items.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherItem.querySelector('.accordion-icon');
                if (otherContent) otherContent.style.maxHeight = null;
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
              }
            });
          }
          
          // Toggle current item
          item.classList.toggle('active');
          
          if (isOpen) {
            content.style.maxHeight = null;
            if (icon) icon.style.transform = 'rotate(0deg)';
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) icon.style.transform = 'rotate(180deg)';
          }
        });
      });
    });
  }

  // ==========================================================================
  // MODAL FUNCTIONALITY
  // ==========================================================================
  
  /**
   * Initialize modal dialogs
   * Popup windows for quotes, details, etc.
   */
  function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('[data-modal-close]');
    const modals = document.querySelectorAll('.modal');
    
    // Open modal
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal-target');
        const modal = document.querySelector(modalId);
        
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent body scroll
          
          // Focus trap
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      });
    });
    
    // Close modal
    modalCloses.forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
      });
    });
    
    // Close on backdrop click
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          closeModal(activeModal);
        }
      }
    });
  }
  
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore body scroll
    }
  }

  // ==========================================================================
  // LIGHTBOX GALLERY
  // ==========================================================================
  
  /**
   * Initialize lightbox for image galleries
   * Click to view images in fullscreen
   */
  function initLightbox() {
    // Create lightbox structure if it doesn't exist
    if (!document.querySelector('.lightbox')) {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&larr;</button>
        <button class="lightbox-next" aria-label="Next image">&rarr;</button>
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-image">
          <div class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }
    
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('[data-lightbox]');
    let currentIndex = 0;
    
    // Open lightbox
    galleryImages.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        currentIndex = index;
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Show image in lightbox
    function showLightboxImage() {
      if (galleryImages[currentIndex]) {
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src || img.dataset.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = img.alt || '';
        
        // Update navigation button states
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < galleryImages.length - 1 ? 'block' : 'none';
      }
    }
    
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Navigation
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showLightboxImage();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        showLightboxImage();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        showLightboxImage();
      }
      if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
        currentIndex++;
        showLightboxImage();
      }
    });
  }

  // ==========================================================================
  // SEARCH & FILTER FUNCTIONALITY
  // ==========================================================================
  
  /**
   * Initialize search and filter for content
   * Filter services, products, or events dynamically
   */
  function initSearch() {
    const searchInput = document.querySelector('[data-search]');
    if (!searchInput) return;
    
    const searchableItems = document.querySelectorAll('[data-searchable]');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const noResultsMessage = document.querySelector('.no-results') || createNoResultsMessage();
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;
      
      searchableItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesFilter = checkFilter(item);
        
        if (matchesSearch && matchesFilter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.3s ease-out';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show/hide no results message
      noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        let visibleCount = 0;
        
        searchableItems.forEach(item => {
          const categories = item.getAttribute('data-category');
          const matchesFilter = filter === 'all' || categories.includes(filter);
          const matchesSearch = checkSearch(item, searchInput.value);
          
          if (matchesFilter && matchesSearch) {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.3s ease-out';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });
        
        noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
      });
    });
    
    function checkFilter(item) {
      const activeFilter = document.querySelector('[data-filter].active');
      if (!activeFilter) return true;
      
      const filter = activeFilter.getAttribute('data-filter');
      const categories = item.getAttribute('data-category') || '';
      return filter === 'all' || categories.includes(filter);
    }
    
    function checkSearch(item, query) {
      if (!query) return true;
      const text = item.textContent.toLowerCase();
      return text.includes(query.toLowerCase());
    }
    
    function createNoResultsMessage() {
      const message = document.createElement('div');
      message.className = 'no-results';
      message.style.display = 'none';
      message.innerHTML = '<p>No results found. Try a different search term.</p>';
      const searchContainer = searchInput.closest('.search-container') || document.querySelector('.cards');
      if (searchContainer) {
        searchContainer.parentNode.insertBefore(message, searchContainer.nextSibling);
      }
      return message;
    }
  }

  // ==========================================================================
  // DYNAMIC CONTENT LOADING
  // ==========================================================================
  
  /**
   * Load content dynamically with fade-in animation
   * Simulates loading posts, products, or listings
   */
  function initDynamicContent() {
    const loadMoreButtons = document.querySelectorAll('[data-load-more]');
    
    loadMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const container = document.querySelector(this.getAttribute('data-target'));
        if (!container) return;
        
        // Simulate loading state
        this.classList.add('loading');
        this.disabled = true;
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        
        // Simulate API call delay
        setTimeout(() => {
          // Example: Clone existing items to simulate new content
          const items = container.querySelectorAll('[data-searchable]');
          const newItems = [];
          
          for (let i = 0; i < Math.min(3, items.length); i++) {
            const clone = items[i].cloneNode(true);
            clone.style.opacity = '0';
            container.appendChild(clone);
            newItems.push(clone);
          }
          
          // Animate new items in
          newItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transition = 'opacity 0.5s ease-out';
              item.style.opacity = '1';
            }, index * 100);
          });
          
          // Reset button
          this.classList.remove('loading');
          this.disabled = false;
          this.textContent = originalText;
        }, 1000);
      });
    });
  }

  // ==========================================================================
  // ADVANCED ANIMATIONS
  // ==========================================================================
  
  /**
   * Initialize advanced CSS and JavaScript animations
   * Parallax effects, hover animations, etc.
   */
  function initAdvancedAnimations() {
    // Parallax scrolling effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
          const speed = element.getAttribute('data-parallax') || 0.5;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    }
    
    // Hover tilt effect for cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
    
    // Counter animation
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-counter'));
          animateCounter(counter, 0, target, 2000);
          counterObserver.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }
  
  function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        element.textContent = end;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  /**
   * Expose public functions for external use
   * Allows other scripts to interact with the module
   */
  window.FriendlyFix = {
    showNotification,        // Show toast notifications
    initScrollAnimations,    // Re-initialize scroll animations
    closeModal,              // Close modal programmatically
    initTabs,                // Initialize tabs
    initAccordions,          // Initialize accordions
    initModals,              // Initialize modals
    initLightbox,            // Initialize lightbox
    initSearch,              // Initialize search
    initDynamicContent,      // Initialize dynamic content
    initAdvancedAnimations   // Initialize advanced animations
  };

})();


