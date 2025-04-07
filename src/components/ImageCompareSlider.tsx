"use client";

import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
// import Image from 'next/image'; // Removed unused import

// Note: react-compare-slider might work best with standard <img> tags
// If using next/image causes issues, revert to standard <img>

const ImageCompareSliderComponent = () => {
  return (
    <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="/omega-before.jpg"
            alt="Omega Speedmaster Before Restoration"
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
            src="/omega-after.jpg"
            alt="Omega Speedmaster After Restoration"
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
