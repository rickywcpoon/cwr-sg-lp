# System Patterns: CWR Singapore Landing Page

## 1. Architecture

*   **Type:** Single Page Application (SPA) Landing Page.
*   **Framework:** Built using Next.js with the App Router.
*   **Rendering:** Primarily Client-Side Rendering (`"use client"` directive in `page.tsx`) due to the heavy use of React hooks (`useState`, `useEffect`) for interactivity.

## 2. Component Structure

*   **Root Layout (`src/app/layout.tsx`):** Defines the main HTML structure, loads global CSS, fonts (`next/font`), integrates GTM (`next/script`), sets metadata, and renders children.
*   **Page (`src/app/page.tsx`):** The main entry point for the landing page content. Contains:
    *   State management (`useState`) for UI elements (header visibility, popups, modals).
    *   Side effects (`useEffect`) for scroll-based behavior (animations, header, progress bar, active nav), timed elements (popups, tooltips, notifications), and event listener setup/cleanup (testimonials, smooth scroll).
    *   Renders various sections (`<section>`) corresponding to the landing page structure.
    *   Imports and utilizes reusable components from `src/components/`.
*   **Reusable Components (`src/components/`):**
    *   `ImageCompareGallery.tsx`: Displays a collection of before/after images, likely using a comparison slider mechanism internally.
    *   `ImageCompareSlider.tsx`: (Potentially a lower-level component used by the gallery, or a standalone alternative).
    *   `BeforeAfterCarousel.tsx`: Displays images or content in a carousel format (currently commented out in `page.tsx`).
    *   `ImageModal.tsx`: A modal dialog for displaying larger images (used for Google Reviews grid).
    *   `src/components/ui/`: Likely contains generic UI primitives (e.g., Button, Card, Dialog - potentially from shadcn/ui based on `components.json`). *Needs verification*.

## 3. State Management

*   Primarily uses React's built-in `useState` hook within the main `page.tsx` component to manage the state of UI elements like header visibility, popup visibility, and modal open/closed status.
*   No complex global state management library (like Redux, Zustand, or Context API for global state) is apparent in the analyzed files.

## 4. Styling

*   **Tailwind CSS:** Utility-first CSS framework used extensively for styling components directly within the JSX.
*   **Global Styles (`src/app/globals.css`):** Contains base styles, Tailwind directives, custom CSS classes (e.g., for animations, specific component overrides).
*   **CSS Variables:** Potentially defined in `globals.css` for brand colors (e.g., `brand-navy`, `brand-gold`, `brand-light`).
*   **PostCSS (`postcss.config.mjs`):** Processes CSS, likely includes Tailwind and autoprefixer plugins.

## 5. Key Technical Decisions & Patterns

*   **Client-Centric Interactivity:** Extensive use of `useEffect` hooks in `page.tsx` to manage dynamic behaviors based on scroll, time, and user interaction. This centralizes much of the interactive logic but can make the component large.
*   **Direct DOM Manipulation:** Some `useEffect` hooks query the DOM directly (e.g., `document.querySelectorAll`) and attach event listeners. While functional, this can sometimes be less idiomatic in React compared to using refs or state-driven approaches for certain tasks. Cleanup functions are present, which is good practice.
*   **Componentization:** Breaking down UI elements into reusable components (`src/components/`) promotes modularity.
*   **Performance Optimizations:** Utilizing `next/image`, `next/script`, `next/font`, video preloading, and image placeholders (`blurDataURL`) indicates an awareness of web performance best practices.
*   **Accessibility:** Consideration for `prefers-reduced-motion` and use of ARIA attributes show attention to accessibility.
*   **Conditional Rendering:** UI elements like the sticky header, anchor nav, popups, and modals are conditionally rendered based on state.
*   **Throttling:** Scroll event handlers are throttled to improve performance.
*   **Session Storage:** Used to prevent the WhatsApp popup from showing repeatedly within the same session. 