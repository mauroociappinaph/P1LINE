import React from 'react';
import { motion } from 'motion/react';
import { Driver } from '../types';

interface TrackMapProps {
  drivers: Driver[];
}

export const TrackMap: React.FC<TrackMapProps> = ({ drivers }) => {
  // A simple SVG path representing a generic F1 track
  const trackPath = "M 50,150 C 50,50 150,50 250,50 C 350,50 450,100 450,200 C 450,300 350,350 250,350 C 150,350 50,250 50,150";

  return (
    <div className="relative w-full aspect-[16/9] bg-white/[0.02] rounded-[2.5rem] border border-white/10 overflow-hidden p-8 flex items-center justify-center">
      <div className="absolute top-6 left-8">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1 h-3 bg-red-500 rounded-full" />
          Mapa de Pista en Vivo
        </h3>
      </div>
      
      <svg viewBox="0 0 500 400" className="w-full h-full max-w-2xl drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {/* Track Background */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        {/* Track Line */}
        <path
          id="race-track"
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />

        {/* Driver Markers */}
        {drivers.map((driver) => (
          <DriverMarker 
            key={driver.id} 
            trackPosition={driver.trackPosition} 
            color={driver.color} 
            name={driver.name} 
          />
        ))}
      </svg>
      
      <div className="absolute bottom-6 right-8 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sector 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sector 2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sector 3</span>
        </div>
      </div>
    </div>
  );
};

const DriverMarker = React.memo(({ trackPosition, color, name }: { trackPosition: number, color: string, name: string }) => {
  const [point, setPoint] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const path = document.getElementById('race-track') as unknown as SVGPathElement | null;
    if (path) {
      try {
        const length = path.getTotalLength();
        const distance = (trackPosition / 100) * length;
        const p = path.getPointAtLength(distance);
        setPoint({ x: p.x, y: p.y });
      } catch (e) {
        // Fallback or ignore if path is not ready
      }
    }
  }, [trackPosition]);

  const shortName = name.split(' ').pop()?.substring(0, 3).toUpperCase() || 'DRV';

  return (
    <motion.g
      animate={{ x: point.x, y: point.y }}
      transition={{ type: "spring", damping: 25, stiffness: 50 }}
    >
      {/* Glow */}
      <circle r="8" fill={color} className="opacity-20 blur-sm" />
      {/* Marker */}
      <circle r="4" fill={color} stroke="white" strokeWidth="1" />
      {/* Label */}
      <text
        y="-12"
        textAnchor="middle"
        fill="white"
        className="text-[10px] font-black uppercase tracking-tighter pointer-events-none select-none"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        {shortName}
      </text>
    </motion.g>
  );
});

DriverMarker.displayName = 'DriverMarker';
