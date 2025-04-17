# Project Structure Overview

## Root Directory
- **public/**: Contains publicly accessible files.
- **.git/**: Git version control directory.
- **mcp_server_browser_use.log**: Log file.
- **.next/**: Next.js build output.
- **src/**: Source code directory.
- **pm_files/**: Project management files.
- **package-lock.json**: Dependency tree for npm.
- **node_modules/**: Installed npm packages.
- **package.json**: Project metadata and dependencies.
- **components.json**: Component configuration.
- **jest.config.js**: Jest testing configuration.
- **.gitignore**: Git ignore file.
- **nul**: Placeholder file.
- **eslint.config.mjs**: ESLint configuration.
- **tsconfig.json**: TypeScript configuration.
- **next.config.ts**: Next.js configuration.
- **next-env.d.ts**: Next.js environment types.
- **postcss.config.mjs**: PostCSS configuration.
- **README.md**: Project documentation.

## Source Directory (src)
- **types/**: TypeScript type definitions.
- **app/**: Main application logic.
- **components/**: Reusable UI components.
- **lib/**: Utility functions and helpers.

## Application Directory (src/app)
- **page.tsx**: Main application page.
- **layout.tsx**: Application layout.
- **globals.css**: Global styles.
- **icon.png**: Application icon.

## Components Directory (src/components)
- **ImageCompareGallery.tsx**: Image comparison gallery component.
- **ImageCompareSlider.tsx**: Image comparison slider component.
- **BeforeAfterCarousel.tsx**: Before and after carousel component.
- **ImageModal.tsx**: Image modal component.
- **ui/**: Specific UI elements.

## UI Components Directory (src/components/ui)
- **carousel.tsx**: Carousel UI component.
- **button.tsx**: Button UI component.

## Library Directory (src/lib)
- **utils.ts**: Utility functions.

## Types Directory (src/types)
- **global.d.ts**: Global type definitions.
- **react.d.ts**: React type definitions.

## Project Management Files Directory (pm_files)
- **latest_structure.md**: Overview of the project structure.
- **ab_test_plan_hero_copy.md**: A/B testing plan for hero copy.
- **cwr_sg_lp_rc1_enhancements.md**: Enhancements for release candidate 1.
- **alt_visual_enhance_branch_report.md**: Report on alternative visual enhancements.
- **master_project_update.md**: Updates on the master project.
- **ui_ux_enhancement_specifications.md**: Specifications for UI/UX enhancements.
- **master_project_plan_cwr_lp.md**: Master project plan for the landing page.
- **phase_1_project_brief_classic_watch_repair_singapore_landing_page.md**: Project brief for phase 1 of the landing page.
- **phase_1_market_entry_research_for_classic_watch_repair_singapore.md**: Market entry research for phase 1.

## Social Proof Elements and WhatsApp Integration

### Dynamic Social Proof Components

#### Recent Contact Notifications
- **Component Location**: `src/app/page.tsx`
- **Implementation**:
  ```typescript
  // Recent contact notification system
  const showRecentContactNotifications = () => {
    const notificationElement = document.querySelector('.recent-contact-notification');
    
    // Singapore-focused notification messages
    const allNotifications = [
      'Someone from Singapore 🇸🇬 just contacted us about a vintage Rolex service',
      'A customer from Orchard Road 🇸🇬 just inquired about watch band restoration',
      // ... 8 more location-specific messages
    ];
    
    // State management
    const shuffledNotifications = [...allNotifications];
    let currentIndex = 0;
    let notificationIntervalId = null;
    let notificationHideTimeoutId = null;
    let badgeShowTimeoutId = null;
    let badgeHideTimeoutId = null;
  };
  ```
- **Styling**: Located in `src/app/globals.css`
  ```css
  .recent-contact-notification {
    position: fixed;
    bottom: 30px;
    left: 30px;
    background-color: white;
    border-radius: 8px;
    padding: 12px 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 998;
    transform: translateX(calc(-100% - 40px));
    transition: transform 0.5s ease;
  }
  ```
- **Timing Logic**:
  - Initial delay: 10 seconds
  - Display duration: 5 seconds
  - Interval between notifications: Random 12-20 seconds
  - Message shuffling using Fisher-Yates algorithm

#### Social Proof Badge
- **Component Location**: Adjacent to WhatsApp button
- **Implementation**:
  ```typescript
  // Badge visibility logic tied to notifications
  const badgeElement = document.querySelector('.social-proof-badge');
  // Show badge 1.5s after notification hides
  badgeShowTimeoutId = setTimeout(() => {
    badgeElement.classList.add('visible');
    // Hide badge after 5 seconds
    badgeHideTimeoutId = setTimeout(() => {
      badgeElement.classList.remove('visible');
    }, 5000);
  }, 1500);
  ```
- **Styling**:
  ```css
  .social-proof-badge {
    position: absolute;
    bottom: 10px;
    right: 70px;
    background-color: #f8fafc;
    border: 1px solid #666;
    border-radius: 20px;
    padding: 5px 10px;
    z-index: 1001;
  }
  ```

### WhatsApp Integration Components

#### Main WhatsApp Button
- **Component Location**: Fixed position bottom-right
- **Implementation**:
  ```jsx
  <a 
    href="https://wa.me/85260616572" 
    className="whatsapp-button"
    aria-label="Chat on WhatsApp"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg>...</svg>
    <div className="whatsapp-tooltip">
      Need help with your watch? Chat with us!
    </div>
    <div className="social-proof-badge">
      100+ inquiries this month
    </div>
  </a>
  ```
- **Styling**:
  ```css
  .whatsapp-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    border-radius: 50%;
    z-index: 1000;
  }
  ```

#### WhatsApp Tooltip
- **Component Location**: Above WhatsApp button
- **Timing Logic**:
  - Initial appearance: 6 seconds after page load
  - Display duration: 5 seconds
  - Reappears every: 30 seconds
- **Styling**:
  ```css
  .whatsapp-tooltip {
    position: absolute;
    top: -60px;
    right: 0;
    background-color: white;
    padding: 8px 12px;
    border-radius: 6px;
    z-index: 1001;
  }
  ```

#### Timed WhatsApp Popup
- **Component Location**: Fixed position above WhatsApp button
- **Implementation**:
  ```jsx
  <div className="whatsapp-popup" role="dialog" aria-labelledby="popup-title">
    <button className="whatsapp-popup-close">×</button>
    <h3 id="popup-title">Need Expert Watch Advice?</h3>
    <p>Our master watchmakers are available to answer your questions.</p>
    <a href="https://wa.me/85260616572" className="popup-cta">
      Chat on WhatsApp
    </a>
  </div>
  ```
- **Timing Logic**:
  - Appears after: 30 seconds on page
  - Session storage: Shown once per session
  - Dismissible via close button
- **Styling**:
  ```css
  .whatsapp-popup {
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 280px;
    border: 1px solid #666;
    background-color: white;
    border-radius: 10px;
    z-index: 1001;
  }
  ```

### Static Social Proof Elements

#### Testimonials Section
- **Component Location**: Bottom of page
- **Features**:
  - Expandable testimonials with read more/less functionality
  - Profile photos of testimonial authors
  - Animated 5-star rating display
- **Implementation**:
  ```jsx
  <div className="testimonial-container">
    <div className="testimonial-preview">...</div>
    <div className="testimonial-full" hidden>...</div>
    <footer className="testimonial-author">
      <Image src="/author-photo.webp" />
      <span>Author Name</span>
    </footer>
  </div>
  ```

#### Trust Indicators
- **Location**: Throughout page
- **Elements**:
  - 6-Month Peace of Mind Warranty
  - Secure Handling via NAXO
  - Founder's Message with credentials
  - "Online Now" badge next to WhatsApp buttons

### Mobile Responsiveness
- **WhatsApp Button**:
  ```css
  @media (max-width: 768px) {
    .whatsapp-button {
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
    }
    .whatsapp-popup {
      width: calc(100% - 40px);
      max-width: 280px;
    }
  }
  ```

### Performance Considerations
- Lazy loading of testimonial images
- Reduced motion preferences support
- Cleanup of all intervals and timeouts on unmount
- Session storage for popup state management
- Throttled animation frames for smooth transitions 