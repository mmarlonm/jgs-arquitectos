import React, { useState } from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenProjectInit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  onOpenProjectInit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121314]/90 backdrop-blur-xl border-b border-[#949088]/15">
      <div className="h-20 w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with new Geometric Monogram */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="cursor-pointer focus:outline-none"
        >
          <Logo size={34} />
        </button>

        {/* Zone 2: Navigation Links in exact page scroll order */}
        <nav className="hidden xl:flex items-center gap-8">
          {[
            { id: 'inicio', label: 'Maqueta 3D' },
            { id: 'filosofia-seccion', label: 'Filosofía' },
            { id: 'proyectos-seccion', label: 'Proyectos' },
            { id: 'estudio-seccion', label: 'El Estudio' },
            { id: 'servicios-seccion', label: 'Servicios' },
            { id: 'contacto-seccion', label: 'Contacto' },
          ].map((item) => {
            const isActive = activeSection === item.id || (item.id === 'inicio' && activeSection === 'canvas-3d');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs uppercase tracking-[0.16em] transition-all cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#f5f0ea] font-semibold'
                    : 'text-[#cac6bd] hover:text-[#f5f0ea]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5f0ea]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenProjectInit}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[#d8d4ce] text-[#121314] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#f5f0ea] shadow-sm cursor-pointer"
          >
            Iniciar Proyecto
          </button>
          
          <div className="w-8 h-8 rounded-none bg-[#f5f0ea] flex items-center justify-center text-[#121314] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#cac6bd] hover:text-[#f5f0ea]"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer with exact scroll order and active highlights */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121314] border-b border-[#949088]/20 px-6 py-6 space-y-3">
          {[
            { id: 'inicio', label: '01 // Maqueta 3D' },
            { id: 'filosofia-seccion', label: '02 // Filosofía & Manifiesto' },
            { id: 'proyectos-seccion', label: '03 // Portafolio Tectónico' },
            { id: 'estudio-seccion', label: '04 // El Estudio (Dirección)' },
            { id: 'servicios-seccion', label: '05 // Servicios & Calculadora' },
            { id: 'contacto-seccion', label: '06 // Contacto & Agendar' },
          ].map((item) => {
            const isActive = activeSection === item.id || (item.id === 'inicio' && activeSection === 'canvas-3d');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left font-mono text-xs uppercase tracking-widest py-2.5 px-3 transition-colors border-l-2 ${
                  isActive
                    ? 'text-[#f5f0ea] bg-[#1f2021] border-[#f5f0ea] font-semibold'
                    : 'text-[#cac6bd] hover:text-[#f5f0ea] border-transparent hover:bg-[#1a1b1c]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProjectInit();
            }}
            className="w-full mt-2 py-3 bg-[#d8d4ce] text-[#121314] font-mono text-xs font-semibold uppercase tracking-wider text-center"
          >
            Iniciar Proyecto Residencial
          </button>
        </div>
      )}
    </header>
  );
};
