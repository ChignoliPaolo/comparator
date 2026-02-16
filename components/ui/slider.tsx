"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: "default" | "offerA" | "offerB";
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant = "default", ...props }, ref) => {
  const trackColor =
    variant === "offerA"
      ? "bg-offerA/20 data-[orientation=horizontal]:h-2"
      : variant === "offerB"
        ? "bg-offerB/20 data-[orientation=horizontal]:h-2"
        : "";
  const rangeColor =
    variant === "offerA"
      ? "bg-offerA"
      : variant === "offerB"
        ? "bg-offerB"
        : "bg-primary";

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full",
          trackColor || "bg-primary/20 data-[orientation=horizontal]:h-2"
        )}
      >
        <SliderPrimitive.Range
          className={cn("absolute h-full rounded-full", rangeColor)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block h-4 w-4 rounded-full border-2 border-white bg-[hsl(var(--foreground))] shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "offerA" && "border-offerA bg-offerA",
          variant === "offerB" && "border-offerB bg-offerB"
        )}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
