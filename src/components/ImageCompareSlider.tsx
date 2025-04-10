"use client"; // Ensure it's a client component if not already implied

import React from 'react';
import Image from 'next/image'; // Import next/image
import { ReactCompareSlider } from 'react-compare-slider'; // Only need the main slider component

// Define props interface
interface ImageCompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  altPrefix: string;
}

// Note: react-compare-slider might work best with standard <img> tags
// If using next/image causes issues, revert to standard <img>

const ImageCompareSliderComponent: React.FC<ImageCompareSliderProps> = ({
  beforeSrc,
  afterSrc,
  altPrefix,
}) => {
  return (
    // Removed max-w-3xl and mx-auto for edge-to-edge mobile display
    <div className="rounded-lg overflow-hidden shadow-lg relative" style={{ maxHeight: '60vh', width: '100%' }}> {/* Added relative positioning */}
      <ReactCompareSlider
        itemOne={
          // Wrap next/image in a div for the slider item
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={beforeSrc}
              alt={`${altPrefix} Before Restoration`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw" // Adjust sizes as needed
              style={{ objectFit: 'contain' }} // Or 'cover' depending on desired behavior
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
        }
        itemTwo={
          // Wrap next/image in a div for the slider item
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={afterSrc}
              alt={`${altPrefix} After Restoration`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw" // Adjust sizes as needed
              style={{ objectFit: 'contain' }} // Or 'cover' depending on desired behavior
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
        }
        // Apply styles directly to the outer container or manage via className
        // style={{ height: 'auto', maxHeight: '60vh', width: '100%' }} // Removed from here
      />
    </div>
  );
};

export default ImageCompareSliderComponent;
