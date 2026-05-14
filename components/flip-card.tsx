"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"

interface FlipCardProps {
  images: string[]
  interval?: number
}

export default function FlipCard({ images, interval = 4000 }: FlipCardProps) {
  // We use two indices to track which image is on the "Front" and "Back" face
  // Initially Front=0, Back=1
  const [frontIndex, setFrontIndex] = useState(0)
  const [backIndex, setBackIndex] = useState(1)
  
  // We track rotation to know which face is visible.
  // 0 = Front visible
  // 180 = Back visible
  // 360 = Front visible (reset effectively)
  const rotationRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    gsap.set(container, { transformStyle: "preserve-3d" })

    const timer = setInterval(() => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true

      // Calculate next rotation target
      // We always rotate by -180deg for a consistent flip direction
      const nextRotation = rotationRef.current - 180
      
      // Determine which face will be visible AFTER this flip
      // If current rotation is 0, -360, etc -> Front is visible. 
      // After -180 flip -> Back will be visible.
      // If current rotation is -180, -540 -> Back is visible.
      // After -180 flip -> Front will be visible.
      
      // Logic:
      // Check what is CURRENTLY visible before we start flipping.
      // (rotation / 180) % 2 === 0 means Front is Visible.
      // (rotation / 180) % 2 !== 0 means Back is Visible.
      
      const isFrontCurrentlyVisible = (Math.abs(rotationRef.current) / 180) % 2 === 0
      
      // If Front is currently visible, we are flipping to show Back.
      // So Back must have the Next Image ready.
      // Wait, Back ALREADY has the next image (setup initially).
      
      // If Back is currently visible, we are flipping to show Front.
      // So Front must have the Next Image ready BEFORE we flip.
      
      // Wait, we want to update the HIDDEN face *after* the flip is done?
      // No, usually better to update hidden face *before* it becomes visible.
      // But here, the "next" image is already on the hidden face from the previous turn?
      
      // Let's trace:
      // Start: Rot=0. Front=Img0 (Visible). Back=Img1 (Hidden).
      // Flip 1 (-180): Show Back (Img1).
      //   Now Visible: Back (Img1). Hidden: Front (Img0).
      //   We need to prepare Front for NEXT flip. Front should become Img2.
      //   So AFTER Flip 1, update Front -> Img2.
      
      // Flip 2 (-360): Show Front (Img2).
      //   Now Visible: Front (Img2). Hidden: Back (Img1).
      //   We need to prepare Back for NEXT flip. Back should become Img3.
      //   So AFTER Flip 2, update Back -> Img3.
      
      gsap.to(container, {
        rotationY: nextRotation,
        duration: 2, // Slower, smoother flip as requested
        ease: "power2.inOut",
        onComplete: () => {
          isAnimatingRef.current = false
          rotationRef.current = nextRotation
          
          // Update the HIDDEN face indices for the NEXT turn
          if (isFrontCurrentlyVisible) {
             // We just flipped from Front to Back. Back is now visible.
             // Front is hidden. Update Front to next image (current + 2)
             setFrontIndex((prev) => (prev + 2) % images.length)
          } else {
             // We just flipped from Back to Front. Front is now visible.
             // Back is hidden. Update Back to next image (current + 2)
             setBackIndex((prev) => (prev + 2) % images.length)
          }
        }
      })
      
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="w-full h-full relative perspective-1000">
      <div 
        ref={containerRef}
        className="w-full h-full relative preserve-3d"
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }} // CSS standard property
        >
          <Image
            src={images[frontIndex] || "/gwehj.jpg"}
            alt="Profile Front"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 400px, 500px"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl overflow-hidden"
          style={{ 
            transform: "rotateY(180deg)", 
            backfaceVisibility: "hidden" 
          }}
        >
            <Image
            src={images[backIndex] || "/gwehj.jpg"}
            alt="Profile Back"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 400px, 500px"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  )
}
