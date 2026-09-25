import React, { useState, useEffect } from 'react';

interface ContactSectionProps {
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialNotes = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [projectType, setProjectType] = useState('Residencia Unifamiliar Nueva (800m²+)');
  const [budget, setBudget] = useState('3.0M€ — 6.0M€');
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialNotes) {
      setNotes((prev) => (prev ? `${prev}\n${initialNotes}` : initialNotes));
    }
  }, [initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `MNL-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-[#0d0e0f] px-6 md:px-12 lg:px-20 py-20" id="contacto-seccion">
      <div className="bg-[#1f2021] p-8 md:p-14 border border-[#949088]/20 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#f5f0ea]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10">
          {/* Pitch Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#ccc6bc] tracking-[0.25em] uppercase block">
                06 // INICIAR CONVERSACIÓN
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#f5f0ea] font-normal uppercase tracking-tight leading-[1.1]">
                Comience a materializar su próximo espacio vital.
              </h2>
              <p className="text-sm sm:text-base text-[#cac6bd] font-light leading-relaxed">
                Atendemos un cupo limitado de proyectos residenciales por año fiscal para asegurar dedicación absoluta a los detalles tectónicos, a la dirección presencial y a la selección de canteras.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-[#949088] pt-6 border-t border-[#949088]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400"></span>
                <span>CONSULTA PRIVADA // CONFIDENCIALIDAD TOTAL</span>
              </div>
              <div className="text-[#f5f0ea]">
                ATENCIÓN DIRECTA CON LA DIRECCIÓN TÉCNICA DEL ESTUDIO
              </div>
              <div className="text-[#ccc6bc]">
                Sedes en Madrid (Almagro), Zürich (Gotthard) y CDMX (Polanco).
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#121314]/90 backdrop-blur-md p-6 sm:p-8 border border-[#949088]/25">
            {isSubmitted ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-[#f5f0ea] text-[#121314] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl font-bold">check</span>
                </div>
                <span className="font-mono text-xs text-[#ccc6bc] uppercase tracking-wider block">
                  EXPEDIENTE REGISTRADO // {ticketId}
                </span>
                <h3 className="font-headline text-2xl text-[#f5f0ea] uppercase font-bold">
                  Solicitud en Revisión Técnica
                </h3>
                <p className="text-sm text-[#cac6bd] max-w-md mx-auto font-light">
                  Gracias, {name}. La secretaría del Arq. José Garnica ha recibido su planteamiento para la parcela en {location || 'la ubicación indicada'}. Nos pondremos en contacto en menos de 24 horas para agendar su sesión privada.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-[#292a2b] hover:bg-[#38393a] text-[#f5f0ea] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Registrar Otra Consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Nombre Completo / Entidad *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="p. ej. Sofía Santoro"
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] placeholder:text-[#949088]/40 focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Ubicación de la Parcela / Terreno *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="p. ej. Pozuelo, Valle de Bravo, Zürich..."
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] placeholder:text-[#949088]/40 focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacto@patrimonio.es"
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] placeholder:text-[#949088]/40 focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Teléfono Directo
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] placeholder:text-[#949088]/40 focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Typology */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Tipología de Proyecto
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    >
                      <option>Residencia Unifamiliar Nueva (800m²+)</option>
                      <option>Rehabilitación Integral Monolítica</option>
                      <option>Pabellón Privado o Galería</option>
                      <option>Desarrollo Residencial Boutique</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                      Inversión Prevista (Construcción)
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                    >
                      <option>1.5M€ — 3.0M€</option>
                      <option>3.0M€ — 6.0M€</option>
                      <option>Superior a 6.0M€</option>
                      <option>Institucional / Confidencial</option>
                    </select>
                  </div>
                </div>

                {/* Notes Input */}
                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-[#ccc6bc] uppercase block">
                    Visión Particular del Emplazamiento
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Comentarios sobre el entorno, orientación deseada, topografía o particularidades del terreno..."
                    className="w-full bg-[#1b1c1d] border-b border-[#949088]/40 px-3 py-2 text-sm text-[#f5f0ea] placeholder:text-[#949088]/40 focus:outline-none focus:border-[#f5f0ea] focus:bg-[#292a2b] transition-colors"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#949088]">
                    <span className="w-1.5 h-1.5 bg-emerald-400"></span>
                    <span>TIEMPO MEDIO DE RESPUESTA: &lt; 24H</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#f5f0ea] text-[#121314] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d8d4ce] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Agendar Sesión Privada</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
