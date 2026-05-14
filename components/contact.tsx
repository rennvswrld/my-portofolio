"use client"

import type React from "react"
import { Mail, MapPin, Linkedin, Github, MessageSquare, ArrowUpRight, Copy, CheckCheck, ExternalLink } from "lucide-react"
import { useScrollAnimation, useParallax, useMagnetic } from "@/lib/gsap-utils"
import { useLanguage } from "@/components/LanguageContext"
import { useState } from "react"

export default function Contact() {
  const { t } = useLanguage()
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  
  const [copied, setCopied] = useState(false)
  const myEmail = "rendigans350@gmail.com" // Ganti dengan email aslimu

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background - Neon Cyan Vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4ff]/5 rounded-full blur-[150px]" />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Header & Context */}
          <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center lg:text-left">
            <div className="cursor-target inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
               <MessageSquare className="text-[#00d4ff] w-5 h-5 mr-2" />
               <span className="text-gray-300 text-sm font-medium px-2">{t.nav.contact}</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              {t.contact.title} <br/>
              <span className="text-[#00d4ff]">{t.contact.subtitle}?</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.contact.desc}
            </p>

            <div className="hidden lg:block">
               <MagneticButton href={`mailto:${myEmail}`} label={t.contact.buttonSend} />
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             
             {/* Email Card */}
             <div className="group relative bg-[#111] p-0.5 rounded-3xl transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-8">
                      <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-2xl flex items-center justify-center mb-4 text-[#00d4ff]">
                         <Mail size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{t.contact.emailLabel}</h3>
                      <p className="text-gray-500 text-sm truncate">{myEmail}</p>
                   </div>
                   <button 
                     onClick={() => copyToClipboard(myEmail)}
                     className="flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-[#00d4ff]/10 rounded-xl text-xs font-bold text-gray-300 hover:text-[#00d4ff] transition-all"
                   >
                     <span>{copied ? "Copied!" : "Copy Email"}</span>
                     {copied ? <CheckCheck size={16} className="text-[#00d4ff]" /> : <Copy size={16} />}
                   </button>
                </div>
             </div>

             {/* LinkedIn Card */}
             <div className="group relative bg-[#111] p-0.5 rounded-3xl transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-8">
                      <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-2xl flex items-center justify-center mb-4 text-[#00d4ff]">
                         <Linkedin size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">LinkedIn</h3>
                      <p className="text-gray-500 text-sm">Rendi Saputra</p>
                   </div>
                   <a 
                     href="https://www.linkedin.com/in/rendi-saputra-020aa4340/" // Ganti dengan linkmu
                     target="_blank"
                     className="flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-[#00d4ff]/10 rounded-xl text-xs font-bold text-gray-300 hover:text-[#00d4ff] transition-all"
                   >
                     <span>Connect</span>
                     <ArrowUpRight size={16} />
                   </a>
                </div>
             </div>

             {/* GitHub Card */}
             <div className="group relative bg-[#111] p-0.5 rounded-3xl transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-8">
                      <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-2xl flex items-center justify-center mb-4 text-[#00d4ff]">
                         <Github size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">GitHub</h3>
                      <p className="text-gray-500 text-sm">@rennvswrld</p>
                   </div>
                   <a 
                     href="https://github.com/rennvswrld" // Ganti dengan linkmu
                     target="_blank"
                     className="flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-[#00d4ff]/10 rounded-xl text-xs font-bold text-gray-300 hover:text-[#00d4ff] transition-all"
                   >
                     <span>Follow</span>
                     <ArrowUpRight size={16} />
                   </a>
                </div>
             </div>

             {/* Location Card */}
             <div className="group relative bg-[#111] p-0.5 rounded-3xl transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#111]/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-8">
                      <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-2xl flex items-center justify-center mb-4 text-[#00d4ff]">
                         <MapPin size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">Location</h3>
                      <p className="text-gray-500 text-sm">Bandar Lampung, ID</p>
                   </div>
                   <div className="flex items-center justify-between w-full py-3 px-4 bg-white/5 rounded-xl text-[10px] font-black uppercase text-gray-500 border border-white/5 cursor-default">
                     <span>Remote / On-site</span>
                     <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse shadow-[0_0_10px_#00d4ff]"></div>
                   </div>
                </div>
             </div>

          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden text-center mt-8">
              <MagneticButton href={`mailto:${myEmail}`} label={t.contact.buttonSend} />
          </div>

        </div>
      </div>
    </section>
  )
}

// Magnetic Button Component
function MagneticButton({ href, label }: { href: string, label: string }) {
  const buttonRef = useMagnetic(0.4)

  return (
    <a
      ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      className="cursor-target inline-flex items-center justify-center px-10 py-5 bg-[#00d4ff] text-black font-black rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] group overflow-hidden relative"
    >
      <span className="relative z-10 mr-3">{label}</span>
      <Mail size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
    </a>
  )
}