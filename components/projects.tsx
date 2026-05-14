"use client";

import { useState } from "react";
import {
  FolderGit2,
  Network,
  Cpu,
  Code2,
  Megaphone
} from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-utils";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";

export default function Projects() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const headerRef = useScrollAnimation({ triggerStart: "top 80%" });
  const projectsGridRef = useStaggerAnimation(0.12, { triggerStart: "top 75%" });

  // Filter logika
  const filteredProjects = t.projects.items?.filter((project: any) => {
    return selectedCategory === "all" || project.category === selectedCategory;
  }) || [];

  // Icon yang disesuaikan dengan kategori (network, web, iot, activity)
  const categoryIcons: any = {
    network: <Network className="w-4 h-4" />,
    web: <Code2 className="w-4 h-4" />,
    iot: <Cpu className="w-4 h-4" />,
    activity: <Megaphone className="w-4 h-4" />
  };

  // Image Mapping (Bisa kamu sesuaikan dengan nama file gambarmu nanti)
  const imageMapping: any = {
    0: "/proj-ospf.png",    // Gambar 1: Topologi OSPF & BGP
    1: "/proj-web.png",     // Gambar 2: Web Django Smart City
    2: "/proj-iot.jpg",     // Gambar 3: Skema RFID MQTT
    3: "/proj-lab.jpeg",    // Gambar 4: Cisco Lab (Ganti "/proj-lab.jpg" nanti kalau fotonya udah ada)
    4: "/proj-seminar.jpeg"      // Gambar 5: Seminar (Ganti "/proj-seminar.jpg" nanti kalau fotonya udah ada)
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00d4ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00d4ff]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
            <FolderGit2 className="text-[#00d4ff] w-5 h-5 mr-2" />
            <span className="text-gray-300 text-sm font-medium px-2">{t.nav.projects}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t.projects.title} <span className="text-[#00d4ff]">{t.projects.subtitle}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            {t.projects.desc}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {Object.entries(t.projects.filters).map(([id, label]: [string, any]) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`
                relative px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer
                ${selectedCategory === id 
                  ? "bg-[#00d4ff] text-black border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.4)]" 
                  : "bg-transparent text-gray-400 border-white/10 hover:border-[#00d4ff]/50 hover:text-white"}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef as React.RefObject<HTMLDivElement>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any, index: number) => {
              // Jika data di-filter, index bisa acak. Kita gunakan fallback logic.
              // Mencocokkan index statis untuk memuat gambar yang tepat
              const imgIndex = t.projects.items.findIndex((p:any) => p.title === project.title);
              
              return (
                <div key={index} className="group relative h-full">
                  <div className="cursor-target relative h-full bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00d4ff]/40 transition-all duration-500 flex flex-col shadow-2xl">
                    
                    {/* Image Section */}
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-[#222] animate-pulse" />
                      <Image
                        src={imageMapping[imgIndex] || "/p1.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
                      
                      {/* Category Tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">
                        {categoryIcons[project.category]} {project.category}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-7 flex flex-col grow">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {project.desc}
                      </p>

                      {/* Tech Stack */}
                      <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 group-hover:text-[#00d4ff] group-hover:border-[#00d4ff]/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}