import { cn } from "@/lib/utils";
import Image from "next/image";

type DynamicImageProps = {
  baseImageUrl: string;
  wrapFrontUrl: string;
  bowImageUrl: string;
  wrapBackUrl: string;
  animalUrl: string;
  wrapFrontColor: string;
  wrapBackColor: string;
  bowColor: string;
  className?: string;
};

const DynamicImage = ({
  baseImageUrl,
  wrapFrontUrl,
  wrapBackUrl,
  animalUrl,
  bowImageUrl,
  wrapFrontColor,
  wrapBackColor,
  bowColor,
  className,
}: DynamicImageProps) => {
  return (
    <div className={cn("relative w-64 h-64", className)}>
      {/* Base Image */}
      <Image
        src={baseImageUrl}
        alt="Bundle Base Image"
        layout="fill"
        objectFit="contain"
        className="z-10"
      />
      {/* Wrap Back Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: wrapBackColor,
        }}
      >
        <Image
          src={wrapBackUrl}
          alt="Wrap Back Image"
          layout="fill"
          objectFit="contain"
          className="z-20"
        />
      </div>

      {/* Animal Layer */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={animalUrl}
          alt="Outer Part Image"
          layout="fill"
          objectFit="contain"
          className="z-20"
        />
      </div>
      {/* Wrap Front Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: wrapFrontColor,
        }}
      >
        <Image
          src={wrapFrontUrl}
          alt="Wrap Front Image"
          layout="fill"
          objectFit="contain"
          className="z-30"
        />
      </div>
      {/* Bow Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: bowColor,
        }}
      >
        <Image
          src={bowImageUrl}
          alt="Bow Image"
          layout="fill"
          objectFit="contain"
          className="z-40"
        />
      </div>
    </div>
  );
};

export default DynamicImage;
