# Technical Context: CWR Singapore Landing Page

## 1. Core Technologies

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React

## 2. Key Libraries & Integrations

*   `next/image`: Optimized image handling.
*   `next/script`: Integration of third-party scripts (e.g., Google Tag Manager).
*   `next/font`: Local font optimization (Geist Sans, Geist Mono).
*   `react-compare-slider` (or similar, used within `ImageCompareGallery`/`ImageCompareSlider` - *Needs verification*)
*   `embla-carousel-react` (Likely used within `BeforeAfterCarousel` - *Needs verification*)
*   Google Tag Manager (GTM): Analytics and tracking.

## 3. Development Setup & Tooling

*   **Package Manager:** npm (inferred from `package-lock.json`)
*   **Linting/Formatting:** ESLint (config: `eslint.config.mjs`), likely Prettier (standard practice, *Needs verification*)
*   **Build Tool:** Next.js CLI (`next build`, `next dev`, `next start`)
*   **Version Control:** Git (inferred from `.gitignore`)
*   **Configuration:** `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `components.json` (likely for shadcn/ui or similar)

## 4. Deployment

*   **Platform:** Vercel (highly likely, given the use of Next.js). *Needs verification*.

## 5. Technical Constraints & Considerations

*   **Performance:** Emphasis on optimized images (`next/image`, `.webp` format), font loading (`next/font`), script loading (`next/script`), and potentially code splitting (handled by Next.js) for fast load times.
*   **Responsiveness:** Must render correctly and be usable across various screen sizes (mobile-first approach often preferred with Tailwind).
*   **Accessibility:** Use of semantic HTML, ARIA attributes (seen in code), and considerations for reduced motion are important.
*   **SEO:** Metadata defined in `layout.tsx`, semantic HTML, and optimized content contribute to SEO.
*   **Client-Side Interactivity:** Heavy use of React hooks (`useState`, `useEffect`) and direct DOM manipulation (observed in `useEffect` cleanup logic, potentially refactorable) for dynamic UI features. 