import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/projectsData';

interface ServicesCalculatorProps {
  onSelectProjectInit: (summary: string) => void;
}

export const ServicesCalculator: React.FC<ServicesCalculatorProps> = ({ onSelectProjectInit }) => {
  const [openServiceId, setOpenServiceId] = useState<string>('s01');
  const [areaSqm, setAreaSqm] = useState<number>(750);
  const [typology, setTypology] = useState<'villa' | 'rehab' | 'pabellon'>('villa');
  const [sustainability, setSustainability] = useState<'passivhaus' | 'leed' | 'estandar'>('passivhaus');
  const [automation, setAutomation] = useState<'knx' | 'basic'>('knx');

  // Calculation estimates
  const baseCostPerSqm = typology === 'villa' ? 3200 : typology === 'rehab' ? 2600 : 3800;
  const sustainabilityMultiplier = sustainability === 'passivhaus' ? 1.15 : sustainability === 'leed' ? 1.08 : 1.0;
  const automationMultiplier = automation === 'knx' ? 1.12 : 1.02;

  const estimatedConstructionCost = Math.round(areaSqm * baseCostPerSqm * sustainabilityMultiplier * automationMultiplier);
  const estimatedStudioFee = Math.round(estimatedConstructionCost * 0.11);
  const estimatedMonths = typology === 'villa' ? 18 : typology === 'rehab' ? 12 : 15;

  const handleConsultWithCalc = () => {
    const summary = `Estimación preliminar: ${areaSqm}m² (${typology.toUpperCase()}), Estándar: ${sustainability.toUpperCase()}, Coste aprox: ${(estimatedConstructionCost / 1000000).toFixed(2)}M€`;
    onSelectProjectInit(summary);
  };

  return (
    <div className="w-full">
      {/* 2-Column Layout: Services Accordion on Left, Interactive Tectonic Estimator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Services Accordion */}
        <div className="lg:col-span-7 space-y-3">
          {SERVICES_DATA.map((service) => {
            const isOpen = openServiceId === service.id;
            return (
              <div
                key={service.id}
                className="bg-[#1f2021] border border-[#949088]/20 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenServiceId(isOpen ? '' : service.id)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-[#292a2b] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#ccc6bc]">{service.number}</span>
                    <h3 className="font-headline text-base sm:text-lg text-[#f5f0ea] uppercase font-semibold">
                      {service.title}
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-[#ccc6bc] text-2xl transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#949088]/15 space-y-4 text-sm font-light text-[#cac6bd]">
                    <p className="leading-relaxed">{service.details}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-[#ccc6bc]">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="bg-[#121314] px-2.5 py-1 border border-[#949088]/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables and Timeline */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-[#292a2b]">
                      <div>
                        <span className="font-mono text-[10px] text-[#949088] uppercase block">Entregables Clave:</span>
                        <ul className="text-[#e3e2e3] mt-1 space-y-0.5">
                          {service.deliverables.map((d, idx) => (
                            <li key={idx}>· {d}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#949088] uppercase block">Plazo Estimado:</span>
                        <span className="text-[#f5f0ea] font-mono mt-1 block">{service.timeline}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Construction Estimator */}
        <div className="lg:col-span-5 bg-[#1b1c1d] border border-[#949088]/30 p-6 space-y-6">
          <div className="border-b border-[#949088]/20 pb-3">
            <span className="font-mono text-[11px] text-[#ccc6bc] tracking-widest uppercase block">
              HERRAMIENTA DE PLANIFICACIÓN
            </span>
            <h3 className="font-headline text-lg text-[#f5f0ea] uppercase font-bold tracking-tight">
              Calculadora Tectónica de Proyecto
            </h3>
            <p className="text-xs text-[#cac6bd] mt-1 font-light">
              Proyecte parámetros de escala, estándar energético y presupuestos preliminares.
            </p>
          </div>

          <div className="space-y-4">
            {/* Square meters slider */}
            <div>
              <div className="flex justify-between items-baseline font-mono text-xs mb-1.5">
                <span className="text-[#cac6bd] uppercase">Superficie Proyectada:</span>
                <span className="text-[#f5f0ea] font-bold text-sm">{areaSqm} m²</span>
              </div>
              <input
                type="range"
                min="350"
                max="2500"
                step="50"
                value={areaSqm}
                onChange={(e) => setAreaSqm(parseInt(e.target.value))}
                className="w-full accent-[#d8d4ce] h-2 bg-[#292a2b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#949088] mt-1">
                <span>350 m²</span>
                <span>1,200 m²</span>
                <span>2,500 m²</span>
              </div>
            </div>

            {/* Typology */}
            <div>
              <label className="font-mono text-[11px] text-[#cac6bd] uppercase block mb-1.5">
                Tipología Arquitectónica
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTypology('villa')}
                  className={`py-2 px-1 text-center transition-colors ${
                    typology === 'villa' ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'bg-[#292a2b] text-[#cac6bd]'
                  }`}
                >
                  Villa / Residencia
                </button>
                <button
                  type="button"
                  onClick={() => setTypology('rehab')}
                  className={`py-2 px-1 text-center transition-colors ${
                    typology === 'rehab' ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'bg-[#292a2b] text-[#cac6bd]'
                  }`}
                >
                  Rehabilitación
                </button>
                <button
                  type="button"
                  onClick={() => setTypology('pabellon')}
                  className={`py-2 px-1 text-center transition-colors ${
                    typology === 'pabellon' ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'bg-[#292a2b] text-[#cac6bd]'
                  }`}
                >
                  Pabellón Singular
                </button>
              </div>
            </div>

            {/* Sustainability Standard */}
            <div>
              <label className="font-mono text-[11px] text-[#cac6bd] uppercase block mb-1.5">
                Estándar de Sostenibilidad
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSustainability('passivhaus')}
                  className={`py-2 px-2 text-center transition-colors ${
                    sustainability === 'passivhaus' ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'bg-[#292a2b] text-[#cac6bd]'
                  }`}
                >
                  Passivhaus Plus (+15%)
                </button>
                <button
                  type="button"
                  onClick={() => setSustainability('leed')}
                  className={`py-2 px-2 text-center transition-colors ${
                    sustainability === 'leed' ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'bg-[#292a2b] text-[#cac6bd]'
                  }`}
                >
                  LEED Platinum (+8%)
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-[#121314] p-4 border border-[#949088]/20 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-[#949088]">Inversión Estimada en Obra:</span>
              <span className="text-[#f5f0ea] text-base font-bold">
                {(estimatedConstructionCost / 1000000).toFixed(2)} M€
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[#949088]">Honorarios de Arquitectura & DO (~11%):</span>
              <span className="text-[#ccc6bc]">
                {(estimatedStudioFee / 1000).toFixed(0)} k€
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-[#292a2b] pt-2">
              <span className="text-[#949088]">Plazo Total Llave en Mano:</span>
              <span className="text-[#f5f0ea] font-medium">{estimatedMonths} meses</span>
            </div>
          </div>

          <button
            onClick={handleConsultWithCalc}
            className="w-full py-3 bg-[#d8d4ce] hover:bg-[#f5f0ea] text-[#121314] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            Trasladar Estimación a Solicitud Privada
          </button>
        </div>
      </div>
    </div>
  );
};
