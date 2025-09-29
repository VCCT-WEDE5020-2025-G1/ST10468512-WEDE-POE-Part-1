# Friendly Fix Plumbing

Modern, accessible, and performant multi-page website for a plumbing business. Built with plain HTML, CSS, and a small amount of vanilla JavaScript. This README documents the current system, the enhancements made, and a process to track future changes.

## Table of contents
- Overview
- Features
- Tech stack
- Project structure
- Getting started
- Development guidance
- Design system
- Components & behavior
- Accessibility
- Performance
- SEO & social sharing
- Analytics placeholder
- Images & media
- Change tracking (future-proof process)
- Changelog
- Roadmap
- License

## Overview
This site focuses on clarity, speed, and usability for customers who need quick access to services and contact options. The codebase favors standards-based technologies for easy hosting and low maintenance.

## Features
- Responsive layout with mobile-first design
- Modern design system (CSS variables for colors, spacing, typography)
- Enhanced header/navigation with mobile menu and keyboard support
- Hero section with clear primary CTAs (Request a Quote, Call Now)
- Service highlights using accessible cards
- Contact page with client-side UX improvements and loading states
- Smooth scrolling and subtle, performance-optimized animations
- Image lazy loading (when using `data-src`)
- Basic performance logging scaffold
- Commented source code for maintainability

## Tech stack
- HTML5 (semantic markup, OG/Twitter meta tags)
- CSS3 (custom properties, grid, flexbox, responsive media queries)
- JavaScript (vanilla ES2015+, no build step required)

## Project structure
```
friendly-fix-plumbing/
  index.html
  services.html
  about.html
  contact.html
  assets/
    css/
      styles.css
    js/
      main.js
    img/
      (images live here)
  content.txt (optional consolidated copy)
```

## Getting started
- No build step required
- Option A: Open `index.html` directly in your browser
- Option B: Serve locally: `python3 -m http.server` → visit http://localhost:8000

## Development guidance
- Edit copy directly in the page HTML files
- Global styles live in `assets/css/styles.css`
- Interactive behavior lives in `assets/js/main.js`
- Prefer semantic HTML for structure and accessibility
- Keep CSS organized by sections, using the existing comment headings

## Design system
Defined via CSS custom properties in `styles.css`:
- Colors: brand palette (blue variants), neutrals, and status colors
- Spacing scale: consistent spacing variables
- Typography scale: rem-based sizes with Inter font
- Radius & shadows: consistent elevation system
- Transitions: timing tokens for consistent, smooth UI

## Components & behavior
- Header & Navigation: sticky header, blurred background, keyboard-accessible mobile nav
- Hero: gradient overlay, responsive typography, primary/secondary CTA buttons
- Cards: accessible, animated hover states; responsive grid
- Forms: focus states with visible ring, loading states on submit, inline notification toasts
- Animations: `fade-in-up` via IntersectionObserver; reduced motion respected
- Lazy loading: observe images with `data-src` and swap into `src` when in view

## Accessibility
- High-contrast palette and focus outlines on inputs
- `aria-label`/`aria-expanded` used for mobile nav toggle
- `prefers-reduced-motion` support for reduced animations
- Clear heading hierarchy; constrained line length for readability

## Performance
- Preconnect and DNS-prefetch for Google Fonts
- Minimal JS; no frameworks/build step
- Lazy loading for images (opt-in via `data-src`)
- Subtle animations with GPU-friendly transforms

## SEO & social sharing
- Document titles and descriptions per page
- Open Graph and Twitter Card metadata in `index.html`
- Use descriptive alt text for images

## Analytics placeholder
`index.html` includes a minimal performance logging example. Replace the console logging with your analytics provider (e.g., Google Analytics, Plausible) if desired.

## Images & media
- Place images in `assets/img/`
- For lazy loading, set `src` to a tiny placeholder (or omit) and set the real path on `data-src`. The script will populate `src` when the image enters the viewport.

### Responsive images (example)
In `services.html`, cards use `<picture>` with `srcset`/`sizes` to deliver appropriate resolutions:

```html
<picture>
  <source srcset="assets/img/leak-640.jpg 640w, assets/img/leak-960.jpg 960w" sizes="(max-width: 768px) 100vw, 33vw">
  <img class="responsive-img" src="assets/img/leak-640.jpg" alt="Leak detection equipment in use">
  </picture>
```

---

## Change tracking (future-proof process)
To keep this documentation evergreen and make future updates easy to follow, use the following lightweight workflow:

1) Commit message style (Conventional Commits)
- `feat: ...` for new features
- `fix: ...` for bug fixes
- `docs: ...` for documentation-only changes
- `style: ...` for code style changes (formatting, etc.)
- `refactor: ...` for code refactors (no functional change)
- `perf: ...` for performance improvements
- `chore: ...` for maintenance tasks

2) Changelog management
- Keep the Changelog section below up to date for each meaningful change
- Use a new dated entry for grouped changes

3) What to record
- A short summary of what changed
- Affected files (or areas)
- Notable developer notes (migration steps, breaking changes, etc.)

4) Release tags (optional)
- Optionally tag milestones in git: `v1.0.0`, `v1.1.0`, etc.

---

## Changelog

See `CHANGELOG.md` for the full history and how to add new entries.

### 2025-09-29
Enhancements across layout, metrics, colors, loading, and usability. Comprehensive code comments added.

Changed
- `assets/css/styles.css`
  - Introduced design tokens (colors, spacing, typography, radius, shadows, transitions)
  - Header/navigation: sticky, backdrop blur, improved hover/active states, mobile menu styles
  - Hero section: gradient overlay, responsive type, CTA layout
  - Buttons: primary/secondary variants, hover shine, elevation
  - Cards: responsive grid, hover elevation with top-accent bar
  - Page layout & typography scale; lists and paragraphs improved
  - Contact form: focus ring, spacing, container card
  - Footer: background, spacing, link hover
  - Loading state utility and spinner
  - Animations (`fade-in-up`) and respects `prefers-reduced-motion`
  - Responsive breakpoints for container, hero, nav, cards, forms, footer
  - Extensive inline documentation comments by section

- `assets/js/main.js`
  - Mobile nav with outside-click close and keyboard Escape handling
  - Smooth scrolling for in-page anchors
  - Contact form submit with loading state and toast notification
  - IntersectionObserver-based scroll animations for cards and headings
  - Image lazy loading for elements with `data-src`
  - Public API scaffold `window.FriendlyFix`
  - Extensive JSDoc and section headers for maintainability

- `index.html`
  - SEO and social meta tags (OG/Twitter)
  - Google Fonts preconnect and Inter family
  - Enhanced hero CTAs (Request a Quote, Call Now)
  - Basic performance logging scaffold
  - Structured, explanatory HTML comments throughout

Notes
- No build tooling added; site remains static and easily hostable
- All enhancements preserve graceful degradation on older browsers

---

## Roadmap
- Optional: service detail pages per offering
- Optional: testimonial/FAQ sections
- Optional: analytics integration and event tracking
- Optional: image compression and srcset for responsive images
- Optional: sitemap.xml and robots.txt

## License
Provided as-is for small business starter sites.

## Link to Github
https://github.com/VCCT-WEDE5020-2025-G1/ST10468512-WEDE-POE-Part-1

## References 
https://www.w3schools.com/css/default.asp

https://www.w3schools.com/html/default.asp

https://www.arlingtontxseptic.com/drain-cleaning/

https://wallpapers.com/plumbing-background?p=2

https://www.icareplumbing.com.au/wp-content/uploads/2020/02/image-7-most-common-plumbing-problems-and-how-to-fix-them.jpg

##Screenshots 
Desktop
<img width="1346" height="603" alt="Screenshot 2025-09-29 211518" src="https://github.com/user-attachments/assets/62154220-8bfb-43cb-85d0-195160c37129" />

<img width="1348" height="609" alt="Screenshot 2025-09-29 211541" src="https://github.com/user-attachments/assets/4298589e-6dd1-416c-ab5b-c94744756a2a" />

<img width="1347" height="601" alt="Screenshot 2025-09-29 211555" src="https://github.com/user-attachments/assets/3f6ac052-30f0-4c67-9594-9d5266eea2c6" />

<img width="1360" height="570" alt="Screenshot 2025-09-29 211608" src="https://github.com/user-attachments/assets/56e67c8d-59c4-44ab-b9c1-1a2b9610a84b" />


Moblie 

<img width="213" height="548" alt="Screenshot 2025-09-29 214649" src="https://github.com/user-attachments/assets/fa174814-b293-4ec6-9fd0-e0b5bc4234f3" />

<img width="215" height="463" alt="Screenshot 2025-09-29 215011" src="https://github.com/user-attachments/assets/0498e6ce-7df7-4eca-b464-1e2ccde024cd" />

<img width="211" height="463" alt="Screenshot 2025-09-29 215334" src="https://github.com/user-attachments/assets/a82347f3-5ff4-4b17-a35f-6f98a056e5c7" />

<img width="213" height="466" alt="Screenshot 2025-09-29 215347" src="https://github.com/user-attachments/assets/b28955f2-b769-4536-9a13-e48b74e74dfe" />


Tablet

<img width="385" height="545" alt="Screenshot 2025-09-29 220849" src="https://github.com/user-attachments/assets/7bf95910-0d15-4b29-b415-ef7bbf0a7bb1" />

<img width="382" height="543" alt="Screenshot 2025-09-29 220942" src="https://github.com/user-attachments/assets/595082f3-eafb-4a22-a5c6-39ada42aa2cd" />

<img width="769" height="534" alt="Screenshot 2025-09-29 221711" src="https://github.com/user-attachments/assets/b66c94a0-d8c4-49b8-ac6e-35fd8a33f083" />

<img width="766" height="529" alt="image" src="https://github.com/user-attachments/assets/ece5e4ba-a97b-4271-b7c0-1b39454d1f7c" />

















