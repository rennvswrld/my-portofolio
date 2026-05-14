"use client";

import Link from "next/link"
import { Home } from "lucide-react"
import { useEffect, useState } from "react"
import TargetCursor from "@/components/TargetCursor";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <TargetCursor />
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Distant galaxies/nebula effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Astronaut */}
      <div className="cursor-target absolute bottom-12 right-12 w-32 h-32 opacity-80" style={{ animation: 'float-astronaut 8s ease-in-out infinite' }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Helmet */}
          <circle cx="100" cy="70" r="35" fill="#E5E7EB" opacity="0.3"/>
          <circle cx="100" cy="70" r="30" fill="#1F2937"/>
          <ellipse cx="100" cy="70" rx="22" ry="18" fill="#374151"/>
          
          {/* Reflection on helmet */}
          <ellipse cx="95" cy="65" rx="8" ry="12" fill="#60A5FA" opacity="0.4"/>
          
          {/* Body */}
          <ellipse cx="100" cy="120" rx="28" ry="35" fill="#E5E7EB"/>
          
          {/* Arms */}
          <rect x="65" y="105" width="12" height="35" rx="6" fill="#E5E7EB" transform="rotate(-25 71 122)"/>
          <rect x="123" y="105" width="12" height="35" rx="6" fill="#E5E7EB" transform="rotate(25 129 122)"/>
          
          {/* Legs */}
          <rect x="85" y="145" width="12" height="30" rx="6" fill="#E5E7EB"/>
          <rect x="103" y="145" width="12" height="30" rx="6" fill="#E5E7EB"/>
          
          {/* Backpack */}
          <rect x="90" y="110" width="20" height="25" rx="3" fill="#9CA3AF"/>
          
          {/* Details */}
          <circle cx="100" cy="115" r="3" fill="#FCD34D"/>
          <rect x="95" y="125" width="10" height="2" rx="1" fill="#60A5FA"/>
        </svg>
      </div>
      


      <div className={`relative z-10 max-w-2xl mx-auto text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Black Hole Visual */}
        <div className="mb-12 flex items-center justify-center">
          <div className={`relative w-80 h-80 transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-95'}`}>
            
            {/* Accretion disk with gradient */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-72 h-24 rounded-[50%] border border-amber-500/30"
                style={{ 
                  transform: 'perspective(400px) rotateX(70deg)',
                  background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.12), rgba(251,191,36,0.28), rgba(245,158,11,0.25), rgba(251,191,36,0.12), transparent)',
                  boxShadow: '0 0 30px rgba(251,191,36,0.15)',
                  animation: 'spin 25s linear infinite'
                }}>
              </div>
            </div>

            {/* Event horizon with depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-black border border-amber-500/25"
                 style={{
                   boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.5), 0 0 20px rgba(251,191,36,0.15)'
                 }}>
              {/* Inner shadow layers for 3D depth */}
              <div className="absolute inset-2 rounded-full bg-linear-to-br from-neutral-900 via-black to-black"></div>
              <div className="absolute inset-4 rounded-full bg-linear-to-br from-black to-neutral-950"></div>
            </div>

            {/* 404 Text with better typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-7xl font-bold text-white tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                404
              </div>
            </div>

          </div>
        </div>

        {/* Content with better spacing */}
        <div className="space-y-5">
         <h1 className="text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-amber-500">
                Page Not Found
              </span>
            </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="pt-6">
            <Link
              href="/"
              className="cursor-target group inline-flex items-center gap-2.5 px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0">
              <Home size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="pt-10 border-t border-white/5 mt-12">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <Link href="/#contact" className="text-amber-500 hover:text-amber-400 underline underline-offset-4 transition-colors duration-200">
                Contact me
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: perspective(400px) rotateX(70deg) rotate(0deg); }
          to { transform: perspective(400px) rotateX(70deg) rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes float-astronaut {
          0%, 100% { 
            transform: translateY(0) rotate(-5deg);
          }
          50% { 
            transform: translateY(-30px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  )
}