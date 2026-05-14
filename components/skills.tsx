"use client"

import { useState } from "react"
import { Network, Cpu, Server, Globe, Code2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useScrollAnimation } from "@/lib/gsap-utils"
import { useLanguage } from "@/components/LanguageContext"

interface SkillCategory {
  id: string
  icon: LucideIcon
  title: string
  description: string
  skills: string[]
}

export default function Skills() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  const { t } = useLanguage()
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      id: "networking",
      icon: Network,
      title: t.skills.cat1.title,
      description: t.skills.cat1.desc,
      // Tambahkan Red Hat Enterprise Linux
      skills: ["Cisco", "Mikrotik", "Red Hat (RHEL)", "Linux Admin", "Network Security"],
    },
    {
      id: "ai",
      icon: Cpu,
      title: t.skills.cat2.title,
      description: t.skills.cat2.desc,
      // Tambahkan Django
      skills: ["Python", "Django", "FastAPI", "PostgreSQL", "TensorFlow", "Computer Vision"],
    },
    {
      id: "iot",
      icon: Server,
      title: t.skills.cat3.title,
      description: t.skills.cat3.desc,
      // Tambahkan Google Cloud
      skills: ["Google Cloud (GCP)", "Docker", "Arduino/ESP32", "MQTT Protocol", "Next.js"],
    },
  ]

  return (
    <section id="skills" className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-[#00d4ff]/10 rounded-full blur-[50px] sm:blur-[100px] animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[#00d4ff]/5 rounded-full blur-[60px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t.skills.title} <span className="text-[#00d4ff]">{t.skills.subtitle}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t.skills.desc}
          </p>
        </div>

        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id

            return (
              <div 
                key={category.id}
                className={`relative group rounded-3xl p-0.5 transition-all duration-500 ease-out ${isActive ? 'scale-105 z-10' : 'hover:scale-[1.02]'}`}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-[#00d4ff]/40 via-transparent to-transparent rounded-3xl opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}`} />

                <div className="cursor-target relative h-full bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 border border-white/5 overflow-hidden flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${isActive ? 'bg-[#00d4ff] text-black shadow-[0_0_20px_rgba(0,212,255,0.5)]' : 'bg-white/5 text-[#00d4ff] group-hover:bg-[#00d4ff]/10'}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    {isActive && <Globe className="w-6 h-6 text-[#00d4ff]/40 animate-pulse" />}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">{category.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 ${isActive ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]' : 'bg-white/5 border-white/10 text-gray-400'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}