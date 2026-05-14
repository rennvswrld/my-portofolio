import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Hook for basic scroll animation (fade in up)
export function useScrollAnimation(options: {
  y?: number
  duration?: number
  delay?: number
  triggerStart?: string
} = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: options.y || 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 1,
          ease: "power3.out",
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: element,
            start: options.triggerStart || "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })

    return () => ctx.revert()
  }, [options.y, options.duration, options.delay, options.triggerStart])

  return elementRef
}

// Hook for staggered list animations
export function useStaggerAnimation(staggerAmount = 0.1, options: { triggerStart?: string } = {}) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const children = container.children
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: staggerAmount,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: options.triggerStart || "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })

    return () => ctx.revert()
  }, [staggerAmount, options.triggerStart])

  return containerRef
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Disable on mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return elementRef
}

// Hook for magnetic hover effect
export function useMagnetic(strength = 0.5) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Disable on devices that don't support hover
    if (!window.matchMedia("(hover: hover)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return elementRef
}
