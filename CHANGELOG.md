# Changelog

All notable changes to this project will be documented in this file.

Format is inspired by Keep a Changelog, and the project uses Conventional Commits for commit messages.

## [Unreleased]
- Plan and document upcoming changes here.

## [2025-09-29]
### Added
- Comprehensive code comments across `assets/css/styles.css`, `assets/js/main.js`, and `index.html`.
- Hero call-to-action layout with primary (Request a Quote) and secondary (Call Now) buttons.
- Loading state utility and spinner animation.
- IntersectionObserver-based scroll animations (`fade-in-up`).
- Image lazy loading support for images using `data-src`.
- Performance logging scaffold in `index.html`.
- SEO and social meta tags (Open Graph & Twitter Cards) in `index.html`.
 - Services page cards now use `<picture>` with `srcset`/`sizes` for responsive imagery.

### Changed
- Upgraded design system with CSS variables for colors, spacing, typography, radius, shadows, transitions.
- Header: sticky with backdrop blur, improved navigation hover/active states, and mobile menu behavior.
- Hero section: gradient overlay, responsive typography, enhanced contrast.
- Cards: responsive grid, hover elevation with top-accent bar.
- Contact form: focus ring, spacing, card styling; button loading state on submit.
- Footer: subtle background, spacing, and link hover states.
- Responsive breakpoints and refinements for containers, hero, nav, cards, forms, footer.

### Notes
- No build step required; the site remains a static, easily hostable project.
- Animations respect `prefers-reduced-motion` for accessibility.

---

### How to add future entries
1. Create a new section under `[Unreleased]` while developing; move entries to a dated release when published.
2. Use headings like `### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Security`.
3. Keep entries concise; reference affected files or areas when helpful.
