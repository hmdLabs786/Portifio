/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Layers, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Terminal,
  Cpu,
  Cloud,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Binary,
  Monitor
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "E-commerce Store",
    description: "A high-performance online marketplace with a seamless shopping cart experience and secure payment gateway integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
    tags: ["MERN", "Redux", "Stripe"]
  },
  {
    title: "Social Media Dashboard",
    description: "Enterprise-grade analytics platform for tracking social engagement metrics with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "D3.js", "Firebase"]
  },
  {
    title: "Task Management System",
    description: "Collaborative project management tool featuring real-time task tracking, team assignments, and deadline monitoring.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1600&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Prisma"]
  },
  {
    title: "File Upload Management",
    description: "Secure cloud storage application with advanced file organization, sharing capabilities, and end-to-end encryption.",
    image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=1600&auto=format&fit=crop",
    tags: ["Node.js", "AWS S3", "Express"]
  },
  {
    title: "News Website",
    description: "Dynamic content delivery platform with automated news aggregation and a premium editorial reading experience.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop",
    tags: ["PHP", "MySQL", "Tailwind"]
  },
  {
    title: "Sustanify",
    description: "Mobile application dedicated to sustainable living, providing eco-friendly guides and carbon footprint tracking.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop",
    tags: ["Flutter", "Dart", "Firebase"]
  }
];

const SKILLS: Skill[] = [
  { name: "HTML & CSS", level: 98, icon: <Globe className="w-5 h-5" /> },
  { name: "JavaScript", level: 95, icon: <Terminal className="w-5 h-5" /> },
  { name: "PHP & MySQL", level: 88, icon: <Database className="w-5 h-5" /> },
  { name: "MERN Stack", level: 92, icon: <Layers className="w-5 h-5" /> },
  { name: "Flutter & Dart", level: 90, icon: <Smartphone className="w-5 h-5" /> },
  { name: "Firebase", level: 85, icon: <Cloud className="w-5 h-5" /> },
];

// --- Components ---

const TypingAnimation = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="font-mono text-accent">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-8 bg-accent ml-1 align-middle"
      />
    </span>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] origin-left" style={{ scaleX }} />;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a href="#" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-display font-black tracking-tighter flex items-center gap-2">
          <Terminal className="text-accent" size={24} />
          <span className="text-gradient">HABBAN.DEV</span>
        </motion.a>

        <div className="hidden md:flex gap-10">
          {['About', 'Skills', 'Projects', 'Contact'].map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-accent transition-all relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <button className="md:hidden text-zinc-100 p-2 glass-card" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-full left-0 w-full glass-nav border-t border-white/5">
            <div className="flex flex-col p-8 gap-6">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-accent">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-accent text-[9px] font-black tracking-[0.3em] uppercase mb-8">
            <Zap size={10} />
            Architecting Digital Excellence
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-black leading-[1.1] mb-8">
            Building the <br />
            <TypingAnimation text="Future of Web" />
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed font-medium">
            I am Habban Madani, a <span className="text-white">Senior Software Engineer</span> specializing in high-performance web architectures and immersive mobile ecosystems.
          </p>
          <div className="flex flex-wrap gap-6">
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-accent text-white font-black rounded-xl flex items-center gap-3 shadow-lg shadow-accent/20">
              Explore Systems
              <ArrowUpRight size={18} />
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 glass-card text-white font-black rounded-xl border border-white/10">
              Get in Touch
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative perspective-1000 hidden lg:block">
          <motion.div 
            animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="preserve-3d relative w-full aspect-square max-w-[450px] mx-auto"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-[40px] blur-3xl opacity-30" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-md p-3">
              <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" alt="Tech Environment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
            
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-6 -right-6 glass-card p-5 flex items-center gap-4 glow-blue">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent"><Code2 size={20} /></div>
              <div><p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Code Quality</p><p className="text-xs font-bold">A+ Standard</p></div>
            </motion.div>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -left-6 glass-card p-5 flex items-center gap-4 glow-blue">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent"><ShieldCheck size={20} /></div>
              <div><p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Security</p><p className="text-xs font-bold">Enterprise Ready</p></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl lg:text-5xl font-black mb-10 leading-tight">
            Engineering <span className="text-gradient">Robust Solutions</span> <br /> for Modern Problems
          </h2>
          <div className="space-y-6 text-zinc-400 font-medium leading-relaxed">
            <p>With a foundation in computer science and a passion for cutting-edge technologies, I bridge the gap between complex backend logic and intuitive frontend interfaces.</p>
            <p>My methodology focuses on scalability, maintainability, and exceptional user experience. Whether it's a high-traffic web platform or a mission-critical mobile app, I deliver excellence through rigorous engineering standards.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div><h3 className="text-3xl font-black text-accent mb-1">150+</h3><p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Commits / Week</p></div>
            <div><h3 className="text-3xl font-black text-accent mb-1">99.9%</h3><p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Code Reliability</p></div>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-48 rounded-3xl overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" /></div>
            <div className="h-64 rounded-3xl overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" /></div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 rounded-3xl overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" /></div>
            <div className="h-48 rounded-3xl overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Expertise</p>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">Core <span className="text-gradient">Competencies</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill, i) => (
            <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 glass-card group hover:border-accent/30 transition-all">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all border border-white/10">{skill.icon}</div>
                <h3 className="text-xl font-black tracking-tight">{skill.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest"><span className="text-zinc-500">Mastery</span><span className="text-accent">{skill.level}%</span></div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="h-full bg-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Portfolio</p>
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Selected <span className="text-gradient">Works</span></h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-[10px] hover:underline">View All Systems <ChevronRight size={14} /></a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group glass-card overflow-hidden luxury-border">
              <div className="relative h-64 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-[8px] font-black uppercase tracking-widest text-white">{tag}</span>)}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-8 font-medium">{project.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <a href="#" className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-all">Case Study <ArrowUpRight size={12} /></a>
                  <div className="flex gap-5"><a href="#" className="text-zinc-500 hover:text-white transition-all"><Github size={18} /></a><a href="#" className="text-zinc-500 hover:text-white transition-all"><ExternalLink size={18} /></a></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Initiate <br /><span className="text-gradient">Deployment</span></h2>
          <p className="text-lg text-zinc-400 mb-12 font-medium leading-relaxed">Ready to scale your next digital venture? Let's discuss technical requirements and architectural goals.</p>
          <div className="space-y-8">
            {[
              { icon: <Mail />, label: "Secure Email", value: "habban@dev.pro", href: "mailto:habban@dev.pro" },
              { icon: <Linkedin />, label: "Network", value: "Habban Madani", href: "#" },
              { icon: <Github />, label: "Source", value: "habban-dev", href: "#" }
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent border border-white/10 group-hover:bg-accent group-hover:text-white transition-all duration-500 glow-blue">{item.icon}</div>
                <div><p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">{item.label}</p><a href={item.href} className="text-xl font-bold tracking-tight hover:text-accent transition-colors">{item.value}</a></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-indigo-600" />
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3"><label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Identifier</label><input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all font-medium placeholder:text-zinc-700" /></div>
              <div className="space-y-3"><label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Endpoint</label><input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all font-medium placeholder:text-zinc-700" /></div>
            </div>
            <div className="space-y-3"><label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Payload</label><textarea rows={5} placeholder="Project details and technical scope..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all font-medium placeholder:text-zinc-700 resize-none" /></div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-5 bg-accent text-white font-black rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-accent/20">Transmit Message <ChevronRight size={16} /></motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <p className="text-2xl font-display font-black tracking-tighter text-gradient mb-4">HABBAN.DEV</p>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Habban Madani. Engineered for Excellence.</p>
        </div>
        <div className="flex gap-8">
          {['About', 'Skills', 'Projects', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[#020203] selection:bg-accent selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
