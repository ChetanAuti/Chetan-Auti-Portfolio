import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]"
    >
      <div className="relative flex flex-col items-center gap-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="h-20 w-20 rounded-full border-2 border-cyan-300/20 border-t-cyan-300"
        />
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-sm uppercase tracking-[0.45em] text-cyan-100">
          Loading portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}
