"use client"

import { useState } from "react"
import OptimizedImage from "./optimized-image"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Sparkles,
  Code2,
  Terminal,
  ArrowUp
} from "lucide-react"
import { useLanguage } from "@/components/LanguageContext"

export default function Footer() {
  const { t, currentLanguage } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ]

  const services = [
    { icon: Terminal, label: "Network Engineering" },
    { icon: Code2, label: "Backend Django" },
    { icon: Sparkles, label: "AI Enthusiast" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/rennvswrld", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rendi-saputra-020aa4340/", label: "LinkedIn" },
    { icon: Instagram, href:"https://www.instagram.com/rennvswrld?igsh=MTh1YXBtMDNscTg3MA==", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-[#050505] relative overflow-hidden border-t border-white/5" style={{ clipPath: "polygon(0 0, calc(8% + 20px) 0, calc(8% + 40px) 40px, 100% 40px, 100% 100%, 0 100%)" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Folder tab highlight */}
        <div className="absolute top-0 left-[8%] w-24 h-10 bg-[#050505]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 40px, calc(100% - 20px) 40px, calc(100% - 20px) calc(100% - 10px), 0 calc(100% - 10px))" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand & Services */}
          <div className="lg:col-span-1">
            <button
              onClick={() => scrollToSection("home")}
              className="group inline-block mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#008fb3] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                 R
                </div>
                <div className="text-left">
                  <span className="text-white font-bold text-xl tracking-tighter">RENNVSWRLD.</span>
                  <p className="text-[#00d4ff] text-[10px] font-bold uppercase tracking-widest">Portfolio</p>
                </div>
              </div>
            </button>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {currentLanguage === 'id' 
                ? "Membangun infrastruktur jaringan dan solusi digital masa depan dengan presisi." 
                : "Building future-proof network infrastructure and digital solutions with precision."}
            </p>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.label} className="flex items-center gap-3 text-gray-500 hover:text-[#00d4ff] transition-colors">
                  <service.icon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#00d4ff]"></span>
              Quick Links
            </h3>
            <nav className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-500 hover:text-[#00d4ff] transition-all duration-300 text-sm flex items-center gap-2 group cursor-pointer"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-[#00d4ff] transition-all duration-300"></span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#00d4ff]"></span>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:rendigans350@gmail.com"
                className="flex items-center gap-3 text-gray-500 hover:text-[#00d4ff] transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">rendigans350@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-sm">Bandar Lampung, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Sparkles className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-sm">Available for Work </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="cursor-target w-10 h-10 bg-white/5 hover:bg-[#00d4ff]/10 border border-white/10 hover:border-[#00d4ff]/50 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-500 group-hover:text-[#00d4ff] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#00d4ff]"></span>
              Stay Updated
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Follow to get the latest updates on my network projects and tech stack.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#00d4ff] text-black font-bold py-3 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 transform active:scale-95"
              >
                {isSubscribed ? "✓ Following!" : "Follow"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} <span className="text-white">Rendi Saputra</span>. All rights reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest cursor-pointer"
          >
            Back to top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}