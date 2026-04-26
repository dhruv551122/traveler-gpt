"use client";

import Image, { ImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

type Props = Omit<ImageProps, "src"> & {
  src: SanityImageSource;
  ref?: React.RefObject<HTMLImageElement | null>;
  onLoad?: () => void;
};

export const SanityImage = ({ src, alt, ref, onLoad, ...props }: Props) => {
  // Ensure alt is not undefined or empty, fallback to "Image" if it is
  const altText = alt || "Vers Credit";

  return (
    <Image
      src={urlFor(src).url()}
      priority
      loading="eager"
      alt={altText}
      sizes="(min-width: 1200px) 85vw, (min-width: 768px) 75vw"
      loader={({ width, quality = 100 }) =>
        urlFor(src).width(width).quality(quality).url()
      }
      {...props}
      ref={ref}
      onLoad={onLoad}
    />
  );
};
