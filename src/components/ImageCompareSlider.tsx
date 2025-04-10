"use client";

import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

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
    <div className="rounded-lg overflow-hidden shadow-lg">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeSrc} // Use prop
            alt={`${altPrefix} Before Restoration`} // Use prop
            // Using standard img tag as next/image might conflict with slider positioning/sizing
            // If performance is an issue, consider optimizing images beforehand
            // Or explore if next/image can be styled correctly within this library
            // For now, prioritize functionality with standard img
            // width={800} // Example width
            // height={600} // Example height
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterSrc} // Use prop
            alt={`${altPrefix} After Restoration`} // Use prop
            // width={800}
            // height={600}
          />
        }
        style={{ height: 'auto', maxHeight: '60vh', width: '100%' }} // Adjust height as needed
      />
    </div>
  );
};

export default ImageCompareSliderComponent;
