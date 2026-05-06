/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { 
  Sprout, 
  Leaf, 
  Beaker, 
  GraduationCap, 
  BookOpen, 
  Gamepad2, 
  Camera, 
  Github, 
  Linkedin, 
  Mail,
  ExternalLink,
  ChevronRight,
  Microscope,
  Cpu
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode, MouseEvent as ReactMouseEvent, Key } from "react";

// --- Components ---

/**
 * Interactive card with a spectrum spotlight gradient effect that follows the cursor.
 */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  key?: Key | null;
}

function SpotlightCard({ children, className = "", id }: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // A vibrant spectrum gradient relative to mouse position
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 80%), radial-gradient(300px circle at ${x}px ${y}px, rgba(148, 167, 100, 0.2), rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), transparent 100%)`
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="gradient-border-wrapper asymmetric-radius"
    >
      <div
        id={id}
        onMouseMove={onMouseMove}
        className={`group relative asymmetric-radius bg-forest-950/80 p-8 shadow-sm transition-all backdrop-blur-md overflow-hidden h-full border border-white/5 ${className}`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition group-hover:opacity-100"
          style={{ background }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="block text-[0.75rem] uppercase tracking-[0.3em] text-sage-400 font-serif italic mb-2"
      >
        {title}
      </motion.span>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sage-500 max-w-2xl text-lg font-sans leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// --- Sections ---

export default function App() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -200]);
  
  // Forest particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="min-h-screen bg-forest-950 text-sage-50 selection:bg-sage-400 selection:text-forest-950">
      {/* Parallax Forest Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-x-0 -top-40 -bottom-40 opacity-40 grayscale contrast-125"
        >
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop" 
            alt="Quiet Shaded Forest" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 forest-overlay" />
        
        {/* Animated Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="particle"
            style={{ 
              left: p.left, 
              top: p.top, 
              width: p.size, 
              height: p.size 
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 border-b border-white/5 bg-forest-950/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sprout className="text-sage-400 w-8 h-8" />
            </motion.div>
            <span className="font-serif text-2xl font-light tracking-tight text-white uppercase italic">Nazim.</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-sage-500">
            {["About", "Projects", "Courses", "Interests"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors relative group"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sage-400 transition-all group-hover:w-full" />
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white/20 px-6 py-2 rounded-full text-white/80 hover:bg-white hover:text-forest-950 transition-all font-bold"
              id="cta-contact"
            >
              Get Connected
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 mb-56 mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
              {/* Profile Sketch Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-[500px] md:w-5/12 relative group"
              >
                {/* Glow & Shadow background - enhanced for "shadow behind" effect */}
                <div className="absolute inset-0 bg-sage-400/20 blur-[150px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10 animate-pulse" />
                
                <motion.div 
                  className="relative z-10 transition-all duration-700 rounded-[4rem] overflow-hidden group-hover:drop-shadow-[0_0_80px_rgba(148,167,100,0.5)] shadow-2xl"
                  whileHover={{ 
                    rotateY: 8,
                    rotateX: -5,
                    z: 50
                  }}
                >
                  <img 
                    src="/sketch.webp" 
                    alt="Nazim Ur Rahman Sketch" 
                    className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-110 brightness-110 contrast-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback: Show a styled empty box if image is missing
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.missing-img')) {
                        const box = document.createElement('div');
                        box.className = "missing-img w-full aspect-[3/4] bg-white/5 flex flex-col items-center justify-center p-8 text-center border border-white/10 rounded-[3rem]";
                        box.innerHTML = `
                          <div class="text-sage-400/30 mb-4 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          </div>
                          <span class="text-sage-300 text-sm font-serif italic mb-1 tracking-wider">Portrait Sketch</span>
                          <span class="text-sage-600 text-[9px] uppercase tracking-[0.3em]">Drop 'sketch.webp' in root</span>
                        `;
                        parent.appendChild(box);
                      }
                    }}
                  />
                  {/* Subtle glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-center md:text-left md:w-7/12"
              >
                <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter mb-8 leading-[0.9] text-gradient-spectrum">
                  Nazim Ur Rahman
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-8 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] text-sage-400 font-bold bg-white/5"
                  >
                    Undergraduate Student
                  </motion.span>
                  <div className="w-1.5 h-1.5 bg-sage-400/40 rounded-full hidden md:block" />
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="px-8 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] text-sage-400 font-bold bg-white/5"
                  >
                    Research Enthusiast
                  </motion.span>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-sage-500 italic text-xl md:text-2xl font-serif mt-12 opacity-80"
                >
                  Bangladesh Agricultural University • BAU Agriculture 65 Batch
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 mb-56 overflow-hidden text-center relative">
          {/* Subtle nature accent behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-moss-800/10 rounded-full blur-[120px] -z-10" />
          
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="About Me" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl text-sage-100 font-serif leading-[1.6] mb-16"
            >
              "Dedicated to exploring the intersections of agronomy and sustainable technology. My academic journey at BAU focuses on enhancing crop resilience and modernizing irrigation frameworks in South Asian climates."
            </motion.p>
            <div className="flex justify-center gap-6 items-center">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  className={`rounded-full ${i === 2 ? 'w-4 h-4 bg-sage-400' : 'w-2 h-2 bg-moss-800'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="px-6 mb-56">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Selected Research & Projects" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: "Smart Soil Sensor Node", category: "In Development", desc: "Engineering an IoT-based low-cost solution for real-time N-P-K monitoring in rural farming zones." },
                { title: "Nitrogen Deficiency Analysis", category: "Research Paper", desc: "Comparative study on deep learning models for early detection of nitrogen stress in paddy leaves." },
                { title: "Automatic Greenhouse Kit", category: "Hardware", desc: "A modular, open-source climate control system for small-scale community gardening." }
              ].map((proj, i) => (
                <SpotlightCard key={i}>
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] text-sage-400 italic uppercase tracking-[0.3em] font-bold py-1 px-3 border border-sage-400/20 rounded-full">
                        {proj.category}
                      </span>
                      <motion.div whileHover={{ rotate: 45 }} className="cursor-pointer">
                        <ExternalLink className="w-4 h-4 text-sage-500" />
                      </motion.div>
                    </div>
                    <h3 className="font-serif text-3xl font-light text-white mb-6 leading-tight">{proj.title}</h3>
                    <p className="text-sage-500/80 text-base leading-relaxed font-sans mb-10 flex-grow">{proj.desc}</p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center group/link cursor-pointer"
                    >
                       <span className="text-[10px] uppercase font-bold text-sage-400 tracking-widest group-hover/link:text-white transition-colors">View Details</span>
                       <ChevronRight className="w-4 h-4 text-sage-400 transition-transform group-hover/link:translate-x-1" />
                    </motion.div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="px-6 mb-56">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4">
                <SectionHeading title="My Courses" subtitle="The academic pillars of my undergraduate study at Bangladesh Agricultural University." />
              </div>
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Plant Pathology", desc: "Study of biotic and abiotic causes of plant diseases." },
                    { title: "Soil Science 101", desc: "Fundamental study of soil formation and chemistry." },
                    { title: "Agroforestry", desc: "Integration of trees and shrubs into crop systems." },
                    { title: "Crop Physiology", desc: "Analysis of plant functions and growth processes." },
                  ].map((course, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all cursor-default"
                    >
                      <h4 className="font-serif text-xl text-white mb-3 group-hover:text-sage-400 transition-colors">{course.title}</h4>
                      <p className="text-sage-500 text-sm font-sans tracking-wide leading-relaxed">{course.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="My Interests" subtitle="Fields of study and personal passions that drive my creative thinking." />
            <div className="flex flex-wrap gap-4">
              {[
                "Remote Sensing", "Data Analysis", "Sustainable Farming", "Precision Ag", "Biotech", "Soil Microbiome", "Climate Policy"
              ].map((interest, i) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sage-400/20 via-moss-800/20 to-sage-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative text-xs font-bold bg-forest-900/50 text-sage-400 px-8 py-3.5 rounded-full border border-sage-400/20 whitespace-nowrap backdrop-blur-md">
                    {interest}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-20 pb-16 px-6 bg-forest-900/20 backdrop-blur-md relative overflow-hidden">
        <div className="leaf-accent absolute -bottom-40 -left-40 opacity-5 rotate-45" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sage-500 mb-3">Location</span>
                <span className="text-2xl font-serif text-sage-400 italic">Mymensingh, Bangladesh</span>
              </div>
              <div className="flex gap-6">
                <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="text-sage-500"><Github className="w-5 h-5" /></motion.a>
                <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="text-sage-500"><Linkedin className="w-5 h-5" /></motion.a>
                <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="text-sage-500"><Mail className="w-5 h-5" /></motion.a>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="mb-6 flex gap-12">
                 <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sage-500 mb-2 block">Batch</span>
                    <span className="text-sm font-serif italic text-white/50">Agriculture 65</span>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sage-500 mb-2 block">Edition</span>
                    <span className="text-sm font-serif italic text-white/50">Vol. 01 / 2026</span>
                 </div>
              </div>
              <div className="text-[10px] font-sans text-sage-500 uppercase tracking-widest font-bold">© NAZIM UR RAHMAN</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
