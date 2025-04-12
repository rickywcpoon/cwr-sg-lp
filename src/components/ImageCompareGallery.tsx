"use client";

import React, { useState, useEffect } from 'react'; // Import useEffect
import Image from 'next/image'; // Import next/image
import ImageCompareSliderComponent from './ImageCompareSlider'; // Import the modified slider

// Define the structure for an image pair
interface ImagePair {
  id: string;
  label: string;
  before: string;
  after: string;
  altPrefix: string;
}

// Data structure for the image pairs
const imagePairs: ImagePair[] = [
  { // Omega first
    id: 'omega-mk2',
    label: 'Omega MkII',
    before: '/omega-mark2-slide-before.webp',
    after: '/omega-mark2-slide-after.webp',
    altPrefix: 'Omega Speedmaster Mark II',
  },
  { // AP-b second
    id: 'ap-polish-b',
    label: 'AP Polish Set 2',
    before: '/ap-gold-polish-b-before.webp',
    after: '/ap-gold-polish-b-after.webp',
    altPrefix: 'Audemars Piguet Gold Watch Polish B',
  },
  { // AP-a third
    id: 'ap-polish-a',
    label: 'AP Polish Set 1',
    before: '/ap-gold-polish-a-before.webp',
    after: '/ap-gold-polish-a-after.webp',
    altPrefix: 'Audemars Piguet Gold Watch Polish A',
  },
];

// Helper function to get conditional URL
const getConditionalImageUrl = (baseUrl: string, isMobile: boolean): string => {
  if (isMobile) {
    return baseUrl.replace('.webp', '-mobile.webp');
  }
  return baseUrl;
};


const ImageCompareGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Start with the first pair
  const [isMobile, setIsMobile] = useState(false); // State to track mobile view

  // Effect to check screen size on mount (client-side)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Optional: Update on resize
    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup listener
  }, []); // Empty dependency array ensures this runs only once on mount

  const selectedPair = imagePairs[selectedIndex];

  // Determine the correct image sources based on screen size
  const beforeSrc = getConditionalImageUrl(selectedPair.before, isMobile);
  const afterSrc = getConditionalImageUrl(selectedPair.after, isMobile);

  return (
    <div className="flex flex-col items-center w-full">
      {/* The Slider Component - Pass conditional URLs */}
      <div className="w-full mb-4"> {/* Ensure slider takes width */}
        <ImageCompareSliderComponent
          beforeSrc={beforeSrc}
          afterSrc={afterSrc}
          altPrefix={selectedPair.altPrefix}
        />
      </div>

      {/* Thumbnail Selectors */}
      <div className="flex justify-center space-x-3 sm:space-x-4">
        {imagePairs.map((pair, index) => {
          // Determine the correct thumbnail source based on screen size
          const thumbnailSrc = getConditionalImageUrl(pair.after, isMobile);

          return (
          <button
            key={pair.id}
            onClick={() => setSelectedIndex(index)}
            className={`relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity duration-200 ease-in-out ${
              selectedIndex === index
                ? 'opacity-100 ring-2 ring-blue-600 ring-offset-2' // Active style
                : 'opacity-60 hover:opacity-100' // Inactive style
            }`}
            aria-label={`Select ${pair.label} comparison`}
          >
            <Image
              src={thumbnailSrc} // Use conditional thumbnail source
              alt={`Thumbnail for ${pair.label}`}
              width={96} // Base width (sm:w-24)
              height={80} // Base height (sm:h-20)
              className="w-20 h-16 sm:w-24 sm:h-20 object-cover" // Responsive thumbnail size
              sizes="(max-width: 640px) 80px, 96px" // Added sizes prop for thumbnails
              placeholder="blur" // Add blur placeholder
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Minimal blur placeholder
            />
            {/* Optional: Add a subtle overlay or checkmark for active state */}
            {/* {selectedIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            )} */}
          </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCompareGallery;
