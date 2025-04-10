"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Import next/image
import ImageCompareSliderComponent from './ImageCompareSlider'; // Import the modified slider

// Data structure for the image pairs
const imagePairs = [
  {
    id: 'ap-polish-a',
    label: 'AP Polish Set 1',
    before: '/ap-gold-polish-a-before.webp',
    after: '/ap-gold-polish-a-after.webp',
    altPrefix: 'Audemars Piguet Gold Watch Polish A',
  },
  {
    id: 'ap-polish-b',
    label: 'AP Polish Set 2',
    before: '/ap-gold-polish-b-before.webp',
    after: '/ap-gold-polish-b-after.webp',
    altPrefix: 'Audemars Piguet Gold Watch Polish B',
  },
  {
    id: 'omega-mk2',
    label: 'Omega MkII',
    before: '/omega-mark2-slide-before.webp',
    after: '/omega-mark2-slide-after.webp',
    altPrefix: 'Omega Speedmaster Mark II',
  },
];

const ImageCompareGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Start with the first pair

  const selectedPair = imagePairs[selectedIndex];

  return (
    <div className="flex flex-col items-center w-full">
      {/* The Slider Component */}
      <div className="w-full mb-4"> {/* Ensure slider takes width */}
        <ImageCompareSliderComponent
          beforeSrc={selectedPair.before}
          afterSrc={selectedPair.after}
          altPrefix={selectedPair.altPrefix}
        />
      </div>

      {/* Thumbnail Selectors */}
      <div className="flex justify-center space-x-3 sm:space-x-4">
        {imagePairs.map((pair, index) => (
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
              src={pair.after} // Use 'after' image for thumbnail
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
        ))}
      </div>
    </div>
  );
};

export default ImageCompareGallery;
