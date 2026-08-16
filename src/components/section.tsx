import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
  bordered?: boolean;
};

const widths = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-5xl",
};

export function Section({
  id,
  children,
  className,
  width = "default",
  bordered = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-12 md:py-16",
        bordered && "border-t border-line",
        className,
      )}
    >
      <div className={cn("mx-auto px-4 md:px-6", widths[width])}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  wave = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  wave?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold tracking-wide text-brand">{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-extrabold md:text-4xl",
          wave ? "title-wave" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-ink-muted md:text-[1.05rem]">{subtitle}</p>
      ) : null}
    </div>
  );
}
