"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="cursor-target fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-40 p-3 sm:p-4 bg-amber-400 hover:bg-amber-500 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#1a1918]"
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </>
  )
}
