"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, GraduationCap, Building2, X, Award, Briefcase, LucideIcon } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-utils"
import { useLanguage } from "@/components/LanguageContext"
import { cn } from "@/lib/utils"

export default function Experience() {
  const { t } = useLanguage()
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const timelineRef = useStaggerAnimation(0.2, { triggerStart: "top 75%" })

  // Mapping ikon berdasarkan urutan item (Red Hat, Polinela, Google)
  const icons: LucideIcon[] = [Award, GraduationCap, Briefcase]
  const colors = ["#00d4ff", "#ffffff", "#00d4ff"]

  return (
    <section id="experience" className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t.experience.title} <span className="text-[#00d4ff]">{t.experience.subtitle}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.experience.desc}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div ref={timelineRef as React.RefObject<HTMLDivElement>} className="relative space-y-12">
            
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#00d4ff]/50 via-white/10 to-transparent hidden sm:block" />

            {/* Loop through items dari translations.ts */}
            {t.experience.items.map((item: any, index: number) => {
              const Icon = icons[index] || Briefcase
              const accentColor = colors[index] || "#00d4ff"

              return (
                <div key={index} className="relative pl-0 sm:pl-24 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-8 top-8 w-4 h-4 -translate-x-[7px] rounded-full border-2 border-[#00d4ff] bg-[#050505] group-hover:bg-[#00d4ff] transition-all duration-300 z-10 hidden sm:block">
                     <div className="absolute inset-0 bg-[#00d4ff]/50 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                  </div>

                  <div className="relative bg-[#111] rounded-3xl p-0.5 transition-all duration-500 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="cursor-target relative bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 border border-white/5 overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#00d4ff]/50 transition-colors">
                            <Icon className="w-7 h-7 text-[#00d4ff]" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#00d4ff] transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                              <Building2 className="w-4 h-4 text-[#00d4ff]" />
                              <span>{item.company}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-1 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#00d4ff]" />
                            <span>{item.period}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pl-0 sm:pl-[68px]">
                        <p className="text-gray-400 leading-relaxed">
                          {item.desc}
                        </p>
                        
                        {/* Static tags for decoration - relevant to your profile */}
                        <div className="flex flex-wrap gap-2 mt-4 opacity-70">
                           {index === 0 && <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/20">SysAdmin</span>}
                           {index === 1 && <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/20">Django & IoT</span>}
                           {index === 2 && <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/20">Infrastructure</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}