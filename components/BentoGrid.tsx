
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BentoItemProps } from '../types';

export const BentoGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-black/5 border border-black/5 ${className}`}>
      {children}
    </div>
  );
};

export const BentoItem: React.FC<BentoItemProps> = ({ 
  colSpan = 1, 
  rowSpan = 1, 
  title, 
  subtitle, 
  image, 
  dark = false,
  color = "#ffffff", // Default accent color
  className = "" 
}) => {
  const getColSpan = () => {
    switch(colSpan) {
      case 2: return 'md:col-span-2';
      case 3: return 'md:col-span-3';
      case 4: return 'md:col-span-4';
      default: return 'md:col-span-1';
    }
  };

  const getRowSpan = () => {
    switch(rowSpan) {
      case 2: return 'md:row-span-2 min-h-[400px]';
      case 3: return 'md:row-span-3 min-h-[600px]';
      default: return 'min-h-[300px]';
    }
  };

  return (
    <motion.div 
      className={`
        relative group overflow-hidden bg-white
        ${getColSpan()} ${getRowSpan()} ${className}
        ${dark ? 'bg-black/20 text-white' : 'bg-white text-white'}
      `}
      whileHover="hover"
      initial="rest"
    >
      {/* Background Image with Zoom Effect */}
      {image && (
        <motion.div 
          className="absolute inset-0 z-0"
          variants={{
            rest: { scale: 1, filter: "grayscale(100%)" },
            hover: { scale: 1.05, filter: "grayscale(0%)" }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${dark ? 'bg-black/60' : 'bg-white/10'} transition-opacity duration-500`} />
        </motion.div>
      )}

      {/* Grid Pattern Overlay for Tech Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
           style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
        <div className="flex justify-between items-start">
          <span 
            className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-1 transition-colors duration-300`}
            style={{ 
              borderColor: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
            }}
          >
            {subtitle || '01'}
          </span>
          <div 
            className={`transform transition-transform duration-300 group-hover:rotate-45`}
            style={{ color: dark ? 'white' : 'black' }}
          >
             <ArrowUpRight size={20} strokeWidth={1} className="group-hover:text-[var(--accent-color)]" style={{ '--accent-color': color } as React.CSSProperties} />
          </div>
        </div>
        
        <div className="overflow-hidden">
          <motion.div
             variants={{
              rest: { y: 0 },
              hover: { y: -5 }
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-2xl font-semibold leading-tight tracking-tight ${dark ? 'text-white' : 'text-white'}`}>
              {title}
            </h3>
             <div className="h-1 w-12 mt-4 rounded-full" style={{ backgroundColor: color }}></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
