"use client"

export default function SkeletonImage() {
  return (
    <div className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 animate-shimmer bg-size z-10" />
  )
}
