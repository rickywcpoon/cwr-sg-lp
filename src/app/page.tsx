"use client"; // Add this directive to make it a Client Component

import React, { useState, useEffect, useRef } from 'react'; // Import hooks
import Image from 'next/image'; // Import next/image
import {
  Watch, Settings, Wrench, Sparkles, MessageSquareText, MapPin, CheckCircle, PackageCheck, ShieldCheck, MessageCircle
} from 'lucide-react';
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel'; // Import the new component

export default function Home() {
  // State for header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
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

  const getCurrentYear = () => new Date().getFullYear();

  // Founder's Message (JS variable, quotes are fine here)
  const founderMessage = `"With 40 years dedicated to the art of watchmaking, my passion lies in preserving the legacy of fine timepieces. As the founder of Classic Watch Repair and known to many as the 'Rolex Bracelet Magician,' I understand the trust you place in us. Whether it's a cherished family heirloom or a complex vintage repair others won't touch, our Hong Kong workshop provides world-class expertise. Have questions about your watch? Let's chat directly on WhatsApp – I'm here to offer a free, no-obligation consultation and discuss how we can bring your timepiece back to its full glory."`;

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
      <header
        ref={headerRef}
        className={`px-6 md:px-12 lg:px-24 bg-white shadow-sm sticky top-0 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isHeaderVisible ? 'h-16 opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-full'
        }`}
      >
        <div className="container mx-auto flex justify-center items-center h-full">
          <Image
            src="/logo_CWR_blk.png"
            alt="Classic Watch Repair Logo"
            width={128}
            height={32}
            className="w-auto"
          />
          <nav>
            {/* Navigation links */}
          </nav>
        </div>
      </header>

      <main className="font-sans bg-brand-light text-brand-navy">
        <section id="hero" className="bg-gradient-to-b from-white to-brand-light pb-16 px-6 md:px-12 lg:px-24 text-center">
          <div className="container mx-auto max-w-4xl">
            <div ref={topLogoRef} className="mb-8 flex justify-center pt-[6px]">
              <Image
                src="/logo_CWR_blk-top.png"
                alt="Classic Watch Repair Logo"
                width={800} // Actual image width
                height={410} // Actual image height
                className="w-auto h-24" // Keep display size controlled by CSS
              />
            </div>
            {/* Escaped Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-navy leading-tight animate-fade-slide-in" style={{ animationDelay: '0.2s' }}>
              Restore Your Cherished Timepiece with Singapore's Trusted Classic Watch Specialists.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto animate-fade-slide-in" style={{ animationDelay: '0.4s' }}>
              Experience meticulous care and seamless service for your vintage watch. We specialize in the complex repairs others decline.
            </p>
            <a href="https://wa.me/85260616572" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-brand-gold hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 animate-pulse-on-load" style={{ animationDelay: '0.6s' }}>
              <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
            </a>
            <div className="mt-12 animate-fade-slide-in" style={{ animationDelay: '0.8s' }}>
              <Image
                src="/hero-banner.jpg"
                alt="Close-up of watchmaker's hands repairing a classic watch movement"
                width={800}
                height={450}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section id="concerns" className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Escaped Headline */}
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-brand-navy">Worried About Your Vintage Watch Repair? You're Not Alone.</h2>
            <p className="text-lg mb-12 text-gray-700">We know the anxieties that come with finding the right care for an irreplaceable timepiece.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-brand-light p-6 rounded-lg shadow">
                {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Will they understand my older model?"</h3>
                <p className="text-gray-600">Our focus *is* classic and vintage watches; it's our passion and expertise.</p>
              </div>
              <div className="bg-brand-light p-6 rounded-lg shadow">
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Can I trust them with something so valuable?"</h3>
                <p className="text-gray-600">Trust is paramount. We operate with complete transparency, provide warranties, and treat every watch as if it were our own. With 40 years of founder experience, your watch is in safe hands.</p>
              </div>
              <div className="bg-brand-light p-6 rounded-lg shadow">
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"Are the replacement parts authentic?"</h3>
                <p className="text-gray-600">We prioritize sourcing genuine or period-appropriate parts whenever possible and discuss all options with you upfront.</p>
              </div>
              <div className="bg-brand-light p-6 rounded-lg shadow">
                 {/* Escaped Text */}
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">"What if the delicate band gets damaged?"</h3>
                <p className="text-gray-600">Our unique band restoration service brings even worn straps back to life with care.</p>
              </div>
            </div>
            <p className="mt-12 text-lg text-gray-700">Let Classic Watch Repair alleviate your concerns with proven expertise and a commitment to quality.</p>
          </div>
        </section>

        <section id="declined-repairs" className="py-12 px-6 md:px-12 lg:px-24 bg-brand-light">
          <div className="container mx-auto max-w-3xl text-center bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-brand-navy">Repair Refused Elsewhere?</h3>
            <p className="text-lg text-gray-700">
              Has your vintage timepiece been turned away by other service centers due to age or complexity? Our Hong Kong workshop, led by world-renowned experts, specializes in the intricate restorations others decline. Bring us the challenges others won't touch.
            </p>
          </div>
        </section>

        <section id="before-after" className="py-16 px-6 md:px-12 lg:px-24 bg-white">
           <div className="container mx-auto max-w-4xl text-center">
             <h2 className="text-2xl md:text-3xl font-bold mb-8 text-brand-navy">See the Transformation: Before & After</h2>
             <BeforeAfterCarousel />
           </div>
        </section>

        <section id="solution" className="py-16 px-6 md:px-12 lg:px-24 bg-brand-light">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-brand-navy">Your Solution: Expert Craftsmanship That Brings Your Classic Watch Back to Life.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-12">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <Wrench className="icon-block text-brand-gold" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Complex Repairs</h3>
                <p className="text-gray-600 text-sm">Expert Solutions for Complex Repairs (Even Those Refused Elsewhere).</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <Watch className="icon-block text-brand-gold" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Vintage & Classic Expertise</h3>
                <p className="text-gray-600 text-sm">Deep knowledge of older movements and complex mechanisms.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <Sparkles className="icon-block text-brand-gold" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Band Restoration Magic</h3>
                <p className="text-gray-600 text-sm">Specialized techniques can revive worn or damaged bands.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <Settings className="icon-block text-brand-gold" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Meticulous Servicing</h3>
                <p className="text-gray-600 text-sm">Comprehensive cleaning, oiling, and regulation to restore accuracy.</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <MessageSquareText className="icon-block text-brand-gold" aria-hidden="true" />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Transparent Process</h3>
                <p className="text-gray-600 text-sm">We keep you informed every step of the way.</p>
              </div>
               <div className="hidden lg:block"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Image
                src="/repair-detail-shot.jpg"
                alt="Detailed view of intricate watch repair work in progress"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg object-cover"
              />
              <Image
                src="/band-before-after.jpeg"
                alt="Comparison showing a worn watch band before and after restoration"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section id="process" className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-brand-navy">Our Simple, Secure & Transparent Watch Repair Process</h2>
            <p className="text-lg mb-12 text-center text-gray-700">In partnership with NAXO Timepiece in Singapore.</p>
            <ol className="relative border-s border-brand-gray dark:border-gray-700 ml-6 md:ml-12">
              {/* Added animate-on-scroll class and animation style with delay */}
              <li className="mb-10 ms-8 animate-on-scroll" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards', animationDelay: '0.2s' }}>
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  {/* Icon Placeholder */} <div className="w-5 h-5 bg-white rounded-sm"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy">Initial Consultation (WhatsApp)</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 1</time>
                <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">Tap the chat button to discuss your watch's issue with a Classic Watch Repair specialist and get an initial estimate.</p>
              </li>
              {/* Added animate-on-scroll class and animation style with delay */}
              <li className="mb-10 ms-8 animate-on-scroll" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards', animationDelay: '0.4s' }}>
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  {/* Icon Placeholder */} <div className="w-5 h-5 bg-white rounded-sm"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy">Secure Drop-off (NAXO Timepiece)</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 2</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-400">Bring your watch to our trusted local partner, NAXO Timepiece, at their convenient Tanjong Pagar, Singapore location. They ensure secure handling and logging.</p>
                <Image
                  src="/naxo-logo.png"
                  alt="NAXO Timepiece Logo"
                  width={120}
                  height={40}
                  className="mt-2 w-auto"
                />
              </li>
              {/* Added animate-on-scroll class and animation style with delay */}
              <li className="mb-10 ms-8 animate-on-scroll" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards', animationDelay: '0.6s' }}>
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  {/* Icon Placeholder */} <div className="w-5 h-5 bg-white rounded-sm"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy">Expert Repair <span className="text-sm text-gray-500 ml-2">(Specialist Hong Kong Workshop)</span></h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 3</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-400">Your timepiece receives specialized care at our world-class Hong Kong workshop, leveraging decades of focused vintage expertise.</p>
              </li>
              {/* Added animate-on-scroll class and animation style with delay */}
              <li className="mb-10 ms-8 animate-on-scroll" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards', animationDelay: '0.8s' }}>
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  {/* Icon Placeholder */} <div className="w-5 h-5 bg-white rounded-sm"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy">Updates & Approval</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 4</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-400">We provide detailed updates and confirm any necessary work with you before proceeding.</p>
              </li>
              {/* Added animate-on-scroll class and animation style with delay */}
              <li className="ms-8 animate-on-scroll" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards', animationDelay: '1.0s' }}>
                <span className="absolute flex items-center justify-center w-10 h-10 bg-brand-gold rounded-full -start-5 ring-4 ring-white dark:ring-gray-900 text-white">
                  {/* Icon Placeholder */} <div className="w-5 h-5 bg-white rounded-sm"></div>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-brand-navy">Secure Return & Collection</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">Step 5</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-400">Once completed and quality-checked, your watch is securely returned to NAXO Timepiece for your collection. You'll be notified when it's ready.</p>
              </li>
            </ol>
            <p className="mt-12 text-center text-gray-600">This partnership ensures both convenient local access in Singapore and the focused expertise of our specialized workshop.</p>
          </div>
        </section>

        <section id="trust" className="py-16 px-6 md:px-12 lg:px-24 bg-brand-light">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-brand-navy">Hear From Happy Watch Owners – Our Commitment Proven by Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              <div className="bg-white p-6 rounded-lg shadow text-center md:col-span-2 lg:col-span-1">
                <Image
                  src="/founder.jpeg"
                  alt="Michael Young, Founder of Classic Watch Repair"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">A Message from Our Founder</h3>
                <p className="text-gray-600 italic">{founderMessage}</p>
              </div>

              <div className="space-y-6 md:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-xl mb-4 text-brand-navy text-center md:text-left">What Our Clients Say</h3>
                {testimonials.map((testimonial, index) => (
                  <blockquote key={index} className="bg-white p-6 rounded-lg shadow">
                    {/* Escaped Quote */}
                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p> {/* Increased bottom margin */}
                    <footer className="flex items-center text-sm text-gray-500">
                      {/* Placeholder for Headshot */}
                      <div className="w-8 h-8 rounded-full bg-brand-gray mr-2 flex-shrink-0"></div>
                      - {testimonial.author}
                    </footer>
                  </blockquote>
                ))}
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center space-x-2">
                  <Image
                    src="/google-bubble.png"
                    alt="Google Reviews icon"
                    width={40}
                    height={40}
                    className="w-auto h-10" /* Adjusted height */
                  />
                  <div>
                    {/* Placeholder for Star Rating Graphic */}
                    <div className="text-brand-gold text-xl">★★★★★</div>
                    <p className="text-lg font-semibold text-brand-gold leading-tight">Rated 5.0 / 5 Stars</p>
                    <p className="text-sm text-gray-500 leading-tight">from 468 Google Reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-xl mb-4 text-brand-navy text-center md:text-left">Our Guarantee</h3>
                <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                  {/* Placeholder for Warranty Badge */}
                  <div className="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">6M</div>
                  <ShieldCheck className="icon-guarantee text-brand-gold" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg text-brand-navy">Peace of Mind Warranty</h4>
                    <p className="text-gray-600">All our full services come with a 6 months warranty.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                  <MapPin className="icon-guarantee text-brand-gold" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg text-brand-navy">Secure Handling via NAXO</h4>
                    <p className="text-gray-600">Your timepiece is handled securely through our trusted partner, NAXO Timepiece.</p>
                    <Image
                      src="/naxo-logo.png"
                      alt="NAXO Timepiece Logo"
                      width={72}
                      height={24}
                      className="mt-2 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-gray">
              <h3 className="text-xl font-semibold text-center mb-6 text-brand-navy">Brands We Proudly Service</h3>
              <Image
                src="/brand-logos.jpeg"
                alt="Logos of luxury watch brands serviced, including Rolex, Omega, Patek Philippe, Audemars Piguet, and more"
                width={1024}
                height={150}
                className="w-full max-w-4xl mx-auto"
              />
            </div>

          </div>
        </section>

        <section id="services" className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-brand-navy">Comprehensive Care for Your Classic Timepiece</h2>
            <div className="flex flex-wrap justify-center gap-4 text-gray-700">
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Movement Overhaul</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Vintage Restoration</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Band Repair & Restoration</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Case Polishing</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Water Resistance Testing</span>
              <span className="bg-brand-light px-4 py-2 rounded-full shadow-sm transition duration-300 hover:shadow-md hover:bg-gray-200 cursor-default">Battery Replacement</span>
            </div>
          </div>
        </section>

        <section id="final-cta" className="py-16 px-6 md:px-12 lg:px-24 bg-brand-navy text-white text-center">
          <div className="container mx-auto max-w-3xl">
            {/* Escaped Headline */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Restore Your Classic Watch's Precision & Beauty? Chat With Us Now!</h2>
            {/* Escaped Paragraph */}
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Don't let your treasured timepiece sit idle. Connect with a Classic Watch Repair specialist today for expert advice and a no-obligation consultation. Experience the difference dedicated craftsmanship makes.
            </p>
            <a href="https://wa.me/85260616572" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-brand-gold hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 mb-4">
              <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
            </a>
            <p className="text-sm text-gray-400">
              <a href="#process" className="underline hover:text-white transition duration-300">Learn more about our secure drop-off process with NAXO Timepiece.</a>
            </p>
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
        className="whatsapp-sticky bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-glow-on-load"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="icon-whatsapp text-white" aria-hidden="true" />
      </a>
    </>
  );
}
