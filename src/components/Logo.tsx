import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const LogoIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-9 h-9',
  size,
}) => {
  return (
    <img 
      src={`${import.meta.env.BASE_URL}logo.png`} 
      alt="JGS Arquitectos Logo" 
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 object-contain rounded-full shadow-lg ${className} filter invert`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Exact Monogram Icon */}
      <div className="relative flex items-center justify-center p-1 bg-[#0d0e0f] border border-[#949088]/20 shadow-lg group-hover:border-[#ffffff]/40 transition-colors rounded-full">
        <LogoIcon size={size} />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-headline text-lg sm:text-xl tracking-[0.25em] text-[#f5f0ea] uppercase font-bold group-hover:text-white transition-colors leading-tight">
            JGS ARQUITECTOS
          </span>
          <span className="font-mono text-[9px] text-[#cac6bd] tracking-[0.26em] uppercase -mt-0.5">
            CONSTRUCCIÓN & DISEÑO
          </span>
        </div>
      )}
    </div>
  );
};
