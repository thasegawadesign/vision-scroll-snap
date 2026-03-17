"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export default function ScrollSnapGallery() {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const isProgrammaticRef = useRef(false);

  const animateScrollTo = useCallback(
    (
      scroller: HTMLElement,
      targetTop: number,
      opts: { durationMs: number },
    ) => {
      const reduce =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false;

      if (reduce || opts.durationMs <= 0) {
        scroller.scrollTop = targetTop;
        return 0;
      }

      const startTop = scroller.scrollTop;
      const delta = targetTop - startTop;
      if (Math.abs(delta) < 1) return 0;

      const start = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      let rafId = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / opts.durationMs);
        const eased = easeOutCubic(t);
        scroller.scrollTop = startTop + delta * eased;
        if (t < 1) rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
      return rafId;
    },
    [],
  );

  const snapToNearest = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (isProgrammaticRef.current) return;

    const items = Array.from(scroller.children) as HTMLElement[];
    if (items.length === 0) return;

    const currentTop = scroller.scrollTop;
    let best = items[0];
    let bestDist = Math.abs(items[0].offsetTop - currentTop);

    for (let i = 1; i < items.length; i++) {
      const dist = Math.abs(items[i].offsetTop - currentTop);
      if (dist < bestDist) {
        bestDist = dist;
        best = items[i];
      }
    }

    const targetTop = best.offsetTop;
    if (Math.abs(targetTop - currentTop) < 2) return;

    isProgrammaticRef.current = true;
    animateScrollTo(scroller, targetTop, { durationMs: 3000 });
    window.setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 200);
  }, [animateScrollTo]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scheduleSnap = () => {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = window.setTimeout(() => {
        snapToNearest();
      }, 200);
    };

    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      scheduleSnap();
    };

    const onScrollEnd = () => {
      if (isProgrammaticRef.current) return;
      snapToNearest();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend" as unknown as "scroll", onScrollEnd);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener(
        "scrollend" as unknown as "scroll",
        onScrollEnd,
      );
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    };
  }, [snapToNearest]);

  return (
    <>
      <ul
        ref={scrollerRef}
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
