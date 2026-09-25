import React, { useState, MouseEvent } from 'react';
import './HeroSlider.css';

const baseSlides = [
  {
    id: 'modular',
    title: 'MINIMALISMO',
    description: 'Líneas limpias, colores neutros, espacios abiertos. Menos cosas, más intención en el habitar contemporáneo.',
    image: import.meta.env.BASE_URL + '721099171_1894561801234574_4184927469999369895_n.jpg',
  },
  {
    id: 'travertino',
    title: 'CASA TRAVERTINO',
    description: 'Residencia de lujo construida con cálidos bloques de piedra travertino texturizada y proporciones monumentales.',
    image: import.meta.env.BASE_URL + '725153208_1487642689218128_819161186868229869_n.jpg',
  },
  {
    id: 'cristal',
    title: 'VILLA CRISTAL',
    description: 'Pabellón de cristal arquitectónico con reflejos infinitos, integrando el interior con la naturaleza.',
    image: import.meta.env.BASE_URL + '725279091_1358169512825333_7700966943037890292_n.jpg',
  },
  {
    id: 'domotica',
    title: 'DOMÓTICA V',
    description: 'Mansión moderna y oscura de alta tecnología en un entorno boscoso, fusionando brutalismo con elegancia.',
    image: import.meta.env.BASE_URL + '725588653_1731047268076807_2055582365866218853_n.jpg',
  },
];

// Multiplicamos para que el carrusel de nth-child siempre tenga tarjetas a la derecha
const initialSlides = [
  ...baseSlides.map((s) => ({ ...s, uniqueId: s.id + '-1' })),
  ...baseSlides.map((s) => ({ ...s, uniqueId: s.id + '-2' })),
];

interface HeroSliderProps {
  children?: React.ReactNode;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ children }) => {
  const [items, setItems] = useState(initialSlides);

  const nextSlide = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
  };

  const prevSlide = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
    // En este algoritmo CSS:
    // Index 0 = Fondo desvaneciéndose (oculto/atrás)
    // Index 1 = Fondo ACTIVO a pantalla completa
    // Index 2, 3, 4 = Tarjetas flotantes a la derecha
    // Si cliquea en index > 1, avanzamos el slider
    if (index > 1) {
      nextSlide();
    }
  };

  return (
    <div className="container-slider w-full">
      <div className="slider-slide">
        {items.map((item, i) => (
          <div
            key={item.uniqueId}
            className="slider-item"
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={(e) => handleCardClick(e, i)}
          >
            <div className="item-overlay"></div>

            {/* Este contenido sólo se mostrará por CSS si es el :nth-child(2) */}
            <div className="content-overlay">
              <h2 className="anim-title font-headline text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white drop-shadow-lg">
                {item.title}
              </h2>
              <p className="anim-desc mt-2 md:mt-4 text-xs sm:text-sm md:text-xl font-light text-gray-200 leading-snug drop-shadow-md line-clamp-2 md:line-clamp-none max-w-[80%] md:max-w-none">
                {item.description}
              </p>
              <div className="anim-btn mt-3 md:mt-6 hidden md:block">
                <button className="px-6 py-2 md:px-8 md:py-3 bg-[#4a6b32] hover:bg-[#3d592a] text-white font-medium rounded-lg transition-colors cursor-pointer border-0 text-sm md:text-base">
                  Explorar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido inyectado desde App (Ticker, Títulos estáticos) */}
      {children && (
        <div className="absolute inset-0 z-20 pointer-events-none px-4 md:px-12 lg:px-20 pt-6 md:pt-8">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      )}

      {/* Controles de Navegación Inferiores */}
      <div className="button-controls pointer-events-auto">
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-sm transition-colors border border-white/20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </button>

        <div className="flex flex-col items-center justify-center text-white/70">
          <span className="material-symbols-outlined text-3xl">mouse</span>
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-sm transition-colors border border-white/20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
