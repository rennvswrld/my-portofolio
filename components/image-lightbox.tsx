"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function ImageLightbox({ images, currentIndex, onClose, onNext, onPrev }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && onNext) onNext()
      if (e.key === "ArrowLeft" && onPrev) onPrev()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose, onNext, onPrev])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-50 group"
      >
        <X size={20} className="sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/10 hover:bg-amber-400/20 rounded-full transition-all duration-300 z-50 group"
        >
          <ChevronLeft size={24} className="sm:w-8 sm:h-8 text-white group-hover:text-amber-400" />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/10 hover:bg-amber-400/20 rounded-full transition-all duration-300 z-50 group"
        >
          <ChevronRight size={24} className="sm:w-8 sm:h-8 text-white group-hover:text-amber-400" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-2 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt="Project preview"
              fill
              className="object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs sm:text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
