"use client";

import WordReveal from "./WordReveal";
import PhotoCard from "./PhotoCard";

export interface PhotoData {
  src: string;
  alt: string;
  caption?: string;
  side: "left" | "right";
}

interface LetterSectionProps {
  id?: string;
  paragraph: string;
  photo?: PhotoData;
}

export default function LetterSection({
  id,
  paragraph,
  photo,
}: LetterSectionProps) {
  return (
    <section id={id} className="relative my-9 sm:my-16 md:my-20">
      <div className="relative w-full max-w-lg mx-auto px-4 sm:px-6">
        {photo && photo.side === "left" && (
          <div className="hidden lg:block absolute -top-2 right-[calc(100%+2.5rem)] xl:right-[calc(100%+3.5rem)] pointer-events-auto">
            <PhotoCard
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              side="left"
            />
          </div>
        )}

        {photo && photo.side === "right" && (
          <div className="hidden lg:block absolute -top-2 left-[calc(100%+2.5rem)] xl:left-[calc(100%+3.5rem)] pointer-events-auto">
            <PhotoCard
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              side="right"
            />
          </div>
        )}

        {photo && (
          <div className="lg:hidden my-5 sm:my-6 flex justify-center">
            <PhotoCard
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              side={photo.side}
            />
          </div>
        )}

        <WordReveal text={paragraph} />
      </div>
    </section>
  );
}
