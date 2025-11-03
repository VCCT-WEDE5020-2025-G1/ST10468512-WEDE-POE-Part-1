# Testing Guide for JavaScript Enhancements

## Quick Start

### Option 1: View Demo Page
The easiest way to see all features in one place:
1. Open `demo.html` in your browser
2. Test each interactive element in the dedicated sections
3. All features are labeled and explained

### Option 2: Test on Actual Pages
Experience features in context:

#### Services Page (`services.html`)
- ✅ **Tabs:** Click "Repairs & Maintenance", "Installation", "Emergency Services"
- ✅ **Search:** Type in search box (try "leak", "drain", "heater")
- ✅ **Filters:** Click "All", "Emergency", "Residential", "Commercial"
- ✅ **Accordions:** Scroll to FAQ section, click questions
- ✅ **Modals:** Click "Learn More" on any service card
- ✅ **Lightbox:** Click any service image
- ✅ **Load More:** Scroll to bottom, click "Load More Services"

#### Contact Page (`contact.html`)
- ✅ **Interactive Map:** View Leaflet map with custom marker
- ✅ **Map Features:** Click marker for business info popup
- ✅ **Service Area:** See blue circle showing coverage area
- ✅ **Enhanced Form:** Select service type dropdown

#### All Pages
- ✅ **Mobile Nav:** Resize browser or test on mobile
- ✅ **Smooth Scroll:** Click navigation links
- ✅ **Animations:** Scroll to see fade-in effects
- ✅ **Card Hover:** Hover over service cards for tilt effect

---

## Browser Testing Checklist

### Desktop Testing
- [ ] Chrome/Edge (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)

### Mobile Testing
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Test landscape and portrait

### Responsive Breakpoints
- [ ] Desktop (1200px+)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (320px - 768px)

---

## Feature Testing Checklist

### 1. Tabs ✓
- [ ] Click each tab button
- [ ] Content switches correctly
- [ ] Use keyboard arrows to navigate
- [ ] Press Home/End keys
- [ ] Active tab is visually indicated
- [ ] Smooth transition between panels

### 2. Accordions ✓
- [ ] Click to expand first accordion
- [ ] Click to expand second (first should close)
- [ ] Icon rotates on expand/collapse
- [ ] Smooth height animation
- [ ] Content is readable when expanded

### 3. Search ✓
- [ ] Type in search box
- [ ] Results filter in real-time
- [ ] Case-insensitive matching works
- [ ] "No results" message appears when appropriate
- [ ] Clear search shows all items again

### 4. Filters ✓
- [ ] Click each filter button
- [ ] Active button is highlighted
- [ ] Items filter correctly
- [ ] Combine with search
- [ ] "All" button shows everything

### 5. Modals ✓
- [ ] Click "Learn More" button
- [ ] Modal opens with backdrop
- [ ] Click X to close
- [ ] Press ESC to close
- [ ] Click outside to close
- [ ] Body scroll is prevented
- [ ] Focus moves into modal
- [ ] Read content and click "Request Quote"

### 6. Lightbox ✓
- [ ] Click service image
- [ ] Lightbox opens full-screen
- [ ] Image displays correctly
- [ ] Caption shows (from alt text)
- [ ] Click arrow buttons to navigate
- [ ] Use arrow keys to navigate
- [ ] Press ESC to close
- [ ] Click X button to close

### 7. Interactive Map ✓
- [ ] Map loads on contact page
- [ ] Custom marker displays
- [ ] Click marker for popup
- [ ] Popup shows business info
- [ ] "Get Directions" link works
- [ ] Service area circle is visible
- [ ] Click map to enable scroll zoom
- [ ] Map is responsive on mobile

### 8. Animations ✓
- [ ] Scroll down page
- [ ] Cards fade in as they appear
- [ ] Hover over cards for tilt effect
- [ ] Smooth transitions throughout
- [ ] No janky animations
- [ ] Performance is good

### 9. Dynamic Content ✓
- [ ] Click "Load More Services"
- [ ] Button shows loading state
- [ ] New items appear
- [ ] Staggered fade-in animation
- [ ] Button resets after loading

### 10. Mobile Navigation ✓
- [ ] Resize browser to mobile width
- [ ] Hamburger menu appears
- [ ] Click to open menu
- [ ] Menu slides down
- [ ] Click link to navigate
- [ ] Menu closes automatically

---

## Keyboard Accessibility Testing

### Tab Key Navigation
- [ ] Press Tab to move through interactive elements
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] Skip to main content link works

### Keyboard Shortcuts
- [ ] **Tabs:** Arrow Left/Right, Home, End
- [ ] **Lightbox:** Arrow keys for navigation, ESC to close
- [ ] **Modals:** ESC to close, Tab to move through
- [ ] **Accordions:** Enter/Space to toggle
- [ ] **Search:** Type to filter

---

## Performance Testing

### Page Load Speed
- [ ] Open browser DevTools (F12)
- [ ] Go to Network tab
- [ ] Reload page
- [ ] Check total load time (should be < 3 seconds)
- [ ] Leaflet.js CDN loads successfully

### Animation Performance
- [ ] Open Performance tab in DevTools
- [ ] Record while scrolling
- [ ] Check for smooth 60fps
- [ ] No layout thrashing
- [ ] CSS animations are hardware-accelerated

### Memory Usage
- [ ] Open many modals
- [ ] Open lightbox multiple times
- [ ] Check for memory leaks in DevTools

---

## Accessibility Testing

### Screen Reader Testing
- [ ] Enable screen reader (VoiceOver, NVDA, JAWS)
- [ ] Tab through interactive elements
- [ ] Verify ARIA labels are announced
- [ ] Modal focus trap works
- [ ] Tab buttons announce state (selected/not selected)

### Color Contrast
- [ ] All text meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Links are distinguishable
- [ ] Buttons have sufficient contrast

### Zoom Testing
- [ ] Zoom to 200%
- [ ] Content remains readable
- [ ] No horizontal scroll
- [ ] Interactive elements still functional

---

## Error Scenarios

### Edge Cases to Test
- [ ] Search with no results
- [ ] Filter with no matches
- [ ] Click rapidly on tabs/accordions
- [ ] Open multiple modals quickly
- [ ] Resize during modal open
- [ ] Navigate away during "Load More"

### JavaScript Disabled
- [ ] Disable JS in browser
- [ ] Content should still be accessible
- [ ] Forms should still submit
- [ ] Links should still work
- [ ] Progressive enhancement in effect

---

## Browser Console

Check for errors:
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for red error messages
4. All features should work without errors

Expected console logs:
- ✅ "Page load time: XXXms"
- ✅ No error messages
- ✅ Map tiles load successfully

---

## Visual Regression Testing

Compare before/after screenshots:
- [ ] Homepage hero section
- [ ] Services page grid
- [ ] Contact form layout
- [ ] Footer on all pages
- [ ] Mobile navigation menu

---

## Cross-Browser Issues

Common problems to watch for:
- ❌ Modal backdrop blur (Safari older versions)
- ❌ CSS Grid support (IE11 - not supported)
- ❌ Intersection Observer (requires polyfill for IE)
- ❌ Flexbox gaps (Safari < 14.1)

Solutions provided in code with fallbacks.

---

## Debugging Tips

### Feature Not Working?
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify HTML structure matches examples
4. Check CSS is loading correctly
5. Confirm `data-` attributes are present

### Map Not Loading?
1. Check internet connection (CDN required)
2. Verify Leaflet CSS and JS are loading
3. Check console for 404 errors
4. Ensure div has id="map"

### Search Not Filtering?
1. Verify `data-search` on input
2. Check `data-searchable` on items
3. Ensure `data-category` is present
4. Look for typos in attributes

---

## Reporting Issues

If you find a bug:
1. Note which browser and version
2. Describe steps to reproduce
3. Include console error messages
4. Take a screenshot if visual issue
5. Check if issue exists in demo.html

---

## Success Criteria

All enhancements are working if:
- ✅ All interactive elements respond to clicks
- ✅ Keyboard navigation works throughout
- ✅ Animations are smooth (no lag)
- ✅ Mobile experience is good
- ✅ No console errors
- ✅ Accessible to screen readers
- ✅ Map loads and is interactive
- ✅ Search/filter works in real-time
- ✅ Modals and lightbox open/close correctly
- ✅ Page loads in < 3 seconds

---

## Next Steps

After testing:
1. ✅ Fix any issues found
2. ✅ Optimize images for production
3. ✅ Set up analytics tracking
4. ✅ Deploy to staging server
5. ✅ User acceptance testing
6. ✅ Production deployment

---

**Happy Testing! 🚀**

For questions, refer to `JAVASCRIPT_ENHANCEMENTS.md` for detailed documentation.
