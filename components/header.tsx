"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Home, User, Code2, Briefcase, FolderGit2, Mail, Workflow, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/LanguageContext"
import { languages } from "@/lib/translations"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  
  const { lang, setLang, t } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY)
        setIsScrolled(true)
      } else {
        setIsVisible(true)
        setIsScrolled(false)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    const sections = ["home", "about", "skills", "workflow", "experience", "projects", "contact"]
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }
    const observer = new IntersectionObserver(observerCallback, { rootMargin: "-30% 0px -50% 0px" })
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [lastScrollY])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "about", label: t.nav.about, icon: User },
    { id: "skills", label: t.nav.skills, icon: Code2 },
    { id: "workflow", label: t.nav.workflow, icon: Workflow },
    { id: "experience", label: t.nav.experience, icon: Briefcase },
    { id: "projects", label: t.nav.projects, icon: FolderGit2 },
    { id: "contact", label: t.nav.contact, icon: Mail },
  ]

  // Cari data bahasa yang aktif sekarang
  const currentLangData = languages.find(l => l.code === lang)

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform flex justify-center", isVisible ? "translate-y-0" : "-translate-y-full", isScrolled ? "py-2" : "py-4")}>
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-center">
        <div className={cn("relative flex items-center justify-between px-4 py-2 rounded-full border transition-all duration-500 w-full md:w-auto md:gap-8", isScrolled ? "bg-[#050505]/80 border-[#00d4ff]/20 backdrop-blur-xl shadow-lg shadow-[#00d4ff]/10" : "bg-transparent border-transparent")}>
          
          {/* Logo Section */}
          <button onClick={() => scrollToSection("home")} className="group relative z-10 flex items-center gap-3">
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform flex items-center justify-center bg-[#111] rounded-xl border border-[#00d4ff]/20 overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                <img src="/favicon.svg" alt="RENN Logo" className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-white font-black tracking-tighter text-lg leading-none">RENNVSWRLD<span className="text-[#00d4ff]">.</span></span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Portfolio</span>
            </div>
          </button>

          {/* Desktop Nav & Custom Language Switcher */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            <nav className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={cn("relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", activeSection === item.id ? "text-black bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.4)]" : "text-gray-400 hover:text-white hover:bg-white/5")}>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CUSTOM DROPDOWN LANGUAGE */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/5 transition-all text-white text-sm font-bold min-w-[100px] justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Globe className={cn("w-4 h-4 transition-colors", isLangOpen ? "text-[#00d4ff]" : "text-gray-400")} />
                  <span className="uppercase">{lang}</span>
                </div>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isLangOpen && "rotate-180")} />
              </button>

              {/* Dropdown Menu */}
              <div className={cn(
                "absolute top-full mt-2 right-0 w-56 bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 origin-top-right shadow-2xl z-[60]",
                isLangOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}>
                <div className="p-2 grid gap-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as any); setIsLangOpen(false); }}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all",
                        lang === l.code 
                          ? "bg-[#00d4ff] text-black font-bold" 
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{l.native}</span>
                      {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.5)]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-300 hover:text-[#00d4ff] transition-colors">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={cn("absolute top-full left-0 right-0 mx-4 mt-2 p-4 rounded-3xl bg-[#050505]/95 border border-[#00d4ff]/20 backdrop-blur-xl transition-all duration-300 origin-top md:hidden", isMobileMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none")}>
          <nav className="grid grid-cols-2 gap-2 mb-6">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={cn("flex items-center gap-3 p-3 rounded-xl transition-all duration-200", activeSection === item.id ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30" : "hover:bg-white/5 text-gray-400 hover:text-white")}>
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Mobile Language Grid */}
          <div className="border-t border-white/10 pt-4">
             <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 px-2">Select Language</p>
             <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button 
                    key={l.code} 
                    onClick={() => { setLang(l.code as any); setIsMobileMenuOpen(false); }} 
                    className={cn("px-2 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all text-center", lang === l.code ? "bg-[#00d4ff] text-black border-[#00d4ff]" : "bg-white/5 text-gray-400 border-white/10")}
                  >
                    {l.code}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}