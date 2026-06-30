import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export function MobileCarousel({ children, className }: MobileCarouselProps) {
  // Use Embla Carousel with horizontal Axis and clean slide alignment
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, children.length]);

  return (
    <div className={cn("sm:hidden w-full relative", className)}>
      <div className="overflow-hidden px-1" ref={emblaRef}>
        {/*
          Using items-stretch ensures that the carousel track forces all slides
          to take the height of the tallest card in the carousel.
          Each wrapper is flex flex-col to propagate the stretched height to its children.
        */}
        <div className="flex items-stretch touch-pan-y">
          {children.map((child, idx) => (
            <div key={idx} className="shrink-0 grow-0 basis-full px-2 flex flex-col">
              <div className="h-full flex flex-col">{child}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls (Arrows and Pagination Dots) */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="grid h-9 w-9 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-sm shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedIndex === idx
                  ? "w-6 gradient-orange"
                  : "w-1.5 bg-violet/30 hover:bg-violet/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="grid h-9 w-9 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-sm shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
