import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, altText }) => {
  if (!isOpen) return null;

  // Handle clicks outside the image content but within the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the overlay itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="image-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div className="image-modal-content">
        {/* Optional: Add a title if needed for accessibility */}
        {/* <h2 id="image-modal-title" className="sr-only">{altText}</h2> */}
        <button
          className="image-modal-close-button"
          onClick={onClose}
          aria-label="Close image modal"
        >
          <X size={32} /> {/* Increased size for better visibility */}
        </button>
        <Image
          src={imageUrl}
          alt={altText}
          width={800} // Adjust width as needed, or use layout="intrinsic" etc.
          height={600} // Adjust height as needed
          className="image-modal-image"
          // Consider adding priority if it's likely to be opened quickly
        />
      </div>
    </div>
  );
};

export default ImageModal;
