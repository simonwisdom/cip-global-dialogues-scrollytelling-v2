"use client";

import { useState } from "react";
import s from "./image-gallery.module.scss";
import React from "react";

const images = [
  {
    id: 1,
    title: "Spontaneous Laughter",
    description: "The uncontrollable joy that bubbles up from nowhere",
    emoji: "😂",
    color: "#ff6b6b"
  },
  {
    id: 2,
    title: "Unexpected Tears",
    description: "Emotions that catch us off guard during quiet moments",
    emoji: "😢",
    color: "#4ecdc4"
  },
  {
    id: 3,
    title: "Irrational Love",
    description: "Falling for someone despite all logic and reason",
    emoji: "💕",
    color: "#ffe66d"
  },
  {
    id: 4,
    title: "Creative Chaos",
    description: "The beautiful mess of human artistic expression",
    emoji: "🎨",
    color: "#a8e6cf"
  },
  {
    id: 5,
    title: "Nostalgic Melancholy",
    description: "The bittersweet ache for moments that cannot return",
    emoji: "🌅",
    color: "#ff8b94"
  },
  {
    id: 6,
    title: "Inexplicable Hope",
    description: "The stubborn belief that tomorrow can be better",
    emoji: "🌟",
    color: "#b4a7d6"
  }
];

export const ImageGallery = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeImage];

  if (!currentImage) return null;

  return (
    <div className={s["gallery-container"]} ref={ref} {...props}>
      <h3 className={s["gallery-title"]}>The Ineffable Human Experience</h3>
      
      {/* Main Display */}
      <div className={s["main-display"]}>
        <div 
          className={s["image-card"]} 
          style={{ backgroundColor: currentImage.color }}
        >
          <div className={s["emoji"]}>{currentImage.emoji}</div>
          <h4 className={s["image-title"]}>{currentImage.title}</h4>
          <p className={s["image-description"]}>{currentImage.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className={s["navigation"]}>
        <button 
          className={s["nav-button"]} 
          onClick={prevImage}
          aria-label="Previous image"
        >
          ←
        </button>
        
        <div className={s["indicators"]}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${s["indicator"]} ${index === activeImage ? s["active"] : ""}`}
              onClick={() => setActiveImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className={s["nav-button"]} 
          onClick={nextImage}
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className={s["thumbnail-grid"]}>
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`${s["thumbnail"]} ${index === activeImage ? s["active"] : ""}`}
            onClick={() => setActiveImage(index)}
            style={{ backgroundColor: image.color }}
          >
            <span className={s["thumbnail-emoji"]}>{image.emoji}</span>
            <span className={s["thumbnail-title"]}>{image.title}</span>
          </button>
        ))}
      </div>

      <p className={s["gallery-description"]}>
        These moments of pure humanity cannot be replicated by algorithms—they emerge from the beautiful chaos of consciousness itself.
      </p>
    </div>
  );
});

ImageGallery.displayName = "ImageGallery";