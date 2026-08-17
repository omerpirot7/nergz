"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

const deviceIcons = {
  mobile: Smartphone,
  desktop: Monitor,
} as const;

function DevicePop({
  children,
  className,
  reduce,
}: {
  children: React.ReactNode;
  className?: string;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [14, -14]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 260,
    damping: 22,
  });
  const scale = useSpring(1, { stiffness: 260, damping: 22 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.06);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              scale,
              transformStyle: "preserve-3d",
            }
      }
      className={cn(
        "transition-shadow duration-300 hover:shadow-[0_28px_50px_-22px_rgba(20,36,28,0.45)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function DevicePreviews({ className }: { className?: string }) {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const devices = [
    { id: "mobile" as const, ...t.features.devices.mobile },
    { id: "desktop" as const, ...t.features.devices.desktop },
  ];

  return (
    <div className={cn("grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12", className)}>
      {devices.map((device, index) => {
        const Icon = deviceIcons[device.id];
        return (
          <motion.article
            key={device.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, delay: reduce ? 0 : index * 0.08 },
            }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-box border border-line bg-card p-6 shadow-soft md:p-7"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-box bg-brand-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 text-start">
                <h3 className="text-lg font-bold text-ink">{device.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{device.description}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center overflow-hidden [perspective:1200px]">
              {device.id === "mobile" ? (
                <DevicePop
                  reduce={reduce}
                  className="w-[11.5rem] rounded-[1.75rem] border-[3px] border-ink/10 bg-ink/90 p-1.5 shadow-lift md:w-[12.5rem]"
                >
                  <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/20" />
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-card">
                    <Image
                      src="/images/nergz-mobile.png"
                      alt={device.description}
                      fill
                      className="object-cover object-top"
                      sizes="12.5rem"
                    />
                  </div>
                </DevicePop>
              ) : (
                <DevicePop reduce={reduce} className="w-full max-w-md">
                  <div className="overflow-hidden rounded-t-lg border border-b-0 border-line bg-ink/90 px-3 pt-2">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-md bg-card">
                      <Image
                        src="/images/nergz-desktop.png"
                        alt={device.description}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 28rem"
                      />
                    </div>
                  </div>
                  <div className="mx-auto h-2 w-[42%] rounded-b-md bg-ink/20" />
                  <div className="mx-auto mt-1 h-1 w-[18%] rounded-full bg-ink/15" />
                </DevicePop>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
