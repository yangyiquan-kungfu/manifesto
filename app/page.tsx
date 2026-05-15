"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ExternalLink, BookOpen, Play, ChevronDown, MapPin, Award, Scroll } from "lucide-react"

// ============================================================================
// TYPES & DATA
// ============================================================================

interface TechnicalTerm {
  chinese: string
  pinyin: string
  english: string
  description: string
  category: "nei-gong" | "technique" | "philosophy" | "therapy"
}

const technicalTerms: TechnicalTerm[] = [
  {
    chinese: "發勁",
    pinyin: "Fajin",
    english: "Explosive Power Emission",
    description: "The explosive release of internal energy (Qi) from the Dan Tian through the body's kinetic chain. In Yangyiquan, Fajin represents the culmination of proper body mechanics: the feet root into earth, force spirals through the legs, amplifies at the hips, channels through the spine, and explodes through the striking limb. This is not mere muscular force—it is the coordinated release of accumulated tension and intention.",
    category: "technique"
  },
  {
    chinese: "內功",
    pinyin: "Nei Gong",
    english: "Internal Power Work",
    description: "The systematic cultivation of internal power through breathing, meditation, and intention-based exercises. Yangyiquan's Nei Gong system comprises the 4 Extreme Powers (Sì Jí Fǎ) and 5 Intermediate Powers (Wǔ Zhōng Fǎ), forming a complete matrix of psycho-spiritual combat capabilities that transcend conventional physical training.",
    category: "nei-gong"
  },
  {
    chinese: "道治療",
    pinyin: "Dao Zhiliao",
    english: "The Way of Healing",
    description: "The therapeutic dimension of Yangyiquan that unifies martial art with healing science. Through deep empathy (Shíbié Bié Rén Xīn), controlled breathing techniques, and energetic manipulation, the practitioner becomes capable of healing physical, emotional, and spiritual wounds—both in self and others. Combat and healing are two expressions of the same internal mastery.",
    category: "therapy"
  },
  {
    chinese: "已經",
    pinyin: "Yǐ Jīng",
    english: "The 'Already Is'",
    description: "The supreme power of Yangyiquan's Nei Gong system. Yǐ Jīng represents omniscient awareness—the understanding that all reality already exists in complete form, though hidden from ordinary perception. The practitioner who masters this power perceives patterns, intentions, and consequences invisible to the untrained mind, operating from a position of absolute informational superiority.",
    category: "nei-gong"
  },
  {
    chinese: "識別別人心",
    pinyin: "Shíbié Bié Rén Xīn",
    english: "Identifying Another's Heart",
    description: "The revolutionary empathic technique of Yangyiquan. This power enables the warrior to occupy the emotional space of the adversary, sensing their deepest motivations, primal fears, and hidden intentions. In combat, this allows anticipation not merely of physical movements, but of the opponent's complete psychological strategy.",
    category: "nei-gong"
  },
  {
    chinese: "創造",
    pinyin: "Chuàng Zào",
    english: "Creation",
    description: "The power of creative observation—studying nature to develop original techniques. Following the methodology of ancient Chinese masters, the practitioner observes animals, trees, rocks, and wind patterns, translating natural principles of mechanical efficiency into devastating martial applications. The five pillars: Create, Practice Alone, Practice with Partner, Apply in Controlled Sparring, Apply in Real Combat.",
    category: "nei-gong"
  },
  {
    chinese: "斬",
    pinyin: "Zhǎn",
    english: "The Cut / Severance",
    description: "Both a physical technique and spiritual ritual. Physically: the decisive cutting strike with hand edge, elbow, or penetrating fingers. Spiritually: the deliberate severance of energetic, psychological, and karmic bonds that drain power. Through coordinated body, breath, and intention, the practitioner literally 'cuts' invisible chains connecting them to fear, resentment, and doubt.",
    category: "technique"
  },
  {
    chinese: "藏寶",
    pinyin: "Cáng Bǎo",
    english: "The Hidden Treasure",
    description: "The power revealing Qi's deepest nature: not merely 'vital energy' but information—the totality of thoughts, intentions, and emotional states floating in the air that all beings breathe. Master this power and possess absolute informational advantage. The instruction: 'If you inhale facing fear, it no longer dominates you.' One vehement inhalation absorbs the adversary's Yang—their courage, determination, strength.",
    category: "nei-gong"
  },
  {
    chinese: "龍地拳",
    pinyin: "Long Di Quan",
    english: "Dragon Earth Fist",
    description: "Devastating horizontal strike executed with complete hip rotation. The fist travels parallel to ground—symbolizing earthly stability—generating force through the kinetic chain: feet-knees-hips-spine-shoulder-elbow-fist. The rear hand remains retracted at hip simulating prior grip, amplifying power through counter-tension. Final impact produced with Fajin explosive release from Dan Tian.",
    category: "technique"
  },
  {
    chinese: "龍山爪",
    pinyin: "Long Shan Zhao",
    english: "Dragon Extends Claw",
    description: "Penetrating attack with fingers formed as claw or spear, targeting soft zones of maximum neurological vulnerability. The technique operates on the principle that fingertips have invisible energetic extension that penetrates where they touch, transmitting the warrior's intention directly into the opponent's nervous system.",
    category: "technique"
  },
  {
    chinese: "陰陽",
    pinyin: "Yin Yang",
    english: "Shadow & Light Principle",
    description: "The fundamental cosmic duality governing all phenomena. In Yangyiquan: 'Place Yin within—peace, receptivity, listening—and possess the tranquility of calm lake. Place Yang within—light, initiative, force—and possess the illumination of sun. Place Yin outside—mystery, shadow, unpredictability—and draw the adversary into your trap.' Who integrates all Yin and Yang becomes a universe.",
    category: "philosophy"
  },
  {
    chinese: "內線踢腿",
    pinyin: "Inside Groin Kick",
    english: "Ascending Inner-Line Strike",
    description: "Signature technique emphasizing ascending strikes along the body's vulnerable inner line. Biomechanically efficient attacks targeting the groin, inner thigh, and ascending toward vital organs. A cornerstone of Yangyiquan's tactical philosophy: attack the slow (roots), not the fast (leaves). Destroy the pillars; the house collapses.",
    category: "technique"
  },
]

const videos = [
  { title: "System Essence", url: "https://www.instagram.com/reel/DYO0Ie4MYEH/", platform: "instagram" },
  { title: "Defensive Arsenal", url: "https://youtu.be/aI7MKLiloQ8", platform: "youtube" },
  { title: "Kicking Mechanics", url: "https://youtube.com/shorts/Ii6J7uD_iMI", platform: "youtube" },
  { title: "Impact Conditioning", url: "https://youtu.be/HjcjX-Po7XY", platform: "youtube" },
  { title: "Martial Recovery", url: "https://youtu.be/2FNYNQo8pe0", platform: "youtube" },
  { title: "Instructional Pedagogy", url: "https://youtu.be/vU92MrxgyCE", platform: "youtube" },
]

const books = [
  { 
    title: "Yangyiquan Kung Fu — Volume I: Foundations of the Art", 
    subtitle: "陽意拳功夫 — 第一卷",
    url: "https://clubedeautores.pt/livro/vol-1-kung-fu-yangyiquan",
    description: "Complete introduction to the system's philosophy, basic techniques, and foundational training methods."
  },
  { 
    title: "Yangyiquan Kung Fu — Volume II: Advanced Combat Systems", 
    subtitle: "陽意拳功夫 — 第二卷",
    url: "https://clubedeautores.pt/livro/vol-2-kung-fu-yangyiquan",
    description: "In-depth exploration of combat applications, Nei Gong development, and strategic principles."
  },
  { 
    title: "Yangyiquan Kung Fu & Dao Zhiliao — Volume III: The Way of Healing", 
    subtitle: "陽意拳功夫與道治療 — 第三卷",
    url: "https://clubedeautores.pt/livro/vol-3-kung-fu-yangyiquan-dao-zhiliao",
    description: "Integration of martial arts with therapeutic healing practices and spiritual cultivation."
  },
]

// ============================================================================
// COMPONENTS
// ============================================================================

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: "#origin", label: "Origin" },
    { href: "#founder", label: "Founder" },
    { href: "#knowledge", label: "Knowledge Matrix" },
    { href: "#media", label: "Media" },
    { href: "#roadmap", label: "Roadmap" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl text-[#c5a059] font-bold">陽意拳</span>
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[#888888] hidden sm:inline">YANGYIQUAN</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm tracking-wider text-[#888888] hover:text-[#c5a059] transition-colors"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[#c5a059] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-[#2a2a2a] mt-2 pt-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm tracking-wider text-[#888888] hover:text-[#c5a059] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tactical-grid">
      {/* Background Image - optimized for mobile */}
      <div className="absolute inset-0">
        <Image
          src="/images/flying-kick.png"
          alt="Yangyiquan Kung Fu"
          fill
          className="object-cover object-center opacity-30"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-20">
        {/* Chinese Title - using consistent font for traditional characters */}
        <h1 className="font-[family-name:var(--font-chinese)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#c5a059] mb-4 tracking-wider font-bold">
          陽意拳
        </h1>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#8b0000]" />
          <span className="text-[#8b0000] text-base sm:text-lg">◆</span>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#8b0000]" />
        </div>
        
        {/* English Title */}
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] sm:tracking-[0.3em] text-[#e5e5e5] mb-3 sm:mb-4">
          YANGYIQUAN KUNG FU
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-[#c5a059] italic mb-6 sm:mb-8">
          The Fist of Nurturing Intention
        </p>
        
        {/* Subtitle */}
        <div className="bg-[#111111]/80 border border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 inline-block mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] text-[#888888]">
            OFFICIAL CERTIFICATION DOSSIER
          </p>
          <p className="text-[10px] sm:text-xs text-[#666666] mt-1">
            Self Defense Association — International Martial Arts Evaluation
          </p>
        </div>

        {/* Founder Badge */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#666666]">FOUNDED BY</p>
          <p className="font-[family-name:var(--font-chinese)] text-2xl sm:text-3xl text-[#c5a059] font-bold">神秘龍</p>
          <p className="text-xs sm:text-sm text-[#888888]">Shénmì Lóng — &ldquo;The Mystical Dragon&rdquo;</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#c5a059]" />
        </div>
      </div>
    </section>
  )
}

function OriginSection() {
  return (
    <section id="origin" className="py-16 sm:py-24 px-4 bg-[#0a0a0a] tactical-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2">CHAPTER I</p>
          <h2 className="font-[family-name:var(--font-chinese)] text-3xl sm:text-4xl md:text-5xl text-[#c5a059] mb-4 font-bold">
            Etymology &amp; Philosophy
          </h2>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto" />
        </div>

        {/* Etymology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            { char: "陽", pinyin: "Yáng", meaning: "Light, Sun, the Luminous Principle. Symbolizes internal illumination of consciousness and radiant force of the warrior spirit." },
            { char: "意", pinyin: "Yì", meaning: "Intention, Mind, Will. The pulsing core: the idea preceding movement, thought governing energy, will directing Qi. Without Yi, no true Wushu." },
            { char: "拳", pinyin: "Quán", meaning: "Fist, combat system, martial art. Designates not only the physical strike but the totality of a structured system of techniques, principles, and philosophy." },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#111111] border border-[#2a2a2a] p-6 sm:p-8 hover:border-[#c5a059]/50 transition-colors group">
              <div className="font-[family-name:var(--font-chinese)] text-5xl sm:text-6xl text-[#c5a059] mb-3 sm:mb-4 group-hover:scale-110 transition-transform inline-block font-bold">
                {item.char}
              </div>
              <p className="text-base sm:text-lg text-[#e5e5e5] mb-2">{item.pinyin}</p>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>

        {/* Supreme Principle */}
        <div className="bg-[#111111] border-l-4 border-[#8b0000] p-5 sm:p-8 mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-3 sm:mb-4">THE SUPREME PRINCIPLE</p>
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-[#e5e5e5] italic mb-3 sm:mb-4 leading-relaxed">
            &ldquo;The greatest war you ever won is the one you never started.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-[#888888]">
            — Shifu Pedro Barros (Sultan Assad Abd-Al-Ghalib)
          </p>
        </div>

        {/* Three Virtues */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#666666] mb-4">THE THREE UNBREAKABLE VIRTUES</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { chinese: "忍耐", name: "Patience (Rěnnài)", desc: "The manifestation of inner dominion. The warrior who cultivates patience transforms suffering into fuel for growth." },
            { chinese: "善意", name: "Kindness (Shànyì)", desc: "The source of all lasting strength. Not naive sentimentality, but deep understanding of human nature." },
            { chinese: "寬恕", name: "Forgiveness (Kuānshù)", desc: "The strategic act of supreme spiritual intelligence. Forgiveness liberates your energy field." },
          ].map((virtue, idx) => (
            <div key={idx} className="bg-[#0f0f0f] border border-[#2a2a2a] p-5 sm:p-6 text-center hover:bg-[#111111] transition-colors">
              <div className="font-[family-name:var(--font-chinese)] text-3xl sm:text-4xl text-[#c5a059] mb-2 sm:mb-3 font-bold">
                {virtue.chinese}
              </div>
              <h3 className="text-base sm:text-lg text-[#e5e5e5] font-medium mb-2 sm:mb-3">{virtue.name}</h3>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">{virtue.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderSection() {
  return (
    <section id="founder" className="py-16 sm:py-24 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2">THE FOUNDER</p>
          <h2 className="font-[family-name:var(--font-chinese)] text-3xl sm:text-4xl md:text-5xl text-[#c5a059] mb-3 sm:mb-4 font-bold">
            神秘龍
          </h2>
          <p className="text-base sm:text-xl text-[#888888]">Shénmì Lóng — The Mystical Dragon</p>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Gallery - optimized for all devices */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative aspect-square overflow-hidden border border-[#2a2a2a]">
              <Image 
                src="/images/founder-portrait.jpg" 
                alt="Shifu Pedro Barros - The Mystical Dragon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] to-transparent p-4 sm:p-6">
                <p className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl text-[#c5a059] font-bold">Pedro Barros</p>
                <p className="text-xs sm:text-sm text-[#888888]">Sultan Assad Abd-Al-Ghalib</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-square overflow-hidden border border-[#2a2a2a]">
                <Image 
                  src="/images/staff-training.png" 
                  alt="Staff weapon training"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden border border-[#2a2a2a]">
                <Image 
                  src="/images/founder-studio.jpg" 
                  alt="Training studio"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Official Identity Notice */}
            <div className="bg-[#111111] border border-[#2a2a2a] p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#c5a059] mb-2">OFFICIAL IDENTITY NOTICE</p>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    The founder is recognized institutionally and spiritually by his Islamic religious name, 
                    <span className="text-[#e5e5e5]"> Sultan Assad Abd-Al-Ghalib</span>, currently in legal 
                    transition to establish as his definitive civil name. His martial title is 
                    <span className="font-[family-name:var(--font-chinese)] text-[#c5a059] font-bold"> 神秘龍 </span>
                    (Shénmì Lóng), The Mystical Dragon.
                  </p>
                </div>
              </div>
            </div>

            {/* Tactical Pedigree */}
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-3 sm:mb-4">TACTICAL PEDIGREE</p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    period: "Ages 12–17",
                    title: "Karate Shukokai",
                    detail: "Training under Sensei Carmindo Paiva, including experience with the Portuguese National Team."
                  },
                  {
                    period: "Advanced Study",
                    title: "Hapkido Mastery",
                    detail: "Formal mastery under Master António (Porto), who instructed law enforcement."
                  },
                  {
                    period: "System Engineering",
                    title: "Kung Fu Development",
                    detail: "Training under Sifu Diogo Sant'Ana (She-Si/Lo Leong Macau lineage)."
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#2a2a2a] pl-3 sm:pl-4 hover:border-[#c5a059] transition-colors">
                    <p className="text-[10px] sm:text-xs text-[#666666] mb-1">{item.period}</p>
                    <p className="text-base sm:text-lg text-[#e5e5e5] font-medium">{item.title}</p>
                    <p className="text-xs sm:text-sm text-[#888888]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spiritual Evolution */}
            <div className="bg-[#0a0a0a] border border-[#8b0000]/30 p-4 sm:p-6">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2 sm:mb-3">SPIRITUAL EVOLUTION</p>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                The founder&apos;s ethical core was forged during a 6-7 year martial sabbatical devoted to 
                deep moral refinement. In <span className="text-[#c5a059]">April 2026</span>, he formally 
                embraced Islam, adopting the name Sultan Assad Abd-Al-Ghalib.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KnowledgeMatrixSection() {
  const [selectedTerm, setSelectedTerm] = useState<TechnicalTerm | null>(null)

  // Unified color system - consistent with website palette
  const categoryConfig: Record<string, { 
    bg: string
    bgHover: string
    border: string
    borderHover: string
    accent: string
    label: string
    labelChinese: string
  }> = {
    "nei-gong": { 
      bg: "bg-[#12100c]", 
      bgHover: "hover:bg-[#1a1510]",
      border: "border-[#c5a059]/20", 
      borderHover: "hover:border-[#c5a059]/60",
      accent: "#c5a059",
      label: "Internal Power",
      labelChinese: "內功"
    },
    "technique": { 
      bg: "bg-[#100a0a]", 
      bgHover: "hover:bg-[#150d0d]",
      border: "border-[#8b0000]/20", 
      borderHover: "hover:border-[#8b0000]/60",
      accent: "#8b0000",
      label: "Combat Technique",
      labelChinese: "技術"
    },
    "philosophy": { 
      bg: "bg-[#0c0c10]", 
      bgHover: "hover:bg-[#101014]",
      border: "border-[#6b7c8a]/20", 
      borderHover: "hover:border-[#6b7c8a]/60",
      accent: "#6b7c8a",
      label: "Philosophy",
      labelChinese: "哲學"
    },
    "therapy": { 
      bg: "bg-[#0c100c]", 
      bgHover: "hover:bg-[#101410]",
      border: "border-[#5a7a5a]/20", 
      borderHover: "hover:border-[#5a7a5a]/60",
      accent: "#5a7a5a",
      label: "Healing Arts",
      labelChinese: "治療"
    },
  }

  // Group terms by category for organized display
  const groupedTerms = {
    "nei-gong": technicalTerms.filter(t => t.category === "nei-gong"),
    "technique": technicalTerms.filter(t => t.category === "technique"),
    "philosophy": technicalTerms.filter(t => t.category === "philosophy"),
    "therapy": technicalTerms.filter(t => t.category === "therapy"),
  }

  return (
    <section id="knowledge" className="py-16 sm:py-24 px-4 bg-[#0a0a0a] tactical-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2">
            <span className="font-[family-name:var(--font-chinese)]">第二章</span> — NEI GONG &amp; TECHNIQUES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#c5a059] mb-3 sm:mb-4 font-bold">
            <span className="font-[family-name:var(--font-chinese)]">知識矩陣</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#e5e5e5] mb-2">Interactive Knowledge Matrix</p>
          <p className="text-xs sm:text-sm text-[#888888] max-w-2xl mx-auto px-4">
            Select any term to reveal its complete pedagogical definition from the official dossier.
          </p>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4" />
        </div>

        {/* Category Legend - Enhanced with Chinese */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 border"
                style={{ backgroundColor: config.accent + '20', borderColor: config.accent + '60' }}
              />
              <span className="font-[family-name:var(--font-chinese)] text-sm sm:text-base" style={{ color: config.accent }}>
                {config.labelChinese}
              </span>
              <span className="text-[10px] sm:text-xs text-[#666666]">({config.label})</span>
            </div>
          ))}
        </div>

        {/* Organized Matrix by Category */}
        <div className="space-y-8 sm:space-y-12">
          {Object.entries(groupedTerms).map(([category, terms]) => {
            if (terms.length === 0) return null
            const config = categoryConfig[category]
            
            return (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div 
                    className="w-1 h-8 sm:h-10"
                    style={{ backgroundColor: config.accent }}
                  />
                  <div>
                    <span 
                      className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl font-bold"
                      style={{ color: config.accent }}
                    >
                      {config.labelChinese}
                    </span>
                    <span className="text-xs sm:text-sm text-[#666666] ml-2 sm:ml-3">
                      {config.label} ({terms.length} {terms.length === 1 ? 'term' : 'terms'})
                    </span>
                  </div>
                </div>

                {/* Terms Grid for this category */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {terms.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTerm(term)}
                      className={`${config.bg} ${config.bgHover} ${config.border} ${config.borderHover} border p-4 sm:p-5 text-left transition-all duration-300 group relative overflow-hidden`}
                    >
                      {/* Thumbnail Background - Color-matched to category */}
                      <div 
                        className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{
                          background: `radial-gradient(circle at top right, ${config.accent} 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Chinese Characters - Primary Display */}
                      <div className="relative z-10">
                        <div 
                          className="font-[family-name:var(--font-chinese)] text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-105 transition-transform inline-block font-bold leading-tight"
                          style={{ color: config.accent }}
                        >
                          {term.chinese.split('').map((char, charIdx) => (
                            <span 
                              key={charIdx} 
                              className="font-[family-name:var(--font-chinese)] inline-block"
                              style={{ 
                                textShadow: `0 0 20px ${config.accent}30`
                              }}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                        
                        {/* Pinyin */}
                        <p 
                          className="text-sm sm:text-base font-medium mb-1"
                          style={{ color: config.accent }}
                        >
                          {term.pinyin}
                        </p>
                        
                        {/* English Translation */}
                        <p className="text-[11px] sm:text-xs text-[#888888] leading-relaxed line-clamp-2">
                          {term.english}
                        </p>
                      </div>

                      {/* Click Indicator */}
                      <div 
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: config.accent + '20', borderColor: config.accent }}
                      >
                        <span className="text-[10px] sm:text-xs" style={{ color: config.accent }}>+</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal - Enhanced with consistent typography */}
        {selectedTerm && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedTerm(null)}
          >
            <div 
              className="bg-[#0a0a0a] border border-[#2a2a2a] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 60px ${categoryConfig[selectedTerm.category].accent}15`
              }}
            >
              {/* Modal Header - Category colored */}
              <div 
                className="sticky top-0 border-b border-[#2a2a2a] p-5 sm:p-8 flex items-start justify-between"
                style={{ 
                  backgroundColor: '#0f0f0f',
                  borderLeft: `4px solid ${categoryConfig[selectedTerm.category].accent}`
                }}
              >
                <div>
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span 
                      className="font-[family-name:var(--font-chinese)] text-sm sm:text-base"
                      style={{ color: categoryConfig[selectedTerm.category].accent }}
                    >
                      {categoryConfig[selectedTerm.category].labelChinese}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#666666]">
                      / {categoryConfig[selectedTerm.category].label}
                    </span>
                  </div>
                  
                  {/* Chinese Term - Each character styled consistently */}
                  <div 
                    className="font-[family-name:var(--font-chinese)] text-5xl sm:text-6xl md:text-7xl mb-3 font-bold leading-tight"
                    style={{ color: categoryConfig[selectedTerm.category].accent }}
                  >
                    {selectedTerm.chinese.split('').map((char, idx) => (
                      <span 
                        key={idx} 
                        className="font-[family-name:var(--font-chinese)] inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xl sm:text-2xl text-[#e5e5e5] mb-1">{selectedTerm.pinyin}</p>
                  <p className="text-sm sm:text-base text-[#888888]">{selectedTerm.english}</p>
                </div>
                <button 
                  onClick={() => setSelectedTerm(null)}
                  className="text-[#666666] hover:text-[#c5a059] transition-colors p-2 -mr-2 -mt-2"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-5 sm:p-8">
                <p 
                  className="text-[10px] sm:text-xs tracking-[0.3em] mb-4 sm:mb-5"
                  style={{ color: categoryConfig[selectedTerm.category].accent }}
                >
                  <span className="font-[family-name:var(--font-chinese)]">定義</span> — PEDAGOGICAL DEFINITION
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[#e5e5e5] leading-relaxed sm:leading-loose">
                  {selectedTerm.description}
                </p>
                
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#2a2a2a]">
                  <p className="text-[10px] sm:text-xs text-[#555555]">
                    <span className="font-[family-name:var(--font-chinese)]">來源</span>: YANGYIQUAN KUNG FU — Official Certification Dossier
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MediaSection() {
  // Volume colors matching website palette
  const volumeColors = [
    { accent: "#c5a059", bg: "bg-[#12100c]", border: "border-[#c5a059]/30", hoverBorder: "hover:border-[#c5a059]" },
    { accent: "#8b0000", bg: "bg-[#100a0a]", border: "border-[#8b0000]/30", hoverBorder: "hover:border-[#8b0000]" },
    { accent: "#5a7a5a", bg: "bg-[#0c100c]", border: "border-[#5a7a5a]/30", hoverBorder: "hover:border-[#5a7a5a]" },
  ]

  return (
    <section id="media" className="py-16 sm:py-24 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2">
            <span className="font-[family-name:var(--font-chinese)]">媒體與文獻</span> — MEDIA &amp; LITERATURE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#c5a059] mb-4 font-bold">
            <span className="font-[family-name:var(--font-chinese)]">視聽檔案</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#e5e5e5] mb-2">Audiovisual Archive</p>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto" />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {videos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111111] border border-[#2a2a2a] p-4 sm:p-6 hover:border-[#c5a059]/50 transition-all group"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8b0000] flex items-center justify-center group-hover:bg-[#c5a059] transition-colors flex-shrink-0">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider">
                    {video.platform === "instagram" ? "Instagram Reel" : "YouTube"}
                  </p>
                  <p className="text-sm sm:text-base text-[#e5e5e5] font-medium">{video.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#c5a059] group-hover:text-[#e5e5e5] transition-colors">
                <span>Watch Now</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>

        {/* Image Feature - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="relative aspect-video overflow-hidden border border-[#2a2a2a]">
            <Image 
              src="/images/mystical-dragon.jpg" 
              alt="Shénmì Lóng - The Mystical Dragon"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-video overflow-hidden border border-[#2a2a2a]">
            <Image 
              src="/images/calligraphy.jpg" 
              alt="Chinese Calligraphy - Heaven Rewards Diligence"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Technical Literature - Enhanced */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#666666] mb-3">
            <span className="font-[family-name:var(--font-chinese)]">技術文獻</span> — TECHNICAL LITERATURE
          </p>
          <Scroll className="w-6 h-6 sm:w-8 sm:h-8 text-[#c5a059] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#888888] max-w-xl mx-auto">
            The complete written documentation of the Yangyiquan Kung Fu system, available through Clube de Autores.
          </p>
        </div>
        
        {/* Books Grid - With Themed Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {books.map((book, idx) => {
            const colors = volumeColors[idx]
            return (
              <a
                key={idx}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.bg} ${colors.border} ${colors.hoverBorder} border p-5 sm:p-6 transition-all group relative overflow-hidden`}
              >
                {/* Thumbnail Visual - Color-matched gradient */}
                <div 
                  className="w-full aspect-[3/4] mb-4 sm:mb-5 relative overflow-hidden border border-[#2a2a2a] flex items-center justify-center"
                  style={{
                    background: `linear-gradient(145deg, #0a0a0a 0%, ${colors.accent}15 50%, #0a0a0a 100%)`
                  }}
                >
                  {/* Book spine decoration */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-2 sm:w-3"
                    style={{ backgroundColor: colors.accent + '40' }}
                  />
                  
                  {/* Center content */}
                  <div className="text-center px-4">
                    <div 
                      className="font-[family-name:var(--font-chinese)] text-4xl sm:text-5xl md:text-6xl mb-3 font-bold"
                      style={{ color: colors.accent }}
                    >
                      {book.subtitle.split('').slice(0, 4).map((char, i) => (
                        <span key={i} className="font-[family-name:var(--font-chinese)]">{char}</span>
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-[#666666] tracking-wider">
                      VOLUME {idx + 1}
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div 
                    className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 opacity-20"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${colors.accent} 0%, transparent 70%)`
                    }}
                  />
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                  <p 
                    className="font-[family-name:var(--font-chinese)] text-sm sm:text-base"
                    style={{ color: colors.accent }}
                  >
                    {book.subtitle}
                  </p>
                  <h3 className="text-sm sm:text-base text-[#e5e5e5] font-medium leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* CTA */}
                <div 
                  className="flex items-center gap-2 mt-4 pt-4 border-t text-[10px] sm:text-xs"
                  style={{ borderColor: colors.accent + '20', color: colors.accent }}
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>View Publication</span>
                  <ExternalLink className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  const roadmapItems = [
    {
      phase: "CURRENT PHASE",
      phaseChinese: "現階段",
      title: "European Certification Alignment",
      titleChinese: "歐洲認證",
      description: "Pursuit of elite European Self-Defense Instructor certifications to align the system with modern tactical standards."
    },
    {
      phase: "FUTURE PHASE",
      phaseChinese: "未來階段",
      title: "Taiwan Immersion",
      titleChinese: "台灣深造",
      description: "Planned high-level training immersion in Taiwan to specialize in Shuai Jiao and Bajiquan under authentic masters."
    },
    {
      phase: "INSTITUTIONAL VISION",
      phaseChinese: "願景",
      title: "IMAS — International Martial Arts Syndicate",
      titleChinese: "國際武術聯盟",
      description: "The visionary global institutional umbrella for future international accreditation and cross-system certification."
    },
  ]

  return (
    <section id="roadmap" className="py-16 sm:py-24 px-4 bg-[#0a0a0a] tactical-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8b0000] mb-2">
            <span className="font-[family-name:var(--font-chinese)]">戰略願景</span> — STRATEGIC VISION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#c5a059] mb-4 font-bold">
            <span className="font-[family-name:var(--font-chinese)]">全球路線圖</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#e5e5e5] mb-2">Global Roadmap</p>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto" />
        </div>

        {/* Current HQ */}
        <div className="bg-[#111111] border border-[#2a2a2a] p-5 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b0000] mt-1 flex-shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#8b0000] mb-2">
                <span className="font-[family-name:var(--font-chinese)]">總部</span> — CURRENT HEADQUARTERS
              </p>
              <p className="text-xl sm:text-2xl text-[#e5e5e5] mb-2">Granada, Spain</p>
              <p className="text-xs sm:text-sm text-[#888888]">
                Strategic base of operations for European expansion and elite instructor certification development.
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-4 sm:space-y-6">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="border-l-4 border-[#2a2a2a] hover:border-[#c5a059] pl-4 sm:pl-6 py-3 sm:py-4 transition-colors">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#c5a059] mb-1 sm:mb-2">
                <span className="font-[family-name:var(--font-chinese)]">{item.phaseChinese}</span> — {item.phase}
              </p>
              <h3 className="text-lg sm:text-xl text-[#e5e5e5] font-medium mb-1 sm:mb-2">
                <span className="font-[family-name:var(--font-chinese)] text-[#c5a059] mr-2">{item.titleChinese}</span>
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 sm:py-16 px-4 bg-[#0f0f0f] border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo - Each character with consistent calligraphy */}
        <div className="font-[family-name:var(--font-chinese)] text-4xl sm:text-5xl text-[#c5a059] mb-3 sm:mb-4 font-bold">
          <span className="font-[family-name:var(--font-chinese)]">陽</span>
          <span className="font-[family-name:var(--font-chinese)]">意</span>
          <span className="font-[family-name:var(--font-chinese)]">拳</span>
        </div>
        <p className="text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[#888888] mb-6 sm:mb-8">
          YANGYIQUAN KUNG FU — SELF DEFENSE ASSOCIATION
        </p>
        
        {/* Dragon Symbol - Consistent Chinese font */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl text-[#c5a059] font-bold">龍</span>
          <span className="text-[#8b0000]">✦</span>
          <span className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl text-[#c5a059] font-bold">虎</span>
          <span className="text-[#8b0000]">✦</span>
          <span className="font-[family-name:var(--font-chinese)] text-xl sm:text-2xl text-[#c5a059] font-bold">龍</span>
        </div>

        {/* Founder name in Chinese */}
        <p className="font-[family-name:var(--font-chinese)] text-sm sm:text-base text-[#c5a059] mb-4">
          神秘龍師父
        </p>

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs text-[#666666]">
          © 2026 YANGYIQUAN KUNG FU — Self Defense Association
        </p>
        <p className="text-[10px] sm:text-xs text-[#666666] mt-1">
          Portugal — Europe — World
        </p>
        <p className="text-[10px] sm:text-xs text-[#888888] mt-3 sm:mt-4">
          Founded by Pedro Barros · Sultan Assad Abd-Al-Ghalib · <span className="font-[family-name:var(--font-chinese)]">神秘龍</span>
        </p>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function YangyiquanPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <HeroSection />
      <OriginSection />
      <FounderSection />
      <KnowledgeMatrixSection />
      <MediaSection />
      <RoadmapSection />
      <Footer />
    </main>
  )
}
