"use client"

import { useRef } from "react"
import Image from "next/image"
import { Code2, Sparkles, Cpu, Globe, Shield, Network } from "lucide-react"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import { useScrollAnimation, useStaggerAnimation, useParallax } from "@/lib/gsap-utils"
import { useLanguage } from "@/components/LanguageContext"

export default function About() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  const statsRef = useStaggerAnimation(0.15, { triggerStart: "top 80%" })
  
  const { t } = useLanguage()
  
  // Background parallax elements
  const blob1Ref = useParallax(0.1)
  const blob2Ref = useParallax(0.2)
  const iconRef = useParallax(0.15)

  // Counter values
  const yearsCount = useAnimatedCounter(3, 2000)
  const projectsCount = useAnimatedCounter(12, 2000)
  const technologiesCount = useAnimatedCounter(15, 2000)

  return (
    <section
      id="about"
      className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Elements */}
      <div ref={blob1Ref as React.RefObject<HTMLDivElement>} className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div ref={blob2Ref as React.RefObject<HTMLDivElement>} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00d4ff]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(#00d4ff 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Narrative */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>}>
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-8 bg-[#00d4ff]"></span>
              <h2 className="text-[#00d4ff] font-bold tracking-wider text-sm uppercase">{t.about.title}</h2>
            </div>
            
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {t.about.subtitle.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br/>}
                </span>
              ))}
            </h3>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              {/* CRITICAL CHANGE: Menggunakan fullDesc agar teks panjang muncul */}
              <p>
                {t.about.fullDesc}
              </p>
              
              {/* Fun Fact Section: Curhatan Mantan */}
              <p className="italic border-l-2 border-[#00d4ff] pl-4 py-3 text-sm text-gray-500 bg-white/5 rounded-r-lg shadow-inner">
                {t.about.funFact}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="cursor-target px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2 hover:border-[#00d4ff]/40 transition-colors">
                <Shield className="w-4 h-4 text-[#00d4ff]" /> {t.hero.skill1}
              </div>
              <div className="cursor-target px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2 hover:border-[#00d4ff]/40 transition-colors">
                <Network className="w-4 h-4 text-[#00d4ff]" /> {t.hero.skill2}
              </div>
            </div>
          </div>

          {/* Right Column: Creative Stats */}
          <div ref={statsRef as React.RefObject<HTMLDivElement>} className="relative">
            <div className="relative w-full flex flex-col gap-6 lg:block lg:aspect-square max-w-[500px] mx-auto lg:mx-0">
               
               <div className="hidden lg:block absolute inset-0 border border-[#00d4ff]/10 rounded-full animate-[spin_60s_linear_infinite]" />

               {/* Stat Cards */}
               <div className="cursor-target relative w-full lg:w-auto lg:absolute lg:top-10 lg:left-10 bg-[#111]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl lg:transform lg:-rotate-3 hover:rotate-0 transition-transform duration-300 group">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-[#00d4ff]/10 rounded-xl group-hover:bg-[#00d4ff]/20 transition-colors">
                     <Network className="w-6 h-6 text-[#00d4ff]" />
                   </div>
                   <div>
                     <h3 className="text-4xl font-bold text-white">{yearsCount}</h3>
                     <p className="text-sm text-gray-400 mt-1">Years Experience</p>
                   </div>
                 </div>
               </div>

               <div className="cursor-target relative w-full lg:w-auto lg:absolute lg:bottom-20 lg:right-10 bg-[#111]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl lg:transform lg:rotate-3 hover:rotate-0 transition-transform duration-300 group z-10">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-[#00d4ff]/10 rounded-xl group-hover:bg-[#00d4ff]/20 transition-colors">
                     <Code2 className="w-6 h-6 text-[#00d4ff]" />
                   </div>
                   <div>
                     <h3 className="text-4xl font-bold text-white">{projectsCount}+</h3>
                     <p className="text-sm text-gray-400 mt-1">Systems Built</p>
                   </div>
                 </div>
               </div>

               {/* Profile Image */}
               <div ref={iconRef as React.RefObject<HTMLDivElement>} className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#00d4ff]/20 grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                    <Image 
                      src="/profile.png" 
                      alt="Rendi Saputra" 
                      fill 
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}