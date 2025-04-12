# GTM & Meta Pixel Tracking Setup for CTA Clicks

This document outlines the Google Tag Manager (GTM) configuration required to track clicks on specific Call-to-Action (CTA) buttons on the website and send a corresponding event to Meta Pixel.

## 1. GTM Trigger Configuration

This trigger fires when a user clicks on any of the main CTA buttons, including the sticky WhatsApp button.

*   **Trigger Type:** Click - All Elements
*   **This trigger fires on:** Some Clicks
*   **Fire this trigger when an Event occurs and all of these conditions are true:**
    *   `Click Element` `matches CSS selector` `.cta-button, .cta-button *, .contextual-whatsapp-btn, .contextual-whatsapp-btn *, #final-cta .btn, #final-cta .btn *, #whatsapp-cta, #whatsapp-cta *`

**Explanation of CSS Selector:**

*   `.cta-button, .cta-button *`: Matches the main hero CTA button or any element inside it (like the icon).
*   `.contextual-whatsapp-btn, .contextual-whatsapp-btn *`: Matches the contextual WhatsApp buttons or any element inside them.
*   `#final-cta .btn, #final-cta .btn *`: Matches the button within the final CTA section or any element inside that button.
*   `#whatsapp-cta, #whatsapp-cta *`: Matches the sticky WhatsApp button or any element inside it.

This ensures the trigger fires even if the user clicks directly on an icon within the button, rather than the button background itself.

## 2. GTM Tag Configuration (Meta Pixel)

This tag sends an event to Meta Pixel when the trigger above fires.

*   **Tag Type:** Meta Pixel (or your specific Meta Pixel template)
*   **Event Name:** `Contact`
*   **Firing Triggers:** Select the trigger configured in Step 1.

**Note on Meta Event Name:**

*   We are using the standard Meta Pixel event `Contact` as these button clicks represent an initiation of contact (via WhatsApp). If you prefer to use `Lead` or a custom event name, update the **Event Name** field in the GTM Tag configuration accordingly.

## 3. Testing

After configuring the trigger and tag:

1.  Enable GTM's **Preview Mode**.
2.  Navigate to your website.
3.  Click on each of the different CTA buttons targeted by the CSS selector.
4.  Check the GTM Preview debug panel to confirm that your Meta Pixel tag fires correctly for each button click.
5.  Verify in your Meta Events Manager that the `Contact` events are being received.
