"use client";

import {
  SanityImageAsset,
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image, { ImageProps } from "next/image";

type SanityImageObject = {
  asset: SanityImageAsset | SanityImageAssetReference;
  media?: unknown;
  hotspot?: SanityImageHotspot | undefined;
  crop?: SanityImageCrop | undefined;
  _type: "image";
};

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: SanityImageObject;
  alt?: string;
  ref?: React.RefObject<HTMLImageElement | null>;
  onLoad?: () => void;
};

export const SanityImage = ({ src, ref, alt, onLoad, ...props }: Props) => {
  // Ensure alt is not undefined or empty, fallback to a safe default if needed
  const altText =
    alt ??
    (src?.asset?._type === "sanity.imageAsset"
      ? src.asset.altText
      : undefined) ??
    "TravelerGPT";

  return (
    <Image
      src={urlFor(src).url()}
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
