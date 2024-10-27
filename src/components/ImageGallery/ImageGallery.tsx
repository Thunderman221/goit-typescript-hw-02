import React from "react";
import { Image } from "../../types";
import "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className="gallery-item"
          onClick={() => onImageClick(image)}
        >
          <img src={image.urls.small} alt={image.alt_description || "Image"} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
