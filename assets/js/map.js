/**
 * Interactive Map Module for Friendly Fix Plumbing
 * Uses Leaflet.js for interactive location-based features
 * 
 * @version 1.0.0
 */

(function() {
  'use strict';

  /**
   * Initialize the interactive map
   * Creates a Leaflet map with markers and custom styling
   */
  function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Business location coordinates (example: New York City)
    const businessLocation = [40.7128, -74.0060];
    
    // Initialize map
    const map = L.map('map', {
      center: businessLocation,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false // Prevent accidental scrolling
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="marker-pin">
          <div class="marker-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Add marker for business location
    const marker = L.marker(businessLocation, { icon: customIcon }).addTo(map);

    // Add popup with business information
    const popupContent = `
      <div class="map-popup">
        <h3>Friendly Fix Plumbing</h3>
        <p><strong>Address:</strong> 123 Main Street<br>New York, NY 10001</p>
        <p><strong>Phone:</strong> <a href="tel:+11234567890">(123) 456-7890</a></p>
        <p><strong>Hours:</strong> Mon-Sat 8am-6pm</p>
        <a href="https://maps.google.com/?q=40.7128,-74.0060" target="_blank" class="btn btn-sm">Get Directions</a>
      </div>
    `;
    
    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup'
    });

    // Optional: Add service area circle
    const serviceArea = L.circle(businessLocation, {
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      radius: 8000 // 8km radius
    }).addTo(map);

    serviceArea.bindPopup('Our Service Area');

    // Enable scroll zoom when map is clicked
    map.on('click', function() {
      map.scrollWheelZoom.enable();
    });

    map.on('mouseout', function() {
      map.scrollWheelZoom.disable();
    });

    // Expose map instance for external use
    window.plumbingMap = map;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }

})();
