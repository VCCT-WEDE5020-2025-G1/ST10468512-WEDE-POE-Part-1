# JavaScript Enhancements Documentation

## Overview
This document details all the JavaScript enhancements implemented for the Friendly Fix Plumbing website, including interactive elements, dynamic content, animations, and location-based features.

---

## 2.1 Interactive Elements

### 📑 Tabs
**Location:** Services page (`services.html`)

**Features:**
- Switch between service categories (Repairs, Installation, Emergency)
- Keyboard navigation support (Arrow keys, Home, End)
- Smooth transitions between panels
- ARIA attributes for accessibility

**Usage:**
```html
<div class="tabs-container">
  <div class="tabs-header" role="tablist">
    <button class="tab-button active" role="tab">Tab 1</button>
    <button class="tab-button" role="tab">Tab 2</button>
  </div>
  <div class="tab-panel active" role="tabpanel">Content 1</div>
  <div class="tab-panel" role="tabpanel">Content 2</div>
</div>
```

### 🎵 Accordions
**Location:** Services page FAQ section

**Features:**
- Expandable/collapsible content sections
- Smooth height transitions
- Auto-close other panels (single-open mode)
- Multi-open support with `data-multi-open` attribute
- Animated icons

**Usage:**
```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span>Question</span>
      <span class="accordion-icon">▼</span>
    </button>
    <div class="accordion-content">
      <p>Answer content</p>
    </div>
  </div>
</div>
```

### 💬 Modal Dialogs
**Location:** All service detail modals on services page

**Features:**
- Full-screen overlay with backdrop blur
- Click outside to close
- ESC key support
- Focus trap for accessibility
- Slide-in animation
- Prevents body scroll when open

**Usage:**
```html
<!-- Trigger button -->
<button data-modal-target="#modal-id">Open Modal</button>

<!-- Modal structure -->
<div id="modal-id" class="modal">
  <div class="modal-content">
    <button class="modal-close" data-modal-close>&times;</button>
    <h2>Modal Title</h2>
    <p>Modal content...</p>
  </div>
</div>
```

### 🖼️ Lightbox Gallery
**Location:** Service images on services page

**Features:**
- Click any service image to view full-screen
- Image navigation (prev/next buttons)
- Keyboard navigation (Arrow keys, ESC)
- Image captions from alt text
- Smooth fade-in animations
- Mobile-responsive controls

**Usage:**
```html
<img src="image.jpg" alt="Image description" data-lightbox>
```

### 🗺️ Interactive Map (Leaflet.js)
**Location:** Contact page (`contact.html`)

**Features:**
- Interactive OpenStreetMap integration
- Custom branded map markers
- Business location with popup info
- Service area visualization (8km radius)
- Click to enable scroll zoom
- Responsive design
- Direct links to Google Maps for directions

**Libraries Used:**
- Leaflet 1.9.4 (Open-source mapping library)

**Customization:**
To change the business location, edit `/assets/js/map.js`:
```javascript
const businessLocation = [40.7128, -74.0060]; // [latitude, longitude]
```

---

## 2.2 Dynamic Content

### 🔍 Search Functionality
**Location:** Services page

**Features:**
- Real-time search filtering
- Searches through all service cards
- Case-insensitive matching
- Works in combination with category filters
- "No results" message when no matches found
- Smooth fade-in animations for results

**Usage:**
```html
<input type="search" data-search placeholder="Search services..." />

<!-- Searchable items -->
<div class="card" data-searchable data-category="residential emergency">
  Service content...
</div>
```

### 🏷️ Filter System
**Location:** Services page

**Features:**
- Category-based filtering (All, Emergency, Residential, Commercial)
- Visual active state indicators
- Combines with search functionality
- Smooth animations for filtered results
- Multi-category support per item

**Usage:**
```html
<div class="filter-buttons">
  <button class="filter-btn active" data-filter="all">All Services</button>
  <button class="filter-btn" data-filter="emergency">Emergency</button>
</div>
```

### 📦 Dynamic Content Loading
**Location:** Services page "Load More" button

**Features:**
- Simulates loading additional content
- Loading state with disabled button
- Staggered fade-in animation for new items
- Could be connected to an API endpoint

**Usage:**
```html
<button data-load-more data-target=".cards">Load More Services</button>
```

---

## Advanced Animations & Transitions

### 🎨 CSS Animations
1. **Fade In Up** - Cards and content enter from bottom
2. **Modal Slide In** - Modals slide down and fade in
3. **Accordion Expand** - Smooth height transitions
4. **Tab Switch** - Content crossfades between panels

### ✨ JavaScript Animations

#### 1. Parallax Scrolling
Add subtle depth to hero sections:
```html
<div data-parallax="0.5">Content moves at 50% scroll speed</div>
```

#### 2. 3D Card Tilt
Hover effect with perspective transform:
```html
<div class="card" data-tilt>Card with tilt effect</div>
```

#### 3. Counter Animation
Animated number counting:
```html
<span data-counter="1500">0</span> <!-- Animates from 0 to 1500 -->
```

#### 4. Scroll-triggered Animations
Elements fade in as they enter viewport using Intersection Observer API.

---

## DOM Manipulation Techniques

### Advanced Features Implemented:

1. **Dynamic Element Creation**
   - Lightbox structure created on-page-load
   - No-results messages generated dynamically

2. **Event Delegation**
   - Efficient event handling for multiple similar elements
   - Single listeners for tab buttons, filter buttons

3. **State Management**
   - Active states for tabs, accordions, modals
   - Search and filter state coordination

4. **Intersection Observer API**
   - Lazy loading images
   - Scroll-triggered animations
   - Counter animations on visibility

5. **Focus Management**
   - Focus trap in modals
   - Keyboard navigation for tabs
   - Return focus on modal close

---

## Browser Compatibility

All features are compatible with modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Polyfills included for:**
- Intersection Observer API (automatic fallback)
- CSS Grid (graceful degradation)

---

## Performance Optimizations

1. **Lazy Loading** - Images load only when needed
2. **Event Throttling** - Scroll and resize events optimized
3. **CSS Animations** - Hardware-accelerated transforms
4. **Debounced Search** - Prevents excessive filtering
5. **Efficient Selectors** - Cached DOM queries

---

## Accessibility Features

- ✅ ARIA labels and roles on all interactive elements
- ✅ Keyboard navigation support (Tab, Arrow keys, ESC)
- ✅ Focus indicators visible
- ✅ Screen reader announcements
- ✅ Semantic HTML structure
- ✅ Color contrast WCAG AA compliant
- ✅ Skip links for keyboard users

---

## File Structure

```
assets/
├── js/
│   ├── main.js          # Core functionality (37KB, all features)
│   └── map.js           # Leaflet map initialization (3KB)
├── css/
│   └── styles.css       # All styles including interactive elements
└── img/                 # Service images for lightbox

Key Pages:
├── services.html        # Tabs, accordions, modals, lightbox, search
├── contact.html         # Interactive map, enhanced form
└── index.html           # Home page with animations
```

---

## API Integration Examples

### Connecting Search to Backend
```javascript
// In initSearch() function
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  const results = await fetch(`/api/services?q=${query}`);
  const data = await results.json();
  renderResults(data);
});
```

### Dynamic Content from API
```javascript
// In initDynamicContent() function
const response = await fetch('/api/services?page=2');
const newServices = await response.json();
container.innerHTML += renderServices(newServices);
```

---

## Customization Guide

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --brand: #2563eb;        /* Primary color */
  --brand-light: #3b82f6;  /* Hover states */
}
```

### Map Location
Edit `assets/js/map.js`:
```javascript
const businessLocation = [latitude, longitude];
const serviceArea = 8000; // radius in meters
```

### Animation Speed
Adjust CSS variables:
```css
:root {
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
}
```

---

## Testing Checklist

- [ ] Test tabs keyboard navigation
- [ ] Test accordion expand/collapse
- [ ] Test modal open/close (click, ESC, backdrop)
- [ ] Test lightbox navigation
- [ ] Test search functionality
- [ ] Test filter combinations
- [ ] Test on mobile devices
- [ ] Test with screen reader
- [ ] Test map interactions
- [ ] Verify all animations smooth

---

## Future Enhancements

Potential additions:
- Integration with Google Maps API for real-time traffic
- Service booking calendar modal
- Live chat integration
- Virtual tour using 360° images
- Review carousel with star ratings
- Before/after image slider
- Video testimonials modal
- Service cost calculator

---

## Support & Documentation

For questions or issues:
- Check browser console for error messages
- Verify all CDN links are loading (Leaflet.js)
- Ensure JavaScript is enabled
- Test in latest browser versions

**Version:** 3.0.0  
**Last Updated:** 2025  
**Dependencies:** Leaflet.js 1.9.4
