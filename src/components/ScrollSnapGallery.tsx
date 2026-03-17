import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ScrollSnapGallery() {
  return (
    <>
      <ul
        className={cn(
          "h-screen snap-y snap-mandatory overflow-y-scroll overscroll-contain",
          "m-0 list-none p-0",
        )}
      >
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-1.avif"
            alt="Retro television transformed into an aquarium with two goldfish, plants, and rocks."
            width={3840}
            height={2160}
            priority
            className={cn("h-full w-full object-cover")}
          />
        </li>
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-2.avif"
            alt="Person with a vintage television as a head wearing a yellow jacket under a blue sky."
            width={3840}
            height={2160}
            className={cn("h-full w-full object-cover")}
          />
        </li>
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-3.avif"
            alt="Ingredients for a sandwich clipped to a clothesline: mayo, bagel, cheese, tomato, and lettuce."
            width={3840}
            height={2160}
            className={cn("h-full w-full object-cover")}
          />
        </li>
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-4.avif"
            alt="Person wearing a helmet with pink flowers flowing from the back."
            width={3840}
            height={2160}
            className={cn("h-full w-full object-cover")}
          />
        </li>
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-5.avif"
            alt="Goldfish swimming in water inside a retro pink television set."
            width={3840}
            height={2160}
            className={cn("h-full w-full object-cover")}
          />
        </li>
        <li className={cn("h-screen snap-start snap-always")}>
          <Image
            src="/image-6.avif"
            alt="Surreal giant orange lips lying on desert sand."
            width={3840}
            height={2160}
            className={cn("h-full w-full object-cover")}
          />
        </li>
      </ul>
    </>
  );
}
