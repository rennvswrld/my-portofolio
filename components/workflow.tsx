"use client"

import { useRef } from "react"
import { Search, Terminal, Zap, Shield, GitBranch, LayoutPanelLeft } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation, useParallax } from "@/lib/gsap-utils"
import { useLanguage } from "@/components/LanguageContext"

export default function Workflow() {
  const { t } = useLanguage()
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const stepsRef = useStaggerAnimation(0.3, { triggerStart: "top 70%" })
  const blob1Ref = useParallax(0.15)

  const workflowSteps = [
    {
      icon: <Search size={32} className="text-black" />,
      title: t.workflow.step1.title,
      description: t.workflow.step1.desc,
      color: "bg-[#00d4ff]",
    },
    {
      icon: <LayoutPanelLeft size={32} className="text-white" />,
      title: t.workflow.step2.title,
      description: t.workflow.step2.desc,
      color: "bg-slate-800 border border-[#00d4ff]/30",
    },
    {
      icon: <Terminal size={32} className="text-black" />,
      title: t.workflow.step3.title,
      description: t.workflow.step3.desc,
      color: "bg-slate-200",
    },
    {
      icon: <Zap size={32} className="text-black" />,
      title: t.workflow.step4.title,
      description: t.workflow.step4.desc,
      color: "bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.5)]",
    },
  ]

  return (
    <section id="workflow" className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#00d4ff]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <GitBranch className="text-[#00d4ff] w-8 h-8" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter">
              {t.workflow.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-[#00d4ff] mx-auto rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.workflow.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-px bg-white/10 -z-10" />

          {workflowSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Step Number Badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#111] border border-[#00d4ff]/30 rounded-full flex items-center justify-center text-[#00d4ff] text-xs font-black z-20 shadow-lg">
                0{index + 1}
              </div>

              {/* Icon Card */}
              <div className={`w-28 h-28 ${step.color} cursor-target rounded-[2rem] rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 flex items-center justify-center shadow-2xl mb-8 z-10`}>
                <div className="-rotate-3 group-hover:-rotate-12 transition-transform duration-500">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00d4ff] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed px-2 transition-colors group-hover:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}