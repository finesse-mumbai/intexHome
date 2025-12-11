import React from 'react';

export const HexagonPattern: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3Cpath d='M30 52l25.98 15v30L30 112 4.02 97V67z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3Cpath d='M0 52V22L0 22' fill='none' stroke='%23000000' stroke-width='1'/%3E%3Cpath d='M60 52V22L60 22' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
        opacity: opacity,
        backgroundSize: '60px 104px'
      }}
    />
  );
};

export const DotPattern: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        opacity: opacity
      }}
    />
  );
};