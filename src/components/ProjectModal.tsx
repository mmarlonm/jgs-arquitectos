import React from 'react';
import { ArchitecturalProject } from '../types/architecture';
import { LogoIcon } from './Logo';

interface ProjectModalProps {
  project: ArchitecturalProject | null;
  onClose: () => void;
  onViewIn3D: (modelKey: 'modular' | 'travertino' | 'cristal' | 'domotica') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onViewIn3D,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#1b1c1d] border border-[#949088]/30 shadow-2xl my-auto text-[#e3e2e3] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#949088]/20 flex items-center justify-between bg-[#121314]">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-6 h-6" />
            <div>
              <div className="font-mono text-xs text-[#ccc6bc] uppercase tracking-wider">
                {project.refCode} // {project.categoryLabel}
              </div>
              <h2 className="font-headline text-xl sm:text-2xl text-[#f5f0ea] uppercase font-bold tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#cac6bd] hover:text-[#f5f0ea] hover:bg-[#292a2b] transition-colors"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Main Visual Image & Floating Spec Tag */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#121314]">
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#121314]/90 backdrop-blur-md font-mono text-xs text-[#f5f0ea] flex items-center gap-2 border border-[#949088]/20">
              <span className={`w-2 h-2 ${project.materialColor}`}></span>
              <span>{project.materialHighlight}</span>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#121314]/90 backdrop-blur-md font-mono text-xs text-[#ccc6bc] border border-[#949088]/20">
              {project.location} // {project.area}
            </div>
          </div>

          {/* Quick Action: View in 3D */}
          {project.has3DModel && (
            <div className="p-4 bg-[#1f2021] border border-[#949088]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#ccc6bc] uppercase block">
                  EXPLORACIÓN TECTÓNICA VIRTUAL
                </span>
                <p className="text-sm text-[#f5f0ea]">
                  Esta obra cuenta con modelo 3D axonométrico interactivo en tiempo real con simulación solar.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewIn3D(project.modelKey as 'travertino' | 'cristal' | 'domotica');
                }}
                className="px-5 py-2.5 bg-[#f5f0ea] text-[#121314] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#d8d4ce] transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                <span>Explorar Maqueta 3D</span>
              </button>
            </div>
          )}

          {/* Descriptive Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-headline text-lg uppercase text-[#f5f0ea] tracking-tight">
                Memoria de Proyecto & Concepto Espacial
              </h3>
              <p className="text-[#cac6bd] leading-relaxed font-light text-base">
                {project.fullDescription}
              </p>

              <div className="pt-4 space-y-2">
                <span className="font-mono text-xs text-[#ccc6bc] uppercase tracking-wider block">
                  Sistemas Constructivos Destacados:
                </span>
                <ul className="space-y-1.5 text-sm text-[#e3e2e3]">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#949088] mt-1">▪</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Specifications Ledger Table */}
            <div className="lg:col-span-5 bg-[#1f2021] p-5 border border-[#949088]/20 space-y-4">
              <h3 className="font-mono text-xs uppercase text-[#ccc6bc] tracking-widest border-b border-[#949088]/20 pb-2">
                Ficha Técnica Tectónica
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {project.specs.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline border-b border-[#292a2b] pb-2">
                    <span className="text-[#949088]">{item.label}</span>
                    <span className="text-[#f5f0ea] text-right font-medium">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[#949088]">Año de Entrega</span>
                  <span className="text-[#f5f0ea] font-medium">{project.year}</span>
                </div>
              </div>

              {/* Material Palette Swatch */}
              <div className="pt-4 border-t border-[#949088]/20 space-y-2">
                <span className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                  Paleta de Materiales Primarios
                </span>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center">
                  <div className="p-2 bg-[#dfd8cd] text-[#121314] font-semibold">Travertino</div>
                  <div className="p-2 bg-[#2d3032] text-[#f5f0ea] font-semibold">Basalto / Metal</div>
                  <div className="p-2 bg-[#93c5fd]/30 text-[#f5f0ea] border border-[#93c5fd]/50">Cristal 32mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#121314] border-t border-[#949088]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs text-[#949088]">
            JGS ARQUITECTOS // EXPEDIENTE TÉCNICO VERIFICADO
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#292a2b] hover:bg-[#38393a] text-[#f5f0ea] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
};
