# System Patterns: CWR Singapore Landing Page

## 1. Architecture

*   **Type:** Single Page Application (SPA) Landing Page.
*   **Framework:** Built using Next.js with the App Router.
*   **Rendering:** Primarily Client-Side Rendering (`"use client"` directive in `page.tsx`) due to the heavy use of React hooks (`useState`, `useEffect`) for interactivity.

## 2. Component Structure

*   **Root Layout (`src/app/layout.tsx`):** Defines the main HTML structure, loads global CSS, fonts (`next/font`), integrates GTM (`next/script`), sets metadata, and renders children.
*   **Page (`src/app/page.tsx`):** The main entry point for the landing page content. Contains:
    *   State management (`useState`) for UI elements (header visibility, popups, modals, video visibility).
    *   Side effects (`useEffect`) for scroll-based behavior, timed elements, event listener setup/cleanup, and lazy-loading (hero video).
    *   Renders various sections (`<section>`) corresponding to the landing page structure.
    *   Imports and utilizes reusable components from `src/components/`.
*   **Reusable Components (`src/components/`):**
    *   `ImageCompareGallery.tsx`: Displays a collection of before/after images.
    *   `ImageCompareSlider.tsx`: (Potentially a lower-level component).
    *   `BeforeAfterCarousel.tsx`: Displays images or content in a carousel format (currently commented out).
    *   `ImageModal.tsx`: A modal dialog for displaying larger images.
    *   `src/components/ui/`: Likely contains generic UI primitives (e.g., Button, Card - needs verification).

## 3. State Management

*   Primarily uses React's built-in `useState` hook within the main `page.tsx` component to manage the state of UI elements.
*   No complex global state management library is apparent.

## 4. Styling

*   **Tailwind CSS:** Utility-first CSS framework used extensively.
*   **Global Styles (`src/app/globals.css`):** Contains base styles, Tailwind directives, custom CSS classes.
*   **CSS Variables:** Potentially defined in `globals.css` for brand colors.
*   **PostCSS (`postcss.config.mjs`):** Processes CSS, likely includes Tailwind and autoprefixer plugins.

## 5. Key Technical Decisions & Patterns

*   **Client-Centric Interactivity:** Extensive use of `useEffect` hooks in `page.tsx` to manage dynamic behaviors.
*   **Direct DOM Manipulation:** Some `useEffect` hooks query the DOM directly and attach event listeners. Cleanup functions are present.
*   **Componentization:** Breaking down UI elements into reusable components promotes modularity.
*   **Performance Optimizations:** Utilizing `next/image`, `next/script`, `next/font`, video preloading (now deferred), image placeholders, and event throttling.
*   **LCP Optimization (Image-First):** The hero section renders a prioritized static image first (`next/image` with `priority`) to ensure a fast LCP. The actual video element is lazy-loaded afterwards based on state, removing it from the initial critical rendering path.
*   **Accessibility:** Consideration for `prefers-reduced-motion` and use of ARIA attributes.
*   **Conditional Rendering:** UI elements like the sticky header, anchor nav, popups, modals, and hero video are conditionally rendered based on state.
*   **Throttling:** Scroll event handlers are throttled.
*   **Session Storage:** Used to prevent the WhatsApp popup from showing repeatedly. 