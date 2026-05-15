"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2 } from "lucide-react"

interface Song {
  title: string
  artist: string
  src: string
}

// PLAYLIST SUDAH DISINKRONKAN DENGAN FOLDER PUBLIC/SONGS
const PLAYLIST: Song[] = [
  {
    title: "Champagne Supernova",
    artist: "Oasis",
    src: "/songs/Champagne Supernova (Remastered).mp3",
  },
  {
    title: "Cheating on You",
    artist: "Charlie Puth",
    src: "/songs/Charlie Puth - Cheating on You.mp3",
  },
  {
    title: "Tumblr Girls",
    artist: "G-Eazy",
    src: "/songs/G-Eazy - Tumblr Girls.mp3",
  },
  {
    title: "Perfect Strangers",
    artist: "Jonas Blue ft. JP Cooper",
    src: "/songs/Jonas Blue - Perfect Strangers ft. JP Cooper.mp3",
  },
  {
    title: "Baby",
    artist: "Justin Bieber ft. Ludacris",
    src: "/songs/Justin Bieber - Baby ft. Ludacris.mp3",
  },
  {
    title: "Multo",
    artist: "Unknown Artist",
    src: "/songs/Multo.mp3",
  },
  {
    title: "Cheerleader",
    artist: "OMI",
    src: "/songs/OMI - Cheerleader.mp3",
  },
  {
    title: "Cigarettes After Sex",
    artist: "Silver Sable",
    src: "/songs/Silver Sable - Cigarettes After Sex.mp3",
  },
  {
    title: "Sunsetz",
    artist: "Cigarettes After Sex",
    src: "/songs/Sunsetz - Cigarettes After Sex.mp3",
  },
  {
    title: "I'm In Love With You",
    artist: "The 1975",
    src: "/songs/The 1975 - I'm In Love With You (Official Video) - The1975VEVO.mp3",
  },
  {
    title: "About You / Robbers (Medley)",
    artist: "The 1975",
    src: "/songs/The 1975 __ About You - Robbers - An Encounter - I Always Wanna Die - Medicine - Head.Cars.Bending - Up And Drumming.mp3",
  },
  {
    title: "It's Not Living",
    artist: "The 1975",
    src: "/songs/The 1975 ~ It's Not Living (If It's Not With You) Lyrics - heartbroke corner.mp3",
  },
  {
    title: "The Man Who Can't Be Moved",
    artist: "The Script",
    src: "/songs/The Script - The Man Who Can’t Be Moved (Official Video) - TheScriptVEVO.mp3",
  }
]

export default function VibePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // State variables for draggable functionality
  const [position, setPosition] = useState({ x: 24, y: 0 }) 
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Initialize position on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialY = window.innerHeight - 160; 
      setPosition(prev => ({
        ...prev,
        y: Math.max(0, initialY)
      }));
    }
  }, []); 

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Initialize specific random song on mount
  useEffect(() => {
    setCurrentSongIndex(Math.floor(Math.random() * PLAYLIST.length))
  }, [])

  // Mouse event handlers for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    const containerWidth = typeof window !== 'undefined' ? (window.innerWidth || document.documentElement.clientWidth) : 0;
    const containerHeight = typeof window !== 'undefined' ? (window.innerHeight || document.documentElement.clientHeight) : 0;
    const playerWidth = isHovered ? 320 : 56; 
    const playerHeight = isHovered ? 160 : 56; 
    newX = Math.max(10, Math.min(containerWidth - playerWidth - 10, newX));
    newY = Math.max(10, Math.min(containerHeight - playerHeight - 10, newY));
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset, isHovered]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  }, [position]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    let newX = touch.clientX - dragOffset.x;
    let newY = touch.clientY - dragOffset.y;
    const containerWidth = typeof window !== 'undefined' ? (window.innerWidth || document.documentElement.clientWidth) : 0;
    const containerHeight = typeof window !== 'undefined' ? (window.innerHeight || document.documentElement.clientHeight) : 0;
    const playerWidth = isHovered ? 320 : 56; 
    const playerHeight = isHovered ? 160 : 56; 
    newX = Math.max(10, Math.min(containerWidth - playerWidth - 10, newX));
    newY = Math.max(10, Math.min(containerHeight - playerHeight - 10, newY));
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset, isHovered]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const initAudio = useCallback(() => {
    if (audioRef.current) return
    audioRef.current = new Audio(PLAYLIST[currentSongIndex].src)
    audioRef.current.volume = 0.4
    const audio = audioRef.current
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length)
    }
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", handleEnded)
    setIsInitialized(true)
  }, [currentSongIndex])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isInitialized])

  useEffect(() => {
    const startAudioOnInteract = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        if (!isInitialized) initAudio()
        setIsPlaying(true)
      }
    }
    window.addEventListener('click', startAudioOnInteract, { once: true })
    window.addEventListener('scroll', startAudioOnInteract, { once: true })
    window.addEventListener('keydown', startAudioOnInteract, { once: true })
    return () => {
      window.removeEventListener('click', startAudioOnInteract)
      window.removeEventListener('scroll', startAudioOnInteract)
      window.removeEventListener('keydown', startAudioOnInteract)
    }
  }, [hasInteracted, isInitialized, initAudio])

  useEffect(() => {
    if (!isInitialized) return
    if (audioRef.current) {
      const wasPlaying = isPlaying
      audioRef.current.src = PLAYLIST[currentSongIndex].src
      audioRef.current.load()
      if (wasPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSongIndex, isInitialized])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    if (!isInitialized) initAudio()
    setIsPlaying(!isPlaying)
  }
  
  const playNext = () => {
    if (!isInitialized) initAudio()
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  const playPrev = () => {
    if (!isInitialized) initAudio()
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const toggleMute = () => setIsMuted(!isMuted)

  return (
    <div
      className={`cursor-target fixed z-50 transition-all duration-500 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease',
        width: isHovered ? '320px' : '56px' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={`
        relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl p-4
        transition-all duration-500 ease-out
        ${isHovered ? "w-80" : "w-14 h-14 p-0 rounded-full flex items-center justify-center cursor-pointer"}
      `}>
        
        {!isHovered && (
          <div className="relative w-full h-full flex items-center justify-center" onClick={() => setIsHovered(true)}>
             <div className={`absolute inset-0 bg-amber-500/20 rounded-full ${isPlaying ? 'animate-ping' : ''}`} />
             <Music2 className={`w-6 h-6 text-amber-400 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
        )}

        <div className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0 hidden"}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="overflow-hidden">
              <h3 className="text-white font-bold text-sm truncate w-48">{PLAYLIST[currentSongIndex].title}</h3>
              <p className="text-gray-400 text-xs truncate">{PLAYLIST[currentSongIndex].artist}</p>
            </div>
            
            <div className="flex items-end gap-1 h-6">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-amber-400 rounded-t-sm transition-all duration-300 ${isPlaying ? 'animate-music-bar' : 'h-1'}`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    height: isPlaying ? `${Math.random() * 100}%` : '4px'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1 mb-4">
            <div 
              className="bg-linear-to-r from-amber-400 to-orange-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="flex items-center gap-4">
              <button onClick={playPrev} className="text-gray-300 hover:text-amber-400 transition-colors">
                <SkipBack size={18} fill="currentColor" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
              </button>

              <button onClick={playNext} className="text-gray-300 hover:text-amber-400 transition-colors">
                <SkipForward size={18} fill="currentColor" />
              </button>
            </div>
             
             <div className="w-4" /> 
          </div>
        </div>

        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-white opacity-10 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}