# A/B Testing Plan: Landing Page Hero Heading & Subheading

**Goal:** Determine which of the three heading/subheading combinations performs best in terms of user engagement (e.g., clicks on the WhatsApp button) for traffic coming from Facebook Ads.

**Methodology:** URL Parameter-Based Split Testing

This approach involves sending traffic from different Facebook ads to the same landing page URL but with a unique parameter identifying the variation. The page will then dynamically display the correct heading/subheading based on that parameter.

**Execution Plan:**

1.  **Define Variations:**
    *   **Variation A (Control/Original):**
        *   Heading: `World-Renowned Expertise, Now in Singapore: Classic Watch Repair Restores What Others Refuse`
        *   Subheading: `From vintage Rolex to complex restorations, your treasured timepiece receives unparalleled care from Hong Kong's master craftsmen—now conveniently accessible in Singapore.`
    *   **Variation B:**
        *   Heading: `[Enter Heading for Variation B]`
        *   Subheading: `[Enter Subheading for Variation B]`
    *   **Variation C:**
        *   Heading: `[Enter Heading for Variation C]`
        *   Subheading: `[Enter Subheading for Variation C]`
    *   *(Action Required: User to provide the specific text for Variations B and C)*

2.  **Modify Landing Page (`src/app/page.tsx`):**
    *   Update the code to read a URL query parameter (e.g., `variant`).
    *   Store the three heading/subheading combinations within the component.
    *   Check the `variant` parameter (`a`, `b`, or `c`) from the URL using Next.js client-side hooks (`useSearchParams`).
    *   Dynamically render the corresponding heading and subheading based on the parameter.
    *   Default to Variation A if no `variant` parameter is present or if the value is invalid.
    *   *(Action Required: Developer/Cline to implement this code change)*

3.  **Tracking Setup:**
    *   **Facebook Pixel:** Ensure the Facebook Pixel is correctly installed on the landing page (`src/app/layout.tsx` or via a tag manager). *(Action Required: User/Developer to verify/install)*
    *   **Conversion Events:** Configure the Pixel to track key conversion events, specifically clicks on all WhatsApp buttons (main CTA, contextual CTAs, floating button). This may involve adding code snippets to button `onClick` handlers to fire Pixel events (e.g., `fbq('track', 'Lead');` or a custom event). *(Action Required: User/Developer to configure)*
    *   **(Optional) Google Analytics:** If used, ensure it's set up and consider creating goals/events mirroring the Pixel events for cross-verification. *(Action Required: User/Developer to configure if desired)*

4.  **Facebook Ad Campaign Setup:**
    *   Create the Facebook ad campaign(s) targeting the desired audience.
    *   Create three separate Ad Sets or Ads, one for each variation (A, B, C).
    *   **Set Website URL for each ad:** (Replace `your-landing-page-url.com` with the actual deployed URL)
        *   Ad for Variation A: `https://your-landing-page-url.com/?variant=a`
        *   Ad for Variation B: `https://your-landing-page-url.com/?variant=b`
        *   Ad for Variation C: `https://your-landing-page-url.com/?variant=c`
    *   Keep audience, budget, and ad creative (image/video) consistent across the ads. Only the destination URL parameter should differ.
    *   *(Action Required: User/Marketing Team to set up)*

5.  **Run Test & Analyze:**
    *   Launch the Facebook campaign.
    *   Run the test long enough to gather statistically significant data (consider traffic volume, conversion rate, and desired confidence level).
    *   Monitor performance in Facebook Ads Manager, comparing metrics like:
        *   Landing Page View Rate
        *   Click-Through Rate (CTR)
        *   Conversion Rate (WhatsApp Clicks / Landing Page Views) per variant
        *   Cost per Conversion per variant
    *   Use the `variant` parameter to segment reports in Facebook Analytics or Google Analytics for deeper insights.
    *   Determine the winning combination based on the primary goal (e.g., highest WhatsApp click conversion rate or lowest cost per WhatsApp click).
    *   *(Action Required: User/Marketing Team to monitor and analyze)*

6.  **Implement Winner (Post-Test):**
    *   Once a statistically significant winner is determined, update the landing page (`src/app/page.tsx`) to permanently use the winning heading/subheading combination.
    *   Remove the dynamic parameter logic.
    *   Update all Facebook ads to point to the main URL without the `variant` parameter.
    *   *(Action Required: Developer/Cline and User/Marketing Team)*
