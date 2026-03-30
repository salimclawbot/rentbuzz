"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoGalleryProps = {
  images: Array<{ src: string; alt: string }>;
};

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-[#1F1F1F] bg-[#111111]">
        <Image src={activeImage.src} alt={activeImage.alt} fill className="object-cover" sizes="100vw" />
      </div>
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-2xl border transition ${
              index === activeIndex ? "border-orange-500" : "border-[#2A2A2A]"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="112px" />
          </button>
        ))}
      </div>
    </div>
  );
}
