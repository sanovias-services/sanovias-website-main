'use client';

import { useState, useEffect } from 'react';
import Slider from 'react-slick';

interface HydrationSafeSliderProps {
  children: React.ReactNode;
  settings: object;
  className?: string;
}

export default function HydrationSafeSlider({ children, settings, className }: HydrationSafeSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a simple container during SSR to match initial render
    return <div className={className}>{children}</div>;
  }

  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
}