import React, { useState, useEffect } from 'react';
import { Flag, Timer, Zap, Gauge, Info, Users, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Driver, RaceStatus, TelemetryPoint } from './types';
import { MOCK_DRIVERS, MOCK_RACE_STATUS, generateTelemetryData, EXPLANATIONS } from './mockData';
import { TelemetryChart } from './components/TelemetryChart';
import { EducationalModal } from './components/EducationalModal';
import { getRaceSummary } from './services/geminiService';
import { DriverCard } from './components/DriverCard';
import { TrackMap } from './components/TrackMap';
import { cn } from './lib/utils';

export default function App() {
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [status, setStatus] = useState<RaceStatus>(MOCK_RACE_STATUS);
  const [selectedDriverId, setSelectedDriverId] = useState<string>(MOCK_DRIVERS[0].id);
  const [comparisonId, setComparisonId] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [telemetryHistory, setTelemetryHistory] = useState<Record<string, TelemetryPoint[]>>(() => {
    const initial: Record<string, TelemetryPoint[] | any> = {};
    MOCK_DRIVERS.forEach(d => {
      initial[d.id] = generateTelemetryData(d.id);
    });
    return initial;
  });

  const selectedDriver = drivers.find(d => d.id === selectedDriverId)!;
  const comparisonDriver = drivers.find(d => d.id === comparisonId);

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const summary = await getRaceSummary({ status, drivers });
    setAiSummary(summary);
    setIsGeneratingSummary(false);
  };

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setDrivers(prevDrivers => {
        const updatedDrivers = prevDrivers.map(d => ({
          ...d,
          trackPosition: (d.trackPosition + (d.telemetry.speed / 1200)) % 100,
          telemetry: {
            ...d.telemetry,
            speed: Math.floor(280 + Math.random() * 50),
            throttle: Math.floor(Math.random() * 100),
            brake: Math.floor(Math.random() * 20),
          }
        }));

        setTelemetryHistory(prevHistory => {
          const nextHistory = { ...prevHistory };
          updatedDrivers.forEach(d => {
            const currentHistory = prevHistory[d.id] || [];
            const newPoint = {
              time: now,
              speed: d.telemetry.speed,
              throttle: d.telemetry.throttle,
              brake: d.telemetry.brake
            };
            nextHistory[d.id] = [...currentHistory.slice(-19), newPoint];
          });
          return nextHistory;
        });

        return updatedDrivers;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-red-600/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-sm font-black italic text-white">F1</div>
              <h1 className="font-bold tracking-tighter text-xl hidden sm:block">BEGINNER HUB</h1>
            </div>
            <div className="h-6 w-px bg-zinc-800 mx-2" />
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2 py-1 bg-red-600/10 text-red-500 rounded-full text-[10px] font-bold animate-pulse">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {status.status}
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-zinc-400 rounded-full text-[10px] font-bold">
                TEMPORADA 2026
              </span>
              <span className="text-xs font-mono text-zinc-400">{status.trackName}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={
                    status.flag === 'Green' 
                      ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }
                      : status.flag === 'Yellow'
                      ? { filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"], scale: [1, 1.05, 1] }
                      : status.flag === 'Red'
                      ? { opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }
                      : { opacity: [1, 0.5, 1] } // Safety Car / VSC
                  }
                  transition={{ 
                    duration: status.flag === 'Green' ? 2.5 : status.flag === 'Yellow' ? 1.5 : 0.8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flag size={14} className={cn(
                    status.flag === 'Green' ? 'text-green-500' : 
                    status.flag === 'Yellow' ? 'text-yellow-500' : 
                    status.flag === 'Red' ? 'text-red-500' : 'text-orange-500'
                  )} />
                </motion.div>
                <span className="font-black tracking-tighter">BANDERA {status.flag.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={14} className="text-zinc-500" />
                <span>VUELTA {status.lap}/{status.totalLaps}</span>
              </div>
            </div>
            <button 
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            >
              <MessageSquareQuote size={14} />
              {isGeneratingSummary ? "GENERANDO..." : "RESUMEN IA"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          {/* Track Map Integration */}
          <TrackMap drivers={drivers} />

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Users size={16} />
                Posiciones
              </h2>
              <EducationalModal {...EXPLANATIONS.UNDERCUT} />
            </div>
            
            <div className="space-y-3">
              {drivers.map((driver) => (
                <DriverCard 
                  key={driver.id}
                  driver={driver}
                  isSelected={selectedDriverId === driver.id}
                  onClick={() => setSelectedDriverId(driver.id)}
                />
              ))}
            </div>
          </section>


          {/* AI Summary Box */}
          <AnimatePresence>
            {aiSummary && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500">
                  <MessageSquareQuote size={48} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1 h-3 bg-red-500 rounded-full" />
                    Resumen para Principiantes
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed italic font-medium">
                    "{aiSummary}"
                  </p>
                  <button 
                    onClick={() => setAiSummary("")}
                    className="mt-6 text-[10px] text-zinc-500 hover:text-white underline font-bold uppercase tracking-widest transition-colors"
                  >
                    Cerrar resumen
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Details & Telemetry */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Driver Focus Card */}
          <section className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 relative z-10">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <motion.span 
                    key={selectedDriver.position}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-7xl font-black italic text-white/5 select-none"
                  >
                    #{selectedDriver.position}
                  </motion.span>
                  <div>
                    <motion.h2 
                      key={selectedDriver.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-black tracking-tighter uppercase leading-none mb-1"
                    >
                      {selectedDriver.name}
                    </motion.h2>
                    <p className="text-red-500 font-black tracking-[0.2em] text-xs uppercase opacity-80">{selectedDriver.team}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white/[0.03] backdrop-blur-md p-5 rounded-3xl border border-white/10 min-w-[140px] shadow-inner">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Neumáticos</p>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-4 shadow-[0_0_10px_rgba(255,255,255,0.1)]",
                      selectedDriver.tires.type === 'Soft' ? 'border-red-600' : 
                      selectedDriver.tires.type === 'Medium' ? 'border-yellow-500' : 'border-white'
                    )} />
                    <span className="font-bold text-lg">{selectedDriver.tires.type}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 font-medium">{selectedDriver.tires.laps} vueltas de uso</p>
                  <div className="mt-2">
                    <EducationalModal {...EXPLANATIONS.TIRES} />
                  </div>
                </div>
                
                <div className="bg-white/[0.03] backdrop-blur-md p-5 rounded-3xl border border-white/10 min-w-[140px] shadow-inner">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Estado DRS</p>
                  <div className="flex items-center gap-3">
                    <Zap size={20} className={selectedDriver.telemetry.drs ? "text-yellow-400 fill-yellow-400/20" : "text-zinc-700"} />
                    <span className={cn("font-bold text-lg", selectedDriver.telemetry.drs ? "text-yellow-400" : "text-zinc-500")}>
                      {selectedDriver.telemetry.drs ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <EducationalModal {...EXPLANATIONS.DRS} />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Telemetry Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/[0.03] backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group/widget"
              >
                <div className="flex items-center justify-between mb-5">
                  <Gauge size={22} className="text-zinc-500 group-hover/widget:text-white transition-colors" />
                  <span className="text-3xl font-mono font-black tracking-tighter">{selectedDriver.telemetry.speed} <span className="text-xs text-zinc-500 font-bold">KM/H</span></span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    animate={{ width: `${(selectedDriver.telemetry.speed / 350) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 font-black uppercase tracking-widest">Velocidad Punta</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/[0.03] backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group/widget"
              >
                <div className="flex items-center justify-between mb-5">
                  <Zap size={22} className="text-green-500 fill-green-500/10 group-hover/widget:fill-green-500/30 transition-all" />
                  <span className="text-3xl font-mono font-black tracking-tighter text-green-500">{selectedDriver.telemetry.throttle}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    animate={{ width: `${selectedDriver.telemetry.throttle}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 font-black uppercase tracking-widest">Aceleración</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/[0.03] backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group/widget"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-6 h-6 rounded-md border-2 border-red-500 flex items-center justify-center text-[10px] font-black text-red-500 group-hover/widget:bg-red-500 group-hover/widget:text-white transition-all">B</div>
                  <span className="text-3xl font-mono font-black tracking-tighter text-red-500">{selectedDriver.telemetry.brake}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    animate={{ width: `${selectedDriver.telemetry.brake}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 font-black uppercase tracking-widest">Frenado</p>
              </motion.div>
            </div>

            {/* Chart */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/5">
              <TelemetryChart 
                data={telemetryHistory[selectedDriver.id] || []} 
                color={selectedDriver.color} 
                label="Análisis de Telemetría en Tiempo Real" 
                dataKey="speed"
              />
            </div>
          </section>

          {/* Comparison Selector */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Comparar con otro piloto</h3>
              {comparisonId && (
                <button 
                  onClick={() => setComparisonId(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Limpiar comparación
                </button>
              )}
            </div>
            
            {!comparisonId ? (
              <div className="flex flex-wrap gap-3">
                {drivers.filter(d => d.id !== selectedDriverId).map(driver => (
                  <motion.button
                    key={driver.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setComparisonId(driver.id)}
                    className="px-5 py-3 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg"
                  >
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: driver.color }} />
                    {driver.name}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: selectedDriver.color }} />
                    <span className="font-black uppercase tracking-tight text-lg">{selectedDriver.name}</span>
                  </div>
                  <TelemetryChart data={telemetryHistory[selectedDriver.id] || []} color={selectedDriver.color} label="Ritmo de carrera" dataKey="speed" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: comparisonDriver?.color }} />
                    <span className="font-black uppercase tracking-tight text-lg">{comparisonDriver?.name}</span>
                  </div>
                  <TelemetryChart data={telemetryHistory[comparisonDriver?.id || ''] || []} color={comparisonDriver?.color || '#fff'} label="Ritmo de carrera" dataKey="speed" />
                </motion.div>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Footer / Education Bar */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Info size={18} className="text-red-600" />
                Guía Rápida
              </h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li>• Los colores de neumáticos indican dureza.</li>
                <li>• DRS solo se activa si estás a menos de 1s del coche de delante.</li>
                <li>• El "Gap" es la diferencia de tiempo entre pilotos.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Conceptos Clave</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(EXPLANATIONS).map(([key, exp]) => (
                  <EducationalModal key={key} title={exp.title} content={exp.content} trigger={
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs hover:bg-zinc-800 transition-colors cursor-pointer">
                      {exp.title}
                    </span>
                  } />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest">F1 Beginner Hub v1.0</p>
              <p className="text-[10px] text-zinc-700 mt-2 italic">Diseñado para que ames la F1 desde la primera vuelta.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
