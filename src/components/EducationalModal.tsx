import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EducationalModalProps {
  title: string;
  content: string;
  trigger?: React.ReactNode;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({ title, content, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-400 transition-colors">
        {trigger || <Info size={14} />}
        <span className="underline font-medium">¿Qué es esto?</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-red-600 rounded-full" />
                {title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed">
                {content}
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
