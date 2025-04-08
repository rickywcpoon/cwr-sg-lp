"use client";

import React from 'react';
import Image from 'next/image'; // Keep next/image
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import shadcn Carousel components
import Autoplay from "embla-carousel-autoplay"; // Optional: Import Autoplay plugin if needed

// Updated slide data: includes captions (Keep this structure)
const slidesData = [
  // Note: The Omega slider was previously removed based on the file content read.
  // If it needs to be added back, uncomment the relevant lines in the original file.
  { image: '/watch-band1-before-and-after.jpg', alt: 'Watch band 1 before and after restoration', caption: 'Rolex Jubilee Bracelet: Before & After Tightening' },
  { image: '/watch-band2-before-and-after.jpg', alt: 'Watch band 2 before and after restoration', caption: 'Vintage Bracelet: Before & After Laser Welding Repair' },
  { image: '/movement1-after.jpeg', alt: 'Watch movement after servicing', caption: 'Meticulously Serviced Movement' },
];

// Define type for slide data
type SlideData = {
  image: string;
  alt: string;
  caption: string;
};

const BeforeAfterCarousel: React.FC = () => {
  // Optional: Setup Autoplay plugin instance
  // const plugin = React.useRef(
  //   Autoplay({ delay: 5000, stopOnInteraction: true })
  // );

  return (
    // Main Carousel component - no card styling by default
    <Carousel
      opts={{
        align: "start",
        loop: true, // Keep loop enabled
      }}
      // plugins={[plugin.current]} // Optional: Add plugins here
      // onMouseEnter={plugin.current.stop} // Optional: Pause on hover
      // onMouseLeave={plugin.current.reset} // Optional: Resume on leave
      className="relative w-full max-w-xl mx-auto" // Added relative positioning
    >
      <CarouselContent>
        {slidesData.map((slide, index) => (
          <CarouselItem key={index}>
            {/* Removed the card-like structure */}
            <div className="flex flex-col justify-center items-center p-1"> {/* Added padding */}
              <Image
                src={slide.image}
                alt={slide.alt}
                width={600} // Keep original dimensions for aspect ratio hint
                height={400}
                className="max-h-[400px] w-auto object-contain rounded" // Keep image styling
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
              <p className="text-center text-sm text-gray-600 mt-2">{slide.caption}</p>
            </div>
          </CarouselItem>
          ))}
          </CarouselContent>
          {/* Use ghost variant for plain arrows */}
          {/* Keep arrows inside container on all sizes, adjust spacing */}
          <CarouselPrevious variant="ghost" className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 text-brand-navy hover:bg-transparent hover:text-brand-navy/80" />
          <CarouselNext variant="ghost" className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 text-brand-navy hover:bg-transparent hover:text-brand-navy/80" />
          {/* Dots are removed as per the request */}
        </Carousel>
      );
};

export default BeforeAfterCarousel;
