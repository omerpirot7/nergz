"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { partners } from "@/content/dictionary";
import { Section, SectionHeader } from "@/components/section";
import { useApp } from "@/context/app-context";

export function Partners() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const loop = [...partners, ...partners];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const step = () => {
      const node = trackRef.current;
      if (node && !paused && !dragging.current) {
        offset.current -= 0.45;
        const width = node.scrollWidth / 2;
        if (Math.abs(offset.current) >= width) offset.current = 0;
        node.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused, reduce]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current) return;
    offset.current += event.clientX - lastX.current;
    lastX.current = event.clientX;
    trackRef.current.style.transform = `translate3d(${offset.current}px,0,0)`;
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <Section id="partners" width="narrow">
      <SectionHeader title={t.partners.title} wave />
      <div
        className="[container-type:inline-size] dir-ltr cursor-grab overflow-hidden active:cursor-grabbing"
        dir="ltr"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-3 py-3 will-change-transform"
        >
          {loop.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              data-logo-card
              className="group relative flex h-[7.75rem] w-[calc((100cqi-1.5rem)/3)] shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-[0_8px_24px_-18px_rgba(12,51,156,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-brand"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={140}
                height={72}
                className="h-[72%] w-[80%] object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
