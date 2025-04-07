"use client"; // Add this directive to make it a Client Component

import React, { useState, useEffect, useRef } from 'react'; // Import hooks
import Image from 'next/image'; // Import next/image
import {
  Watch, Settings, Wrench, Sparkles, MessageSquareText, MapPin, CheckCircle, PackageCheck, ShieldCheck, MessageCircle, X
} from 'lucide-react'; // Added X icon for popup close
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel'; // Import the carousel
import ImageCompareSliderComponent from '@/components/ImageCompareSlider'; // Import the new slider component

export default function Home() {
  // State for header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  // State for WhatsApp popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // Refs for elements
  const topLogoRef = useRef<HTMLDivElement>(null); // Ref for the top logo container
  const headerRef = useRef<HTMLElement>(null); // Ref for the header

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (topLogoRef.current) {
        const logoBottom = topLogoRef.current.getBoundingClientRect().bottom;
        setIsHeaderVisible(logoBottom <= 0);
      } else {
        setIsHeaderVisible(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect for WhatsApp Tooltip and Popup
  useEffect(() => {
    // WhatsApp Tooltip Toggle
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
      }, 6000); // 6-second delay for first appearance

      return () => {
        if (initialTooltipTimeoutId) clearTimeout(initialTooltipTimeoutId);
        if (tooltipIntervalId) clearInterval(tooltipIntervalId);
      }; // Cleanup interval on unmount
    };

    // Timed WhatsApp Popup
    const showWhatsAppPopup = () => {
      // Check if popup has been shown before in this session
      if (sessionStorage.getItem('popupShown') === 'true') {
        return;
      }

      // Show popup after 30 seconds on page
      const timeoutId = setTimeout(() => {
        setIsPopupVisible(true); // Use state to control visibility for React rendering
      }, 30000);

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    };

    const cleanupTooltip = toggleWhatsAppTooltip();
    const cleanupPopup = showWhatsAppPopup();

    return () => {
      // Only call cleanup functions if they exist
      if (typeof cleanupTooltip === 'function') {
        cleanupTooltip();
      }
      if (typeof cleanupPopup === 'function') {
        cleanupPopup();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for Scroll-triggered Animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      if (!elements.length) return; // Exit if no elements found

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger animation slightly before element is fully in view
      });

      elements.forEach(element => {
        observer.observe(element);
      });

      return () => observer.disconnect(); // Cleanup observer on unmount
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Apply immediate visibility to all animated elements if reduced motion is preferred
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animated'); // Add 'animated' class directly to bypass transition
      });
      return; // Don't initialize observer if reduced motion is preferred
    }

    const cleanupObserver = animateOnScroll();

    return () => {
      if (typeof cleanupObserver === 'function') {
        cleanupObserver();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for Expandable Testimonials & Recent Contact Notifications
  useEffect(() => {
    // Expandable Testimonials
    const initExpandableTestimonials = () => {
      document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const container = (e.target as HTMLElement).closest('.testimonial-container');
          if (container) {
            (container.querySelector('.testimonial-preview') as HTMLElement).hidden = true;
            (container.querySelector('.testimonial-full') as HTMLElement).hidden = false;
          }
        });
      });

      document.querySelectorAll('.read-less-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const container = (e.target as HTMLElement).closest('.testimonial-container');
           if (container) {
            (container.querySelector('.testimonial-preview') as HTMLElement).hidden = false;
            (container.querySelector('.testimonial-full') as HTMLElement).hidden = true;
          }
        });
      });
    };

    // Recent Contact Notifications
    const showRecentContactNotifications = () => {
      const notificationElement = document.querySelector('.recent-contact-notification');
      if (!notificationElement) return;

      // Array of 10 Singapore-focused messages
      const allNotifications = [
        'Someone from Singapore 🇸🇬 just contacted us about a vintage Rolex service',
        'A customer from Orchard Road 🇸🇬 just inquired about watch band restoration',
        'A collector just messaged about servicing their Omega Speedmaster',
        'A client from Bukit Timah 🇸🇬 just asked about restoring a Patek Philippe Calatrava.',
        'Someone in Tanjong Pagar 🇸🇬 inquired about polishing their Audemars Piguet Royal Oak.',
        'A collector from Sentosa Cove 🇸🇬 messaged regarding a complex Jaeger-LeCoultre repair.',
        'Received a query from Marina Bay 🇸🇬 about servicing a vintage Omega Seamaster.',
        'A customer in River Valley 🇸🇬 just contacted us about restoring a Rolex Day-Date bracelet.',
        'Someone from Holland Village 🇸🇬 asked for a quote on a full IWC Pilot\'s Watch overhaul.', // Escaped apostrophe
        'A watch enthusiast in Katong 🇸🇬 inquired about water resistance testing for their TAG Heuer.'
      ];

      const shuffledNotifications = [...allNotifications]; // Copy the array, use const
      let currentIndex = 0;
      let notificationIntervalId: NodeJS.Timeout | null = null;
      let notificationHideTimeoutId: NodeJS.Timeout | null = null;
      let badgeShowTimeoutId: NodeJS.Timeout | null = null;
      let badgeHideTimeoutId: NodeJS.Timeout | null = null;
      const badgeElement = document.querySelector('.social-proof-badge'); // Get badge element

      // Fisher-Yates (aka Knuth) Shuffle function
      const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
      };

      const displayNextNotification = () => {
        if (currentIndex >= shuffledNotifications.length) {
          // Reshuffle when all messages have been shown
          shuffleArray(shuffledNotifications);
          currentIndex = 0;
        }

        notificationElement.textContent = shuffledNotifications[currentIndex];
        notificationElement.classList.add('visible');
        currentIndex++;

        // Hide notification after 5 seconds
        if (notificationHideTimeoutId) clearTimeout(notificationHideTimeoutId); // Clear previous hide timeout
        notificationHideTimeoutId = setTimeout(() => {
          notificationElement.classList.remove('visible');

          // --- Badge Logic ---
          if (badgeElement) {
             // Clear any pending badge timeouts
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
        if (notificationIntervalId) clearInterval(notificationIntervalId); // Clear previous interval
        const nextInterval = Math.random() * 8000 + 12000; // Random interval between 12-20 seconds
        notificationIntervalId = setInterval(displayNextNotification, nextInterval);
      };

      // Initial shuffle
      shuffleArray(shuffledNotifications);

      // Show the first notification after a 6-second delay
      const initialTimeoutId = setTimeout(() => {
        displayNextNotification(); // This will also schedule the next one via setInterval
      }, 6000); // 6-second delay

      return () => {
        // Cleanup all timers on unmount
        clearTimeout(initialTimeoutId);
        if (notificationIntervalId) clearInterval(notificationIntervalId);
        if (notificationHideTimeoutId) clearTimeout(notificationHideTimeoutId);
        if (badgeShowTimeoutId) clearTimeout(badgeShowTimeoutId);
        if (badgeHideTimeoutId) clearTimeout(badgeHideTimeoutId);
      };
    };

    initExpandableTestimonials();
    const cleanupNotifications = showRecentContactNotifications();

    return () => {
       if (typeof cleanupNotifications === 'function') {
         cleanupNotifications();
       }
       // Note: Testimonial listeners don't need explicit cleanup if elements are removed/re-rendered
    };
  }, []); // Run once on mount

  // Effect for Anchor Navigation Active State & Scroll Progress
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.anchor-nav a');

    const updateActiveNavLink = () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100; // Adjust offset as needed
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = sectionId || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    const updateScrollProgress = () => {
      if (!progressBar) return;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    };

    const handleScroll = () => {
      updateActiveNavLink();
      updateScrollProgress();
    };

    // Smooth scroll for anchor links (if not handled by CSS)
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) { // Keep 'function' to access correct 'this' or use currentTarget
          const hrefAttribute = (e.currentTarget as HTMLAnchorElement).getAttribute('href'); // Use e.currentTarget
          if (hrefAttribute && hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
            const targetElement = document.querySelector(hrefAttribute);
            if (targetElement) {
              e.preventDefault();
              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              } else {
                targetElement.scrollIntoView(); // Instant scroll for reduced motion
              }
            }
          }
        });
      });
    };


    window.addEventListener('scroll', handleScroll);
    initSmoothScroll(); // Initialize smooth scroll
    handleScroll(); // Initial call to set state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Remove smooth scroll listeners if necessary (though usually not required)
    };
  }, []); // Run once on mount


  // Removed conflicting Mobile Sticky Header Hide/Show effect
  // The primary header visibility logic controlled by isHeaderVisible state is sufficient


  const closeWhatsAppPopup = () => {
    setIsPopupVisible(false);
    // Don't show again in this session
    sessionStorage.setItem('popupShown', 'true');
  };


  const getCurrentYear = () => new Date().getFullYear();

  // Updated Founder's Message for Barry (Shortened)
  const founderMessage = `"As Managing Partner and a passionate collector, I learned from our founder, Michael Young. We know your watch holds history and personal value. With extensive experience across Asia and Europe, my commitment is to the transparent, expert service Classic Watch Repair is known for. Your watch is in trusted hands for any restoration or service. Reach out via WhatsApp to bring your timepiece back to its best."`;

  // Testimonials (JS variable, quotes are fine here)
  const testimonials = [
    {
      quote: "I recently took my watch in for repair, and I couldn't be happier with the service I received. My watch had a broken ceramic bracelet, and the repair master did an outstanding job renewing it. Not only was he extremely professional, but he also charged a very reasonable price for the work done. I highly recommend this shop to anyone in need of watch repairs. Thank you for the excellent service!",
      author: "Gloria Wong"
    },
    {
      quote: "I had a fantastic experience with Barry, who was both welcoming and transparent throughout the watch diagnosis process. There was no hard selling, and he maintained a high level of professionalism. Given that this watch is a family heirloom, it was crucial for me to find a trustworthy and reliable service. The positive reviews are well-deserved; they did an excellent job with the 18k gold replating, polishing, and servicing. I highly recommend their services!",
      author: "Ho Yuen Tsang"
    }
  ];

  return (
    <>
      {/* Added mobile-header class for targeting, removed h-0/h-16 transition */}
      {/* Made sticky top-0 conditional */}
      <header
        ref={headerRef}
        className={`mobile-header px-6 md:px-12 lg:px-24 bg-white shadow-sm z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isHeaderVisible
            ? 'sticky top-0 opacity-100 translate-y-0 h-16' /* Apply sticky and height only when visible */
            : 'opacity-0 -translate-y-full pointer-events-none h-0' /* Explicitly set height to 0 when hidden */
        }`}
      >
        <div className="container mx-auto flex justify-center items-center h-full">
          <Image
            src="/logo_CWR_blk.png"
            alt="Classic Watch Repair Logo"
            width={128} // Keep width prop
            height={32} // Reinstate height prop
            className="w-auto h-8" // Add h-8 for height control, keep w-auto
          />
          <nav>
            {/* Navigation links */}
          </nav>
        </div>
      </header>

      {/* Anchor Navigation - Conditionally sticky and visible */}
      <nav className={`anchor-nav hidden md:block bg-white shadow-sm z-30 transition-opacity duration-300 ease-in-out ${
          isHeaderVisible
            ? 'sticky top-16 opacity-100' /* Stick below header when visible */
            : 'opacity-0 pointer-events-none' /* Hide when header is hidden */
        }`}>
        <div className="container mx-auto max-w-5xl">
          <ul className="flex justify-center space-x-8 py-2">
            <li><a href="#concerns" className="text-gray-600 hover:text-brand-navy font-medium clickable">Concerns</a></li>
            <li><a href="#solution" className="text-gray-600 hover:text-brand-navy font-medium clickable">Solution</a></li>
            <li><a href="#process" className="text-gray-600 hover:text-brand-navy font-medium clickable">Process</a></li>
            <li><a href="#trust" className="text-gray-600 hover:text-brand-navy font-medium clickable">Trust</a></li>
            <li><a href="#services" className="text-gray-600 hover:text-brand-navy font-medium clickable">Services</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar"></div>
      </div>

      <main className="font-sans bg-brand-light text-brand-navy">
        {/* Added page-section */}
        {/* Removed pt-8 md:pt-16 */}
        {/* Adjusted padding for full-width mobile video */}
        <section id="hero" className="page-section bg-gradient-to-b from-white to-brand-light pb-16 px-0 md:px-6 lg:px-12 xl:px-24 text-center">
          {/* Container for text content remains constrained */}
          <div className="container mx-auto max-w-4xl px-6 md:px-0"> {/* Added padding here for text on mobile */}
            {/* Removed pt-[6px] */}
            <div ref={topLogoRef} className="mb-8 flex justify-center pt-8 md:pt-0"> {/* Added padding top for mobile */}
              {/* Added detail-image class */}
              <div className="detail-image">
                <Image
                  src="/logo_CWR_blk-top.png"
                  alt="Classic Watch Repair Logo"
                  width={800} // Actual image width
                  height={410} // Actual image height
                  className="w-auto h-14 md:h-16" // Mobile: h-14 (~20% smaller than h-16), Desktop: h-16 (~35% smaller than original h-24)
                  priority // Add priority loading
                />
              </div>
            </div>
            {/* Escaped Headline - Apply scroll animation & section-heading */}
            <h1 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-navy leading-tight animate-on-scroll fade-in">
              Restore Your Cherished Timepiece with Singapore's Trusted Classic Watch Specialists.
            </h1>
            {/* Apply scroll animation & body-text */}
            <p className="body-text text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
              Experience meticulous care and seamless service for your vintage watch. We specialize in the complex repairs others decline.
            </p>
            {/* Apply scroll animation & Add container for CTA and Badge - Stack vertically on mobile */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
              <a href="https://wa.me/85260616572" target="_blank" rel="noopener noreferrer" className="cta-button inline-flex items-center justify-center bg-brand-gold hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 btn clickable"> {/* Added clickable */}
                <MessageCircle className="w-6 h-6 md:w-5 md:h-5 mr-2" /> {/* Responsive size */} Chat on WhatsApp
              </a>
              {/* Trust Badge - Added clickable, using Google Bubble Image with 5-star text - Show on mobile */}
              <div className="trust-badge inline-flex clickable"> {/* Removed hidden md:inline-flex */}
                <Image
                  src="/google-bubble.png"
                  alt="Google Reviews icon"
                  width={24} // Corresponds to w-6
                  height={24} // Corresponds to h-6
                  className="w-6 h-6 mr-1" // Increased size
                />
                470+ 5⭐ Reviews {/* Kept 5-star text */}
              </div>
            </div>
            {/* Urgency Trigger */}
            <p className="text-sm text-gray-500 mt-4 animate-on-scroll fade-in" style={{ transitionDelay: '0.3s' }}>
              Limited consultation slots available this week. Chat now!
            </p>
          </div> {/* Close text container */}

          {/* Video container - outside the text container for full width */}
          {/* Apply scroll animation */}
          <div className="mt-8 animate-on-scroll fade-in" style={{ transitionDelay: '0.4s' }}> {/* Adjusted margin and delay */}
            {/* Replaced Image with Video */}
            <video
              src="/watchmaker-at-work.mp4"
              width={1920} // Example width, aspect ratio maintained by object-cover
              height={1080} // Example height
              className="w-full object-cover md:rounded-lg md:shadow-lg" // Full width, cover aspect ratio, rounded/shadow on desktop
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section id="concerns" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Escaped Headline - Apply scroll animation & section-heading */}
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">Worried About Your Vintage Watch Repair? You're Not Alone.</h2>
            {/* Apply scroll animation & body-text */}
            <p className="body-text text-lg mb-12 text-gray-700 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>We know the anxieties that come with finding the right care for an irreplaceable timepiece.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Apply scroll animation & clickable */}
              <div className="bg-brand-light p-6 rounded-lg shadow animate-on-scroll fade-in clickable" style={{ transitionDelay: '0.2s' }}>
                {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Will they understand my older model?"</h3>
                {/* Refined Benefit */}
                <p className="body-text text-gray-600">Our passion *is* classic and vintage watches. We possess the specialized knowledge required for older, intricate movements.</p>
              </div>
              {/* Apply scroll animation & clickable */}
              <div className="bg-brand-light p-6 rounded-lg shadow animate-on-scroll fade-in clickable" style={{ transitionDelay: '0.3s' }}>
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Can I trust them with something so valuable?"</h3>
                 {/* Refined Benefit */}
                <p className="body-text text-gray-600">Absolutely. Our meticulous process ensures your cherished timepiece is handled with the utmost care, returning it safer than when it left. We offer complete transparency and a solid warranty.</p>
              </div>
              {/* Apply scroll animation & clickable */}
              <div className="bg-brand-light p-6 rounded-lg shadow animate-on-scroll fade-in clickable" style={{ transitionDelay: '0.4s' }}>
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Are the replacement parts authentic?"</h3>
                 {/* Refined Benefit */}
                <p className="body-text text-gray-600">We prioritize sourcing genuine or period-appropriate parts and always discuss options with you upfront. Your watch's integrity is our priority.</p>
              </div>
              {/* Apply scroll animation & clickable */}
              <div className="bg-brand-light p-6 rounded-lg shadow animate-on-scroll fade-in clickable" style={{ transitionDelay: '0.5s' }}>
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"What if the delicate band gets damaged?"</h3>
                 {/* Refined Benefit */}
                <p className="body-text text-gray-600">Our renowned "Rolex Bracelet Magician" techniques restore even worn bands with exceptional care, preserving their value and appearance.</p>
              </div>
            </div>
            {/* Apply scroll animation & body-text */}
            <p className="body-text mt-12 text-lg text-gray-700 animate-on-scroll fade-in" style={{ transitionDelay: '0.6s' }}>Let Classic Watch Repair alleviate your concerns with proven expertise and a commitment to quality.</p>
          </div>
        </section>

        <section id="declined-repairs" className="page-section py-12 px-6 md:px-12 lg:px-24 bg-brand-light">
          {/* Apply scroll animation */}
          <div className="container mx-auto max-w-3xl text-center bg-white p-8 rounded-lg shadow-md animate-on-scroll fade-in">
            {/* Added section-heading */}
            <h3 className="section-heading text-2xl font-bold mb-4 text-brand-navy">Repair Refused Elsewhere?</h3>
            {/* Added body-text */}
            <p className="body-text text-lg text-gray-700">
              Has your vintage timepiece been turned away by other service centers due to age or complexity? Our Hong Kong workshop, led by world-renowned experts, specializes in the intricate restorations others decline. Bring us the challenges others won't touch.
            </p>
            {/* Contextual CTA for Declined Repairs */}
            <div className="contextual-cta mt-6">
              {/* Added section-heading */}
              <h4 className="section-heading text-lg font-semibold mb-1">Watch Repair Declined Elsewhere?</h4>
              <p className="text-sm mb-3">Let our specialists take a look. We often succeed where others can't.</p>
              <a href="https://wa.me/85260616572?text=My%20watch%20repair%20was%20declined%20elsewhere,%20can%20you%20help?" className="contextual-whatsapp-btn btn clickable" target="_blank" rel="noopener noreferrer"> {/* Added btn, clickable */}
                <MessageCircle className="w-4 h-4 mr-2" /> Chat About Declined Repair
              </a>
            </div>
          </div>
        </section>

        {/* Renamed section for the Image Comparison Slider */}
        <section id="before-after-slider" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white">
           <div className="container mx-auto max-w-4xl text-center">
             {/* Updated Heading */}
             <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">See the Classic Watch Repair Magic: Before & After</h2>
             {/* Apply scroll animation & Use the new Slider Component */}
             <div className="animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
               <ImageCompareSliderComponent />
             </div>
           </div>
        </section>

        {/* New section for the Carousel */}
        <section id="more-restorations" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-brand-light"> {/* Use bg-brand-light like solution section */}
           <div className="container mx-auto max-w-4xl text-center">
             {/* New Heading */}
             <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">More Beloved Pieces Restored</h2>
             {/* Apply scroll animation & Use the modified Carousel Component */}
             <div className="animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
               <BeforeAfterCarousel /> {/* Carousel now shows remaining images */}
             </div>
           </div>
        </section>

        <section id="solution" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white"> {/* Changed back to bg-white */}
          <div className="container mx-auto max-w-4xl text-center">
            {/* Apply scroll animation & section-heading */}
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">Your Solution: Expert Craftsmanship That Brings Your Classic Watch Back to Life.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-12">
              {/* Applied service-card class */}
              <div className="service-card animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
                <Wrench className="icon-block text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Complex Repairs</h3>
                <p className="body-text text-gray-600 text-sm">Expert Solutions for Complex Repairs (Even Those Refused Elsewhere).</p>
              </div>
              {/* Applied service-card class */}
              <div className="service-card animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
                <Watch className="icon-block text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Vintage & Classic Expertise</h3>
                <p className="body-text text-gray-600 text-sm">Deep knowledge of older movements and complex mechanisms.</p>
              </div>
              {/* Applied service-card class */}
              <div className="service-card animate-on-scroll fade-in" style={{ transitionDelay: '0.3s' }}>
                <Sparkles className="icon-block text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Band Restoration Magic</h3>
                <p className="body-text text-gray-600 text-sm">Specialized techniques can revive worn or damaged bands.</p>
              </div>
              {/* Applied service-card class */}
              <div className="service-card animate-on-scroll fade-in" style={{ transitionDelay: '0.4s' }}>
                <Settings className="icon-block text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Meticulous Servicing</h3>
                <p className="body-text text-gray-600 text-sm">Comprehensive cleaning, oiling, and regulation to restore accuracy.</p>
              </div>
              {/* Applied service-card class */}
               <div className="service-card animate-on-scroll fade-in" style={{ transitionDelay: '0.5s' }}>
                <MessageSquareText className="icon-block text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Transparent Process</h3>
                <p className="body-text text-gray-600 text-sm">We keep you informed every step of the way.</p>
              </div>
               <div className="hidden lg:block"></div> {/* Placeholder remains */}
            </div>
            {/* Apply scroll animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll fade-in" style={{ transitionDelay: '0.6s' }}>
              {/* Added detail-image class */}
              <div className="detail-image">
                <Image
                  src="/repair-detail-shot.jpg"
                  alt="Detailed view of intricate watch repair work in progress"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-lg object-cover"
                  placeholder="blur" // Add blur placeholder
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Minimal blur placeholder
                />
              </div>
              {/* Added detail-image class */}
              <div className="detail-image">
                <Image
                  src="/band-before-after.jpeg"
                  alt="Comparison showing a worn watch band before and after restoration"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-lg object-cover"
                  placeholder="blur" // Add blur placeholder
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Minimal blur placeholder
                />
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl">
            {/* Apply scroll animation & section-heading */}
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-4 text-center text-brand-navy animate-on-scroll fade-in">Our Simple, Secure & Transparent Watch Repair Process</h2>
            {/* Apply scroll animation & body-text */}
            <p className="body-text text-lg mb-12 text-center text-gray-700 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>In partnership with NAXO Timepiece in Singapore.</p>
            <ol className="relative border-s border-brand-gray dark:border-gray-700 ml-6 md:ml-12">
              {/* Reverted ms-12 to ms-8, added ps-8 to text elements */}
              <li className="mb-10 ms-8 process-step animate-on-scroll">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  <MessageSquareText className="w-5 h-5" /> {/* Replaced placeholder */}
                </span>
                {/* Restructured heading for two lines */}
                <h3 className="mb-0 text-lg font-semibold text-brand-navy ps-8">Initial Consultation</h3>
                <span className="block mb-1 text-lg font-semibold text-brand-navy ps-8">(WhatsApp)</span>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500 ps-8">Step 1</time> {/* Added ps-8 */}
                <p className="body-text mb-4 text-base font-normal text-gray-600 dark:text-gray-400 ps-8">Tap the chat button to discuss your watch's issue with a Classic Watch Repair specialist and get an initial estimate.</p> {/* Added ps-8 */}
              </li>
              {/* Reverted ms-12 to ms-8, added ps-8 to text elements */}
              <li className="mb-10 ms-8 process-step animate-on-scroll">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  <MapPin className="w-5 h-5" /> {/* Replaced placeholder */}
                </span>
                {/* Apply ps-8 to the container div */}
                <div className="ps-8">
                  {/* Restructured heading for two lines, added SG */}
                  <h3 className="mb-0 text-lg font-semibold text-brand-navy">Secure Drop-off</h3>
                  <span className="block mb-1 text-lg font-semibold text-brand-navy">(NAXO Timepiece, SG)</span>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 2</time> {/* Removed ps-8 */}
                  <p className="body-text text-base font-normal text-gray-600 dark:text-gray-400">Bring your watch to our trusted local partner, NAXO Timepiece, at their convenient Tanjong Pagar, Singapore location. They ensure secure handling and logging.</p> {/* Removed ps-8 */}
                  <Image
                    src="/naxo-logo.png"
                    alt="NAXO Timepiece Logo"
                    width={120}
                    height={40}
                    className="mt-2 w-auto"
                    // placeholder="blur" // Remove placeholder for small image
                    // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Remove placeholder
                  />
                </div>
              </li>
              {/* Reverted ms-12 to ms-8, added ps-8 to text elements */}
              <li className="mb-10 ms-8 process-step animate-on-scroll">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  <Wrench className="w-5 h-5" /> {/* Replaced placeholder */}
                </span>
                {/* Restructured heading for two lines */}
                <h3 className="mb-0 text-lg font-semibold text-brand-navy ps-8">Expert Repair</h3>
                <span className="block mb-1 text-lg font-semibold text-brand-navy ps-8">(Classic Watch Repair)</span>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500 ps-8">Step 3</time> {/* Added ps-8 */}
                <p className="body-text text-base font-normal text-gray-600 dark:text-gray-400 ps-8">Your timepiece receives specialized care at our world-class Hong Kong workshop, leveraging decades of focused vintage expertise.</p> {/* Added ps-8 */}
              </li>
              {/* Reverted ms-12 to ms-8, added ps-8 to text elements */}
              <li className="mb-10 ms-8 process-step animate-on-scroll">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  <CheckCircle className="w-5 h-5" /> {/* Replaced placeholder */}
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy ps-8">Updates & Approval</h3> {/* Added ps-8 */}
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500 ps-8">Step 4</time> {/* Added ps-8 */}
                <p className="body-text text-base font-normal text-gray-600 dark:text-gray-400 ps-8">We provide detailed updates and confirm any necessary work with you before proceeding.</p> {/* Added ps-8 */}
              </li>
              {/* Reverted ms-12 to ms-8, added ps-8 to text elements */}
              <li className="ms-8 process-step animate-on-scroll">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  <PackageCheck className="w-5 h-5" /> {/* Replaced placeholder */}
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy ps-8">Secure Return & Collection</h3> {/* Added ps-8 */}
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500 ps-8">Step 5</time> {/* Added ps-8 */}
                <p className="body-text text-base font-normal text-gray-600 dark:text-gray-400 ps-8">Once completed and quality-checked, your watch is securely returned to NAXO Timepiece for your collection. You'll be notified when it's ready.</p> {/* Added ps-8 */}
              </li>
            </ol>
            {/* Apply scroll animation */}
            <p className="mt-12 text-center text-gray-600 animate-on-scroll fade-in" style={{ transitionDelay: '0.6s' }}>This partnership ensures both convenient local access in Singapore and the focused expertise of our specialized workshop.</p>

            {/* Contextual CTA for Process */}
            <div className="contextual-cta mt-10 text-center animate-on-scroll fade-in" style={{ transitionDelay: '0.7s' }}>
              {/* Added section-heading */}
              <h4 className="section-heading text-lg font-semibold mb-1">Questions About the Process?</h4>
              <p className="text-sm mb-3">We're happy to clarify how our secure drop-off and repair system works.</p>
              <a href="https://wa.me/85260616572?text=I%20have%20a%20question%20about%20the%20repair%20process." className="contextual-whatsapp-btn btn clickable" target="_blank" rel="noopener noreferrer"> {/* Added btn, clickable */}
                <MessageCircle className="w-4 h-4 mr-2" /> Ask About the Process
              </a>
            </div>
          </div>
        </section>

        <section id="trust" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-brand-light">
          <div className="container mx-auto max-w-5xl">
            {/* Apply scroll animation & section-heading */}
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-12 text-center text-brand-navy animate-on-scroll fade-in">Hear From Happy Watch Owners – Our Commitment Proven by Results</h2>
            {/* Applied trust-section class */}
            <div className="trust-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {/* Apply scroll animation */}
              <div className="bg-white p-6 rounded-lg shadow text-center md:col-span-2 lg:col-span-1 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
                {/* Changed image src, alt text, and ensured rounded-full for circular frame */}
                {/* Removed detail-image class, using background image for better control */}
                <div
                  className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/founder-barry.jpg')",
                    backgroundPosition: 'center 25%', // Adjust vertical position
                  }}
                  role="img" // Add role for accessibility
                  aria-label="Barry, Managing Partner at Classic Watch Repair" // Add label for accessibility
                >
                  {/* Removed Image component */}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">A Message from Our Founder</h3>
                <p className="body-text text-gray-600 italic">{founderMessage}</p>
              </div>

              {/* Apply scroll animation */}
              <div className="space-y-6 md:col-span-2 lg:col-span-1 animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
                <h3 className="font-semibold text-xl mb-4 text-brand-navy text-center md:text-left">What Our Clients Say</h3>
                {testimonials.map((testimonial, index) => (
                  <blockquote key={index} className="bg-white p-6 rounded-lg shadow testimonial-container"> {/* Added testimonial-container */}
                    {/* Expandable Testimonial Structure */}
                    <div className="testimonial-preview">
                      <p className="body-text text-gray-600 italic mb-4 testimonial-text-preview">
                        "{testimonial.quote.substring(0, 100)}..." {/* Show preview */}
                        <button className="read-more-btn text-blue-600 font-medium ml-1">Read More</button>
                      </p>
                    </div>
                    <div className="testimonial-full" hidden>
                      <p className="body-text text-gray-600 italic mb-3 testimonial-text-full">
                        "{testimonial.quote}" {/* Full text */}
                      </p>
                      <button className="read-less-btn text-blue-600 font-medium">Read Less</button>
                    </div>
                    <footer className="flex items-center text-sm text-gray-500 mt-3"> {/* Added margin-top */}
                      {/* Replaced placeholder div with Image */}
                      <Image
                        src={index === 0 ? "/gloria_wong.png" : "/ho-yuen-tsang.png"} // Conditional src
                        alt={`Photo of ${testimonial.author}`} // Dynamic alt text
                        width={40} // Set width (e.g., w-10 = 40px)
                        height={40} // Set height (e.g., h-10 = 40px)
                        className="w-10 h-10 rounded-full mr-3 object-cover flex-shrink-0" // Circular frame, margin, object-fit
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                      - {testimonial.author}
                    </footer>
                  </blockquote>
                ))}
                {/* Apply scroll animation */}
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center space-x-2 animate-on-scroll fade-in" style={{ transitionDelay: '0.3s' }}>
                  {/* Added detail-image class */}
                  <div className="detail-image">
                    <Image
                      src="/google-bubble.png"
                      alt="Google Reviews icon"
                      width={40}
                      height={40}
                      className="w-auto h-10" /* Adjusted height */
                      placeholder="blur" // Add blur placeholder
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Minimal blur placeholder
                    />
                  </div>
                  <div>
                    {/* Animated Review Stars */}
                    {/* Animated Review Stars - Updated Structure */}
                    <div className="review-stars text-brand-gold text-xl" aria-label="5 out of 5 stars">
                      <span className="review-star" aria-hidden="true">★</span>
                      <span className="review-star" aria-hidden="true">★</span>
                      <span className="review-star" aria-hidden="true">★</span>
                      <span className="review-star" aria-hidden="true">★</span>
                      <span className="review-star" aria-hidden="true">★</span>
                    </div>
                    <p className="text-lg font-semibold text-brand-gold leading-tight">Rated 5.0 / 5 Stars</p>
                    <p className="text-sm text-gray-500 leading-tight">from 468 Google Reviews</p>
                  </div>
                </div>
              </div>

              {/* Apply scroll animation */}
              <div className="space-y-6 md:col-span-2 lg:col-span-1 animate-on-scroll fade-in" style={{ transitionDelay: '0.4s' }}>
                <h3 className="font-semibold text-xl mb-4 text-brand-navy text-center md:text-left">Our Guarantee</h3>
                {/* Applied clickable class */}
                <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 clickable">
                  {/* Applied feature-icon class */}
                  <ShieldCheck className="icon-guarantee text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg text-brand-navy">Peace of Mind Warranty</h4>
                    {/* Changed back to 6-Month */}
                    <p className="body-text text-gray-600">**6-Month Peace of Mind Warranty** on all movement repairs. We stand by our craftsmanship.</p>
                    {/* Removed CWR Logo */}
                  </div>
                </div>
                 {/* Applied clickable class */}
                <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 clickable">
                   {/* Applied feature-icon class */}
                  <MapPin className="icon-guarantee text-brand-gold feature-icon animate-on-scroll" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg text-brand-navy">Secure Handling via NAXO</h4>
                    <p className="body-text text-gray-600">Your timepiece is handled securely through our trusted partner, NAXO Timepiece.</p>
                    {/* Removed NAXO Logo */}
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual CTA for Trust/Testimonials */}
            <div className="contextual-cta mt-10 text-center animate-on-scroll fade-in" style={{ transitionDelay: '0.5s' }}>
              {/* Added section-heading */}
              <h4 className="section-heading text-lg font-semibold mb-1">Need Assurance for Your Valuable Watch?</h4>
              <p className="text-sm mb-3">Chat with us about our secure handling, warranty, and expertise.</p>
              <a href="https://wa.me/85260616572?text=I'd%20like%20to%20know%20more%20about%20your%20guarantees%20and%20expertise." className="contextual-whatsapp-btn btn clickable" target="_blank" rel="noopener noreferrer"> {/* Added btn, clickable */}
                <MessageCircle className="w-4 h-4 mr-2" /> Discuss Your Watch Concerns
              </a>
            </div>

            {/* Apply scroll animation */}
            <div className="mt-12 pt-8 border-t border-brand-gray animate-on-scroll fade-in" style={{ transitionDelay: '0.6s' }}> {/* Adjusted delay */}
              {/* Added section-heading */}
              <h3 className="section-heading text-xl font-semibold text-center mb-6 text-brand-navy">Brands We Proudly Service</h3>
              {/* Added detail-image class */}
              <div className="detail-image">
                <Image
                  src="/brand-logos.jpeg"
                  alt="Logos of luxury watch brands serviced, including Rolex, Omega, Patek Philippe, Audemars Piguet, and more"
                  width={1024}
                  height={150}
                  className="w-full max-w-4xl mx-auto"
                  placeholder="blur" // Add blur placeholder
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Minimal blur placeholder
                />
              </div>
            </div>

          </div>
        </section>

        <section id="services" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Apply scroll animation & section-heading */}
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">Comprehensive Care for Your Classic Timepiece</h2>
            {/* Apply scroll animation */}
            <div className="flex flex-wrap justify-center gap-4 text-gray-700 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Movement Overhaul</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Vintage Restoration</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Band Repair & Restoration</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Case Polishing</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Water Resistance Testing</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Battery Replacement</span>
            </div>
          </div>
        </section>

        <section id="final-cta" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-brand-navy text-white text-center">
          <div className="container mx-auto max-w-3xl">
            {/* Escaped Headline - Apply scroll animation & section-heading */}
            <h2 className="section-heading text-3xl md:text-4xl font-bold mb-4 animate-on-scroll fade-in text-white">Ready to Restore Your Classic Watch's Precision & Beauty? Chat With Us Now!</h2> {/* Added text-white */}
            {/* Escaped Paragraph - Apply scroll animation */}
            <p className="text-lg md:text-xl mb-8 text-gray-300 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
              Don't let your treasured timepiece sit idle. Connect with a Classic Watch Repair specialist today for expert advice and a no-obligation consultation. Experience the difference dedicated craftsmanship makes.
            </p>
            {/* Apply scroll animation */}
            <a href="https://wa.me/85260616572" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-brand-gold hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 mb-4 animate-on-scroll fade-in btn clickable" style={{ transitionDelay: '0.2s' }}> {/* Added clickable */}
              <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
              <span className="online-badge">Online Now</span> {/* Added Online Badge */}
            </a>
            {/* Apply scroll animation */}
            <p className="text-sm text-gray-400 animate-on-scroll fade-in" style={{ transitionDelay: '0.3s' }}>
              <a href="#process" className="underline hover:text-white transition duration-300 clickable">Learn more about our secure drop-off process with NAXO Timepiece.</a> {/* Added clickable */}
            </p>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section id="what-next" className="page-section py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="section-heading text-2xl md:text-3xl font-bold mb-8 text-brand-navy animate-on-scroll fade-in">What Happens Next?</h2>
            <ol className="list-decimal list-inside space-y-4 text-left max-w-xl mx-auto text-gray-700 animate-on-scroll fade-in" style={{ transitionDelay: '0.1s' }}>
              <li className="body-text">
                <strong className="text-brand-navy">Initiate Chat:</strong> Click the WhatsApp button below to start a secure conversation with our specialist.
              </li>
              <li className="body-text">
                <strong className="text-brand-navy">Free Consultation:</strong> Discuss your watch's issue, history, and desired service. Get expert advice.
              </li>
              <li className="body-text">
                <strong className="text-brand-navy">Receive Estimate:</strong> Based on the initial chat, receive a preliminary, no-obligation estimate for the work.
              </li>
              <li className="body-text">
                <strong className="text-brand-navy">Convenient Drop-off:</strong> If you proceed, securely drop off your watch at our partner, NAXO Timepiece in Tanjong Pagar.
              </li>
              <li className="body-text">
                <strong className="text-brand-navy">Expert Repair:</strong> Your watch travels securely to our Hong Kong workshop for specialized care by master watchmakers.
              </li>
              <li className="body-text">
                <strong className="text-brand-navy">Secure Return:</strong> Collect your beautifully restored timepiece, backed by our warranty, from NAXO Timepiece.
              </li>
            </ol>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 md:px-12 lg:px-24 bg-gray-100 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p>&copy; {getCurrentYear()} Classic Watch Repair. All Rights Reserved.</p>
          <p className="mt-2">
            {/* Placeholder for Privacy Policy/Terms links */}
          </p>
        </div>
      </footer>

      <a
        id="whatsapp-cta"
        href="https://wa.me/85260616572"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button relative" // Use new class, add relative for positioning children
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"> {/* Adjusted size */}
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>

        {/* Tooltip */}
        <div className="whatsapp-tooltip">
          Need help with your watch? Chat with us!
        </div>

        {/* Social Proof Badge */}
        <div className="social-proof-badge">
          100+ inquiries this month
        </div>
      </a>

      {/* Timed WhatsApp Popup */}
      {isPopupVisible && (
        <div className="whatsapp-popup visible" role="dialog" aria-labelledby="popup-title" aria-modal="true">
          <button
            className="whatsapp-popup-close"
            aria-label="Close popup"
            onClick={closeWhatsAppPopup}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeWhatsAppPopup(); } }}
          >
            <X size={18} /> {/* Use Lucide X icon */}
          </button>
          <h3 id="popup-title" className="text-lg font-semibold mb-2">Need Expert Watch Advice?</h3>
          <p className="text-sm mb-4">
            Our master watchmakers are available to answer your questions about your timepiece.
          </p>
          <a
            href="https://wa.me/85260616572"
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-md"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeWhatsAppPopup} // Close popup when link is clicked
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Recent Contact Notification */}
      <div className="recent-contact-notification">
        {/* Content updated by JavaScript */}
      </div>
    </>
  );
}
