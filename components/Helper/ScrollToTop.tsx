"use client"

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn('fixed bottom-4 right-4 transition-all duration-300 transform',
      isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-0 pointer-events-none')}>
      <button onClick={scrollToTop} className="bg-primary transition-all text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center focus:outline-none hover:opacity-80">
        <FaArrowUp />
      </button>
    </div>
  )
}

export default ScrollToTop;