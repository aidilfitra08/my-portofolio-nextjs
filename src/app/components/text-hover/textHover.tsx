import { useEffect, useRef, useState } from "react";

export default function TextHover({
  text,
  hoverText,
}: {
  text: string;
  hoverText: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [repeatCount, setRepeatCount] = useState(2);

  useEffect(() => {
    // Calculate how many times to repeat the text to fill the container
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      if (textWidth > 0) {
        // Repeat enough times to fill at least 2x the container for seamless effect
        const count = Math.ceil((containerWidth * 2) / textWidth);
        setRepeatCount(count);
      }
    }
  }, [hoverText, text]);

  // Build the repeated text
  const marqueeText = Array(3).fill(hoverText).join(" * ") + " * "; // Extra separator for smooth loop
  return (
    <div className="relative group text-center px-4 py-2" ref={containerRef}>
      <p className="group-hover:opacity-0 transition-opacity uppercase">
        {text}
      </p>
      {/* <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {hoverText}
      </span> */}
      <div className="absolute z-10 top-0 left-0 w-full h-full py-2 inline-flex flex-nowrap pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-200 scale-y-0 group-hover:scale-y-100 dark:bg-neutral-100 dark:text-black bg-neutral-950 uppercase italic">
        <p className="font-bold animate-marquee" ref={textRef}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className="whitespace-nowrap">
              {hoverText + " "}
            </span>
          ))}
        </p>

        <p
          className="font-bold animate-marquee [&_span]:mx-2"
          aria-hidden="true"
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="whitespace-nowrap">
              {hoverText}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
