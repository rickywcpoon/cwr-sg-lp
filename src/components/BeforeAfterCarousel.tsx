"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'; // Import next/image
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'; // Import the new slider

// Basic styling for the carousel - Adjusted button/icon sizes
const carouselStyles = `
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
    /* Removed CSS transition, rely on hook options */
  }
  .embla__slide {
    flex: 0 0 100%; /* Show one slide at a time */
    min-width: 0;
    position: relative;
  }
  .embla__dots {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }
  .embla__dot {
    background-color: transparent;
    cursor: pointer;
    position: relative;
    padding: 0;
    outline: 0;
    border: 0;
    width: 2.4rem;
    height: 2.4rem; /* Keep overall clickable size */
    margin-right: 0.75rem;
    margin-left: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center; /* Center the dot */
  }
  .embla__dot:after {
    /* Spec styles for the visual dot */
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(203, 213, 224, 0.5); /* Light gray, semi-transparent */
    content: '';
    transition: background-color 0.3s ease, transform 0.3s ease; /* Add transitions */
  }
  .embla__dot--selected:after {
    background-color: #3b82f6; /* Blue color from spec */
    transform: scale(1.2); /* Scale up active dot */
  }
  .embla__button { /* Adjusted styles for smaller, subtle buttons */
    outline: 0;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 2.5rem; /* Reduced size */
    height: 2.5rem; /* Reduced size */
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    padding: 0;
    display: flex;
    box-shadow: 0 0 5px rgba(0,0,0,0.15); /* Slightly softer shadow */
  }
  .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }
  .embla__button__svg {
    width: 1.25rem; /* Reduced icon size */
    height: 1.25rem;
    color: #1a2a4a; /* brand-navy */
  }
  .embla__button--prev {
    left: 0.5rem; /* Closer to edge */
  }
  .embla__button--next {
    right: 0.5rem; /* Closer to edge */
  }

  /* Carousel Container styles from spec */
  .carousel-container {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative; /* Ensure buttons are positioned relative to this */
  }
`;

// Updated slide data: includes captions
const slidesData = [
  { image: '/omega-before.jpg', alt: 'Omega watch before restoration', caption: 'Omega Seamaster: Before Restoration' },
  { image: '/omega-after.jpg', alt: 'Omega watch after restoration', caption: 'Omega Seamaster: After Full Restoration & Service' },
  { image: '/watch-band1-before-and-after.jpg', alt: 'Watch band 1 before and after restoration', caption: 'Rolex Jubilee Bracelet: Before & After Tightening' },
  { image: '/watch-band2-before-and-after.jpg', alt: 'Watch band 2 before and after restoration', caption: 'Vintage Bracelet: Before & After Laser Welding Repair' },
  { image: '/movement1-after.jpeg', alt: 'Watch movement after servicing', caption: 'Meticulously Serviced Movement' },
];

// Define new type for slide data
type SlideData = {
  image: string;
  alt: string;
  caption: string;
};

// Define structure for combined slider slide
type SliderSlide = {
  type: 'slider';
  before: SlideData;
  after: SlideData;
  combinedCaption: string;
};

// Define structure for regular image slide
type ImageSlide = {
  type: 'image';
  data: SlideData;
};

// Union type for slides to render
type RenderSlide = SliderSlide | ImageSlide;

// Create the array of slides to render (Removed the first slider element containing Omega images)
const slidesToRender: RenderSlide[] = [
  // { type: 'slider', before: slidesData[0], after: slidesData[1], combinedCaption: 'Omega Seamaster: Before & After Restoration' }, // Removed this line
  { type: 'image', data: slidesData[2] },
  { type: 'image', data: slidesData[3] },
  { type: 'image', data: slidesData[4] },
];


type PropType = {
  // slides prop is no longer used directly for rendering
  options?: EmblaOptionsType;
};

// Prev/Next Button Component using Lucide icons
type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;
  return (
    <button
      className="embla__button embla__button--prev"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Previous slide"
    >
      <ChevronLeft className="embla__button__svg" />
    </button>
  );
};

const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;
  return (
    <button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next slide"
    >
      <ChevronRight className="embla__button__svg" />
    </button>
  );
};


const BeforeAfterCarousel: React.FC<PropType> = (props) => {
  const { options } = props; // Removed slides from props destructuring
  // Trying speed option instead of duration for faster transition
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 10, ...options });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    // Use slidesToRender.length for button disabling logic
    setPrevBtnDisabled(slidesToRender.length <= 1);
    setNextBtnDisabled(slidesToRender.length <= 1);
  }, []); // Removed unnecessary dependency

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <style>{carouselStyles}</style>
      {/* Added carousel-container wrapper */}
      <div className="carousel-container">
        <div className="embla" ref={emblaRef}>
           <div className="embla__container">
             {/* Map over slidesToRender */}
             {slidesToRender.map((slideInfo, index) => (
               <div className="embla__slide" key={index}>
                 <div className="flex flex-col justify-center items-center h-[450px]">
                   {slideInfo.type === 'slider' ? (
                     <>
                       <ReactCompareSlider
                         itemOne={<ReactCompareSliderImage src={slideInfo.before.image} alt={slideInfo.before.alt} />}
                         itemTwo={<ReactCompareSliderImage src={slideInfo.after.image} alt={slideInfo.after.alt} />}
                         style={{ height: '400px', width: '100%', borderRadius: '8px', maxWidth: '600px' }} // Added max-width
                       />
                       <p className="text-center text-sm text-gray-600 mt-2">{slideInfo.combinedCaption}</p>
                     </>
                   ) : (
                     <>
                       <Image
                         src={slideInfo.data.image}
                         alt={slideInfo.data.alt}
                         width={600}
                         height={400}
                         className="max-h-[400px] w-auto object-contain rounded"
                         placeholder="blur"
                         blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                       />
                       <p className="text-center text-sm text-gray-600 mt-2">{slideInfo.data.caption}</p>
                     </>
                   )}
                 </div>
               </div>
             ))}
           </div>

          <PrevButton onClick={scrollPrev} enabled={!prevBtnDisabled} />
          <NextButton onClick={scrollNext} enabled={!nextBtnDisabled} />
        </div>
      </div> {/* End of carousel-container */}

      <div className="embla__dots">
        {/* Use slidesToRender for dots */}
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default BeforeAfterCarousel;
