import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Info } from 'lucide-react';
import { Driver } from '../types';
import { cn } from '../lib/utils';
import { EducationalModal } from './EducationalModal';
import { EXPLANATIONS } from '../mockData';

interface DriverCardProps {
  driver: Driver;
  isSelected: boolean;
  onClick: () => void;
}

export const DriverCard = React.memo(({ driver, isSelected, onClick }: DriverCardProps) => {
  return (
    <motion.div
      layout="position"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "group relative flex flex-col p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md",
        isSelected 
          ? "bg-white/15 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/20" 
          : "bg-white/[0.03] border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Driver Image Background (Subtle) */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
        <img 
          src={driver.image} 
          alt={driver.name} 
          className="w-full h-full object-contain object-right-top"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Selection Glow */}
      {isSelected && (
        <motion.div 
          layoutId="active-glow"
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
        />
      )}
      
      <div className="flex items-center w-full relative z-10">
        <div className="w-1.5 h-10 rounded-full mr-4 shrink-0" style={{ backgroundColor: driver.color }} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-black tracking-tighter text-zinc-500 uppercase">Posición {driver.position}</span>
            <span className="text-[10px] font-mono text-zinc-400 bg-black/30 px-1.5 py-0.5 rounded">{driver.gapToLeader}</span>
          </div>
          <h3 className="font-bold text-sm tracking-tight">{driver.name}</h3>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{driver.team}</p>
        </div>
        <ChevronRight size={16} className={cn(
          "text-zinc-600 transition-all",
          isSelected ? "rotate-90 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0"
        )} />
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden relative z-10"
          >
            <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
              {/* Car Image */}
              <div className="relative h-20 w-full overflow-hidden rounded-xl bg-black/20 border border-white/5 group/car">
                <img 
                  src={driver.carImage} 
                  alt={`${driver.team} car`} 
                  className="w-full h-full object-contain scale-125 translate-x-4 group-hover/car:scale-150 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-4">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Auto de {driver.team}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Velocidad</p>
                  <div className="flex items-end gap-1">
                    <span className="text-sm font-mono font-bold">{driver.telemetry.speed}</span>
                    <span className="text-[8px] text-zinc-600 font-bold mb-0.5">KM/H</span>
                  </div>
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] text-zinc-500 uppercase font-black">Neumáticos</p>
                    <EducationalModal 
                      {...EXPLANATIONS.TIRE_WEAR} 
                      trigger={
                        <button className="text-zinc-500 hover:text-white transition-colors">
                          <Info size={10} />
                        </button>
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full border-2",
                      driver.tires.type === 'Soft' ? 'border-red-600' : 
                      driver.tires.type === 'Medium' ? 'border-yellow-500' : 'border-white'
                    )} />
                    <span className="text-xs font-bold">{driver.tires.type}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{driver.tires.condition}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                  <span className="text-green-500">Gas</span>
                  <span className="text-zinc-500">{driver.telemetry.throttle}%</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${driver.telemetry.throttle}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest pt-1">
                  <span className="text-red-500">Freno</span>
                  <span className="text-zinc-500">{driver.telemetry.brake}%</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${driver.telemetry.brake}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

DriverCard.displayName = 'DriverCard';
