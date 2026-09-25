import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ProjectModal } from './components/ProjectModal';
import { ServicesCalculator } from './components/ServicesCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LogoIcon } from './components/Logo';
import { PROJECTS_DATA, STUDIO_METRICS } from './data/projectsData';
import { ArchitecturalProject } from './types/architecture';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeCategory, setActiveCategory] = useState<'todas' | 'modular' | 'residencial' | 'domotica'>('todas');
  const [selectedProject, setSelectedProject] = useState<ArchitecturalProject | null>(null);
  const [active3DModel, setActive3DModel] = useState<'modular' | 'travertino' | 'cristal' | 'domotica'>('modular');
  const [contactInitialNotes, setContactInitialNotes] = useState('');

  // Scroll spy: automatically update active menu item based on current scroll position
  useEffect(() => {
    const sectionIds = [
      'inicio',
      'filosofia-seccion',
      'proyectos-seccion',
      'estudio-seccion',
      'servicios-seccion',
      'contacto-seccion',
    ];

    const handleScroll = () => {
      // If near bottom of the page, activate contact section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contacto-seccion');
        return;
      }

      const scrollPosition = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenProjectInit = (prefillNotes?: string) => {
    if (prefillNotes) {
      setContactInitialNotes(prefillNotes);
    }
    handleNavigate('contacto-seccion');
  };

  const handleViewProjectIn3D = (modelKey: 'modular' | 'travertino' | 'cristal' | 'domotica') => {
    setActive3DModel(modelKey);
    handleNavigate('canvas-3d');
  };

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeCategory === 'todas') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#121314] text-[#e3e2e3] font-body selection:bg-[#d8d4ce] selection:text-[#121314]">
      {/* Navigation Header */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenProjectInit={() => handleOpenProjectInit()}
      />

      <main className="w-full pt-20">
        {/* ==================== 01. HERO SECTION (FULL SCREEN SLIDER) ==================== */}
        <section className="relative w-full" id="inicio">
          <HeroSlider>
            {/* Datum Coordinates & Ticker Header */}
            <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-[#949088]/30 text-[#cac6bd] gap-2 drop-shadow-md">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <LogoIcon className="w-4 h-4" />
                <span>INDEX // MNL-2025.SPEC</span>
                <span className="text-[#949088]">/</span>
                <span>LAT 40.4168° N · LON 3.7038° W</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/40 backdrop-blur-md text-[#f5f0ea] border border-white/20 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SLIDER TECTÓNICO ACTIVO
                </span>
                <span className="hidden sm:inline text-[#ccc6bc]">EDICIÓN MONOLÍTICA v4.2</span>
              </div>
            </div>

            {/* Editorial Title & Lead */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-12 items-start mb-4 md:mb-10 drop-shadow-xl mt-2">
              <div className="lg:col-span-8 space-y-1 md:space-y-2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-mono text-[10px] md:text-xs text-white/80 tracking-[0.25em] uppercase block"
                >
                  JGS ARQUITECTOS - ESTUDIO DE ARQUITECTURA Y CONSTRUCCIÓN
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-headline text-3xl sm:text-5xl lg:text-7xl text-white font-normal tracking-tight uppercase leading-[1.05] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
                >
                  Arquitectura rentable y estratégica
                </motion.h1>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="lg:col-span-4 pb-1 space-y-3"
              >
                <p className="hidden md:block text-base sm:text-lg text-white font-medium leading-relaxed drop-shadow-md">
                  Diseñamos y construimos proyectos donde la eficiencia, el diseño contemporáneo y el modelo de negocio conviven para crear obras maestras.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => handleNavigate('proyectos-seccion')}
                    className="px-4 py-2 md:px-5 md:py-2.5 bg-[#f5f0ea] text-[#121314] font-mono text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#d8d4ce] shadow-[0_4px_15px_rgba(0,0,0,0.5)] cursor-pointer rounded-sm"
                  >
                    Explorar Obras [04]
                  </button>
                </div>
              </motion.div>
            </div>
          </HeroSlider>


          {/* Technical Metrics Ledger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 bg-[#0d0e0f] p-6 border border-[#949088]/20 shadow-sm">
            {STUDIO_METRICS.map((metric, i) => (
              <div key={i} className="space-y-1">
                <span className="font-mono text-[11px] text-[#ccc6bc] block tracking-wider">
                  {metric.index}
                </span>
                <div className="font-headline text-3xl sm:text-4xl text-[#f5f0ea] font-normal tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs text-[#949088] font-light leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 02. MANIFESTO & PHILOSOPHY ==================== */}
        <section className="w-full bg-[#1b1c1d] px-6 md:px-12 lg:px-20 py-20 border-t border-[#949088]/20" id="filosofia-seccion">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Section Index Column */}
            <div className="lg:col-span-3 space-y-4">
              <span className="font-mono text-xs text-[#ccc6bc] tracking-[0.2em] uppercase block">
                02 // MANIFIESTO
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-[#f5f0ea] uppercase tracking-tight">
                La verdad de la materia
              </h2>
              <div className="w-12 h-0.5 bg-[#f5f0ea]/30"></div>
              <p className="text-sm text-[#cac6bd] font-light leading-relaxed">
                Rechazamos la ornamentación superflua. Nuestra búsqueda se concentra en la poética del peso propio, la luz rasante y la permanencia geológica en el paisaje contemporáneo.
              </p>
            </div>

            {/* Editorial Text Matrix */}
            <div className="lg:col-span-9 space-y-10">
              <blockquote className="font-headline text-2xl sm:text-4xl text-[#f5f0ea] font-light leading-snug tracking-tight">
                «El espacio no se decora: se excava, se modula y se expone a la luz natural hasta que no quede nada prescindible.»
              </blockquote>

              {/* 3 Pillars Tectonic Interactive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Pillar 1 */}
                <div className="bg-[#1f2021] p-6 border border-[#949088]/20 hover:border-[#f5f0ea]/40 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#ccc6bc]">[P·01]</span>
                      <span className="material-symbols-outlined text-xl text-[#ccc6bc]">wb_sunny</span>
                    </div>
                    <h3 className="font-headline text-lg text-[#f5f0ea] uppercase mb-2">
                      Geometría y Luz
                    </h3>
                    <p className="text-sm text-[#cac6bd] font-light leading-relaxed">
                      Volúmenes puros con aperturas estratégicas al cenit y patios interiores. La luz no es iluminación secundaria; es el principal material de construcción.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#292a2b]">
                    <span className="font-mono text-[11px] text-[#ccc6bc] tracking-widest uppercase flex items-center gap-1">
                      ENFOQUE CENITAL <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-[#1f2021] p-6 border border-[#949088]/20 hover:border-[#f5f0ea]/40 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#ccc6bc]">[P·02]</span>
                      <span className="material-symbols-outlined text-xl text-[#ccc6bc]">layers</span>
                    </div>
                    <h3 className="font-headline text-lg text-[#f5f0ea] uppercase mb-2">
                      Materialidad Táctil
                    </h3>
                    <p className="text-sm text-[#cac6bd] font-light leading-relaxed">
                      Travertino romano al corte natural, hormigón arquitectónico visto, acero patinado y carpinterías invisibles que eliminan el límite entre dentro y fuera.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#292a2b]">
                    <span className="font-mono text-[11px] text-[#ccc6bc] tracking-widest uppercase flex items-center gap-1">
                      TEXTURA PURA <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-[#1f2021] p-6 border border-[#949088]/20 hover:border-[#f5f0ea]/40 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#ccc6bc]">[P·03]</span>
                      <span className="material-symbols-outlined text-xl text-[#ccc6bc]">memory</span>
                    </div>
                    <h3 className="font-headline text-lg text-[#f5f0ea] uppercase mb-2">
                      Domótica e Innovación
                    </h3>
                    <p className="text-sm text-[#cac6bd] font-light leading-relaxed">
                      Integración invisible de ingeniería climática geotérmica, cerramientos motorizados robotizados y algoritmos adaptativos de iluminación circadiana.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#292a2b]">
                    <span className="font-mono text-[11px] text-[#ccc6bc] tracking-widest uppercase flex items-center gap-1">
                      INGENIERÍA OCULTA <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 03. FEATURED PORTFOLIO ==================== */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#121314]" id="proyectos-seccion">
          {/* Header Controls & Typology Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ccc6bc] tracking-[0.2em] uppercase block">
                03 // REGISTRO DE OBRAS SELECCIONADAS
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#f5f0ea] uppercase tracking-tight">
                Portafolio Tectónico
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveCategory('todas')}
                className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
                  activeCategory === 'todas'
                    ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                    : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                }`}
              >
                Todas [04]
              </button>
              <button
                onClick={() => setActiveCategory('modular')}
                className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
                  activeCategory === 'modular'
                    ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                    : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                }`}
              >
                Modularidad (Premium) [01]
              </button>
              <button
                onClick={() => setActiveCategory('residencial')}
                className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
                  activeCategory === 'residencial'
                    ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                    : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                }`}
              >
                Residencial Alto Standing
              </button>
              <button
                onClick={() => setActiveCategory('domotica')}
                className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
                  activeCategory === 'domotica'
                    ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                    : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                }`}
              >
                Domótica & High-Tech
              </button>
            </div>
          </div>

          {/* Asymmetrical Editorial Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {filteredProjects.map((project, idx) => {
              // 7 cols for 1st and 4th, 5 cols for 2nd and 3rd as in editorial design
              const colSpanClass = idx % 3 === 0 ? 'lg:col-span-7' : 'lg:col-span-5';
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`${colSpanClass} group bg-[#0d0e0f]/60 backdrop-blur-xl border border-[#949088]/20 hover:border-[#f5f0ea]/40 transition-colors overflow-hidden shadow-2xl flex flex-col`}
                >
                  {/* Image container */}
                  <div
                    className="relative w-full aspect-[16/10] overflow-hidden bg-[#1f2021] cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Spec Tags */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#121314]/90 backdrop-blur-md font-mono text-xs text-[#f5f0ea] flex items-center gap-2 border border-[#949088]/20">
                      <span className={`w-2 h-2 ${project.materialColor}`}></span>
                      <span>{project.materialHighlight}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#121314]/90 backdrop-blur-md font-mono text-xs text-[#ccc6bc] border border-[#949088]/20">
                      {project.location} // {project.area}
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-xs text-[#ccc6bc]">REF // {project.refCode}</span>
                          <h3
                            onClick={() => setSelectedProject(project)}
                            className="font-headline text-xl sm:text-2xl text-[#f5f0ea] uppercase mt-0.5 cursor-pointer hover:text-[#d8d4ce] transition-colors"
                          >
                            {project.title}
                          </h3>
                        </div>
                        <span className="font-mono text-xs px-2.5 py-1 bg-[#1f2021] text-[#ccc6bc] border border-[#949088]/20">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-sm text-[#cac6bd] font-light leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1f2021] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#949088]">
                        <span className="px-2 py-0.5 bg-[#1f2021]">Envolvente Térmica</span>
                        <span className="px-2 py-0.5 bg-[#1f2021]">Passivhaus</span>
                      </div>

                      <div className="flex items-center gap-4">
                        {project.has3DModel && (
                          <button
                            onClick={() => handleViewProjectIn3D(project.modelKey as 'travertino' | 'cristal' | 'domotica')}
                            className="font-mono text-xs text-[#ccc6bc] hover:text-[#f5f0ea] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
                            <span>Modelo 3D</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="font-mono text-xs text-[#f5f0ea] hover:text-[#d8d4ce] transition-colors flex items-center gap-1 group-hover:translate-x-1 cursor-pointer font-medium"
                        >
                          <span>Ver Caso de Estudio</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ==================== 04. LEADERSHIP & STUDIO DIRECTION ==================== */}
        <section className="w-full bg-[#1b1c1d] px-6 md:px-12 lg:px-20 py-20 border-t border-[#949088]/20" id="estudio-seccion">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Portrait Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-[#292a2b] border border-[#949088]/30 overflow-hidden shadow-2xl">
                <img
                  src="/arqui-jose.jpg"
                  alt="Arq. José Garnica - Director Principal & Fundador JGS Arquitectos"
                  className="w-full aspect-[4/5] object-cover filter grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121314] via-[#121314]/80 to-transparent">
                  <span className="font-mono text-xs text-[#ccc6bc] block uppercase tracking-wider">
                    DIRECCIÓN GENERAL
                  </span>
                  <div className="font-headline text-xl text-[#f5f0ea] uppercase font-bold mt-0.5">
                    Arq. José Garnica
                  </div>
                  <span className="font-mono text-xs text-[#949088]">
                    ETSAM Madrid · ETH Zürich Member
                  </span>
                </div>
              </div>

              {/* Decorative Datum Pin */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#1f2021] border border-[#949088]/30 flex items-center justify-center font-mono text-xs text-[#f5f0ea] shadow-md">
                +
              </div>
            </div>

            {/* Vision & Studio Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#ccc6bc] tracking-[0.2em] uppercase block">
                  04 // VISIÓN Y LIDERAZGO
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl text-[#f5f0ea] uppercase tracking-tight">
                  «Menos artificio, mayor trascendencia espacial.»
                </h2>
              </div>
              <p className="text-base sm:text-lg text-[#cac6bd] font-light leading-relaxed">
                «Fundé JGS Arquitectos con la convicción de que la arquitectura contemporánea había caído en la trampa del render efectista y efímero. Nuestro compromiso reside en devolverle al habitante la experiencia tectónica: el peso gravitacional de la piedra, el silencio de los muros espesos y la calma matemática de los espacios correctamente orientados.»
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-[#cac6bd] font-light">
                <div className="bg-[#1f2021] p-4 border border-[#949088]/20 space-y-1">
                  <span className="font-mono text-xs text-[#f5f0ea] uppercase block font-semibold">
                    Rigor Constructivo
                  </span>
                  <p className="text-xs">
                    Supervisión directa en cada fase de vertido y ensamblado. Cero tolerancias constructivas por encima de 2mm.
                  </p>
                </div>
                <div className="bg-[#1f2021] p-4 border border-[#949088]/20 space-y-1">
                  <span className="font-mono text-xs text-[#f5f0ea] uppercase block font-semibold">
                    Patrimonio Vital
                  </span>
                  <p className="text-xs">
                    Obras concebidas para envejecer con nobleza pétrea a lo largo de décadas sin depreciación estética ni funcional.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-[#ccc6bc] border-t border-[#949088]/20">
                <div>SOCIO FUNDADOR // DIRECCIÓN GENERAL</div>
                <div className="text-[#f5f0ea] tracking-widest font-semibold">[ FIRMA GARNICA ]</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 05. TECHNICAL SERVICES & ESTIMATOR ==================== */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#121314]" id="servicios-seccion">
          <div className="space-y-2 mb-10">
            <span className="font-mono text-xs text-[#ccc6bc] tracking-[0.2em] uppercase block">
              05 // ALCANCE DISCIPLINAR
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-[#f5f0ea] uppercase tracking-tight">
              Servicios Integrales & Presupuestación
            </h2>
            <p className="text-sm text-[#cac6bd] font-light max-w-2xl">
              Acompañamiento end-to-end desde el análisis geotécnico y bioclimático inicial hasta la entrega de llave en mano y comisionamiento de sistemas domóticos e inteligentes.
            </p>
          </div>

          <ServicesCalculator onSelectProjectInit={handleOpenProjectInit} />
        </section>

        {/* ==================== 06. MONOCHROME PROPOSAL / CONTACT ==================== */}
        <ContactSection initialNotes={contactInitialNotes} />
      </main>

      {/* Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onViewIn3D={handleViewProjectIn3D}
      />

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
