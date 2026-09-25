import React, { useState } from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0d0e0f] text-[#cac6bd] py-16 border-t border-[#949088]/20">
      <div className="w-full px-6 md:px-12 lg:px-20 space-y-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Studio Wordmark & Manifesto */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Logo size={42} className="mb-4" />
              <p className="text-sm text-[#949088] max-w-sm mt-3 font-light leading-relaxed">
                Arquitectura tectónica radical, materialidad honesta y rigor espacial para instituciones y residencias excepcionales en Europa y América.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#949088]">
              <span className="w-1.5 h-1.5 bg-[#f5f0ea]"></span>
              <span>DATUM // 40.4168° N · 3.7038° W</span>
            </div>
          </div>

          {/* Studios Locations */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#f5f0ea] uppercase block tracking-wider font-semibold">
                Madrid
              </span>
              <address className="not-italic text-xs text-[#949088] space-y-1 font-light">
                <div>Calle Almagro 14</div>
                <div>28010 Madrid</div>
                <div className="text-[#ccc6bc] pt-1">+34 910 204 110</div>
              </address>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#f5f0ea] uppercase block tracking-wider font-semibold">
                CDMX
              </span>
              <address className="not-italic text-xs text-[#949088] space-y-1 font-light">
                <div>Campos Elíseos 204</div>
                <div>Polanco, CDMX</div>
                <div className="text-[#ccc6bc] pt-1">+52 55 4160 8820</div>
              </address>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#f5f0ea] uppercase block tracking-wider font-semibold">
                Zürich
              </span>
              <address className="not-italic text-xs text-[#949088] space-y-1 font-light">
                <div>Gotthardstrasse 26</div>
                <div>8002 Zürich</div>
                <div className="text-[#ccc6bc] pt-1">+41 44 280 9010</div>
              </address>
            </div>
          </div>

          {/* Monograph Bulletin Subscription */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-[#f5f0ea] uppercase block tracking-wider font-semibold mb-1">
                Boletín Monográfico
              </span>
              <p className="text-xs text-[#949088] mb-3 font-light">
                Registro semestral de investigaciones tectónicas, ensayos teóricos y obras concluidas.
              </p>

              {subscribed ? (
                <div className="p-3 bg-[#1f2021] border border-[#949088]/20 font-mono text-xs text-emerald-400">
                  ✓ Suscripción confirmada para próximas monografías.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <div className="flex items-center bg-[#1b1c1d] border border-[#949088]/30 px-3 py-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="monograph@institutional.org"
                      className="bg-transparent font-mono text-xs text-[#f5f0ea] placeholder:text-[#949088]/40 w-full focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="font-mono text-xs text-[#f5f0ea] uppercase hover:text-[#ccc6bc] transition-colors px-2 font-semibold"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-[#949088]">
              <button onClick={() => onNavigate('filosofia-seccion')} className="hover:text-[#f5f0ea] transition-colors">
                Manifiesto
              </button>
              <button onClick={() => onNavigate('proyectos-seccion')} className="hover:text-[#f5f0ea] transition-colors">
                Catálogo
              </button>
              <button onClick={() => onNavigate('estudio-seccion')} className="hover:text-[#f5f0ea] transition-colors">
                Dirección
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1f2021] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#949088]">
          <p>© 2025 JGS ARQUITECTOS. TODOS LOS DERECHOS RESERVADOS.</p>
          <p>SISTEMA TECTÓNICO V4.2 // EDICIÓN MONOLÍTICA THREE.JS</p>
        </div>
      </div>
    </footer>
  );
};
