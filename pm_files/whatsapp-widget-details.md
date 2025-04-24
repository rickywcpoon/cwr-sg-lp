# Sticky WhatsApp Widget Functionality Details

This document outlines the implementation details of the sticky WhatsApp Call-to-Action (CTA) widget located in the bottom-right corner of the landing page.

## 1. Core Structure (JSX)

The widget consists of a main anchor tag (`#whatsapp-cta`) containing an SVG icon, a tooltip, and a social proof badge.

```jsx
<a
  id="whatsapp-cta"
  href="https://wa.me/6589038755" // Updated WhatsApp link
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-button relative" // Base class for styling and positioning; relative for child positioning
  aria-label="Chat on WhatsApp"
  onClick={() => {
    // GTM event tracking
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_cta_click' });
  }}
>
  {/* WhatsApp Icon (SVG) */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"> {/* Size adjustment */}
    <path d="M.057 24l1...z"/> {/* Path shortened for brevity */}
  </svg>

  {/* Tooltip */}
  <div className="whatsapp-tooltip"> {/* Class for styling and visibility control */}
    Need help with your watch? Chat with us!
  </div>

  {/* Social Proof Badge */}
  <div className="social-proof-badge"> {/* Class for styling and visibility control */}
    100+ inquiries this month
  </div>
</a>

{/* Recent Contact Notification (Separate Element) */}
<div className="recent-contact-notification"> {/* Class for styling and visibility control */}
  {/* Content updated by JavaScript */}
</div>
```

**Key CSS Classes (Defined in `src/app/globals.css`):**

*   `whatsapp-button`: Handles fixed positioning (bottom-right), background color, padding, border-radius, shadow, z-index, etc.
*   `whatsapp-tooltip`: Handles positioning relative to the button, initial hidden state (`opacity: 0`, `visibility: hidden`), background, padding, text styling, transition effects, and the visible state (`opacity: 1`, `visibility: visible`).
*   `social-proof-badge`: Similar to the tooltip, handles positioning, initial hidden state, styling, and transition.
*   `recent-contact-notification`: Handles fixed positioning (usually bottom-left), background, padding, initial hidden state, transition effects, and visible state.

## 2. Timing and Visibility Logic (JavaScript - `useEffect`)

The appearance and disappearance logic for the tooltip, badge, and notification are primarily controlled within a `useEffect` hook in `src/app/page.tsx`.

### a) WhatsApp Tooltip Logic (`toggleWhatsAppTooltip` function)

*   **Goal:** Briefly show a tooltip next to the WhatsApp button periodically to encourage interaction.
*   **Initial Trigger:** Appears 6 seconds after the page loads (`setTimeout`).
*   **Visibility Duration:** Stays visible for 5 seconds (`setTimeout` within `showTooltip`).
*   **Subsequent Triggers:** After the first appearance, it reappears every 30 seconds (`setInterval`).
*   **Implementation:**
    *   Uses `document.querySelector('.whatsapp-tooltip')` to find the element.
    *   Adds/removes a `.visible` class to control appearance based on CSS transitions.
    *   Uses `setTimeout` for the initial delay and hiding, and `setInterval` for recurring appearances.
    *   Includes cleanup logic (`clearTimeout`, `clearInterval`) that runs when the component unmounts.

```javascript
// Inside useEffect(() => { ... }, []);

const toggleWhatsAppTooltip = () => {
  const tooltip = document.querySelector('.whatsapp-tooltip');
  if (!tooltip) return;

  let initialTooltipTimeoutId: NodeJS.Timeout | null = null;
  let tooltipIntervalId: NodeJS.Timeout | null = null;

  const showTooltip = () => {
    tooltip.classList.add('visible');
    // Hide after 5 seconds
    setTimeout(() => {
      tooltip.classList.remove('visible');
    }, 5000);
  };

  // Initial appearance after 6 seconds
  initialTooltipTimeoutId = setTimeout(() => {
    showTooltip();
    // Start subsequent appearances every 30 seconds *after* the first one
    tooltipIntervalId = setInterval(showTooltip, 30000);
  }, 6000); // 6-second delay

  return () => { // Cleanup function
    if (initialTooltipTimeoutId) clearTimeout(initialTooltipTimeoutId);
    if (tooltipIntervalId) clearInterval(tooltipIntervalId);
  };
};

const cleanupTooltip = toggleWhatsAppTooltip();
// ... ensure cleanupTooltip() is called in the main useEffect return
```

### b) Recent Contact Notification & Social Proof Badge Logic (`showRecentContactNotifications` function)

*   **Goal:** Display rotating "social proof" messages in a notification box, and briefly show a badge on the WhatsApp button after the notification disappears.
*   **Notification Content:** Uses a predefined array of 10 messages, shuffled randomly (`shuffleArray`).
*   **Notification Initial Trigger:** First notification appears 10 seconds after page load (`setTimeout`).
*   **Notification Visibility Duration:** Stays visible for 5 seconds (`setTimeout` within `displayNextNotification`).
*   **Notification Subsequent Triggers:** Next notification appears after a random interval between 12 and 20 seconds (`setInterval` with random delay). Cycle repeats after all messages shown.
*   **Badge Trigger:** Appears 1.5 seconds *after* the notification hides (`setTimeout` nested within notification hide logic).
*   **Badge Visibility Duration:** Stays visible for 5 seconds (`setTimeout`).
*   **Implementation:**
    *   Uses `document.querySelector` for notification and badge elements.
    *   Manages content using the `shuffledNotifications` array and `currentIndex`.
    *   Adds/removes a `.visible` class to control appearance based on CSS transitions.
    *   Uses multiple nested `setTimeout` and `setInterval` calls for complex timing.
    *   Includes cleanup logic (`clearTimeout`, `clearInterval`) for all timers.

```javascript
// Inside useEffect(() => { ... }, []);

const showRecentContactNotifications = () => {
  const notificationElement = document.querySelector('.recent-contact-notification');
  if (!notificationElement) return;

  // Array of 10 Singapore-focused messages
  const allNotifications = [ /* ... messages ... */ ];
  const shuffledNotifications = [...allNotifications];
  let currentIndex = 0;
  let notificationIntervalId: NodeJS.Timeout | null = null;
  let notificationHideTimeoutId: NodeJS.Timeout | null = null;
  let badgeShowTimeoutId: NodeJS.Timeout | null = null;
  let badgeHideTimeoutId: NodeJS.Timeout | null = null;
  const badgeElement = document.querySelector('.social-proof-badge'); // Get badge element

  const shuffleArray = (array: string[]) => { /* ... Fisher-Yates ... */ };

  const displayNextNotification = () => {
    // ... (reshuffle logic) ...
    notificationElement.textContent = shuffledNotifications[currentIndex];
    notificationElement.classList.add('visible');
    currentIndex++;

    // Hide notification after 5 seconds
    if (notificationHideTimeoutId) clearTimeout(notificationHideTimeoutId);
    notificationHideTimeoutId = setTimeout(() => {
      notificationElement.classList.remove('visible');

      // --- Badge Logic ---
      if (badgeElement) {
         if (badgeShowTimeoutId) clearTimeout(badgeShowTimeoutId);
         if (badgeHideTimeoutId) clearTimeout(badgeHideTimeoutId);
         // Show badge 1.5 seconds after notification hides
         badgeShowTimeoutId = setTimeout(() => {
           badgeElement.classList.add('visible');
           // Hide badge after 5 seconds
           badgeHideTimeoutId = setTimeout(() => {
             badgeElement.classList.remove('visible');
           }, 5000); // Badge visible duration
         }, 1500); // Delay after notification hides
      }
      // --- End Badge Logic ---

    }, 5000); // Notification visible duration

    // Schedule the next notification display
    if (notificationIntervalId) clearInterval(notificationIntervalId);
    const nextInterval = Math.random() * 8000 + 12000; // Random interval 12-20s
    notificationIntervalId = setInterval(displayNextNotification, nextInterval);
  };

  shuffleArray(shuffledNotifications); // Initial shuffle

  // Show the first notification after a 10-second delay
  const initialTimeoutId = setTimeout(() => {
    displayNextNotification();
  }, 10000);

  return () => { // Cleanup function
    clearTimeout(initialTimeoutId);
    if (notificationIntervalId) clearInterval(notificationIntervalId);
    if (notificationHideTimeoutId) clearTimeout(notificationHideTimeoutId);
    if (badgeShowTimeoutId) clearTimeout(badgeShowTimeoutId);
    if (badgeHideTimeoutId) clearTimeout(badgeHideTimeoutId);
  };
};

const cleanupNotifications = showRecentContactNotifications();
// ... ensure cleanupNotifications() is called in the main useEffect return
```

## 3. Summary for Replication

To replicate this functionality:

1.  **HTML Structure:** Create the anchor tag (`#whatsapp-cta`) with nested SVG, tooltip div, and badge div. Create a separate div for the notification (`.recent-contact-notification`).
2.  **CSS Styling:** Define CSS rules for the base button, tooltip, badge, and notification classes, including positioning, initial hidden states (`opacity: 0`, `visibility: hidden`), and transitions for smooth appearance/disappearance. Define a `.visible` class that sets `opacity: 1` and `visibility: visible`.
3.  **JavaScript Logic:** Implement the timing logic using `useEffect` (or equivalent lifecycle method) with `setTimeout` and `setInterval`. Use `document.querySelector` to target elements and toggle the `.visible` class based on the timing requirements detailed above. Ensure robust cleanup of all timers. 