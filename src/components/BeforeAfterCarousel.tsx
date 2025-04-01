"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'; // Import next/image

// Basic styling for the carousel - Adjusted button/icon sizes
const carouselStyles = `
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
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
    height: 2.4rem;
    margin-right: 0.75rem;
    margin-left: 0.75rem;
    display: flex;
    align-items: center;
  }
  .embla__dot:after {
    background-color: #e5e7eb; /* brand-gray */
    width: 100%;
    height: 0.3rem;
    border-radius: 0.2rem;
    content: '';
  }
  .embla__dot--selected:after {
    background-color: #b48c5a; /* brand-gold */
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
  caption: string; // Added caption field
};

type PropType = {
  slides?: SlideData[];
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
  const { slides = slidesData, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options });
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
    setPrevBtnDisabled(slides.length <= 1);
    setNextBtnDisabled(slides.length <= 1);
  }, [slides.length]);

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
      <div className="embla relative" ref={emblaRef}>
         <div className="embla__container">
           {slides.map((slide, index) => (
             <div className="embla__slide" key={index}>
                <div className="flex flex-col justify-center items-center h-[450px]"> {/* Changed to flex-col */}
                  {/* Replaced img with next/image */}
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                   width={600} // Provide estimated width for optimization
                   height={400} // Provide estimated height for optimization
                    className="max-h-[400px] w-auto object-contain rounded"
                  />
                  {/* Added Caption */}
                  <p className="text-center text-sm text-gray-600 mt-2">{slide.caption}</p>
                </div>
             </div>
           ))}
         </div>

        <PrevButton onClick={scrollPrev} enabled={!prevBtnDisabled} />
        <NextButton onClick={scrollNext} enabled={!nextBtnDisabled} />
      </div>

      <div className="embla__dots">
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
