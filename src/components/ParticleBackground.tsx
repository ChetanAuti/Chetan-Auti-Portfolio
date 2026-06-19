import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParticleBackground() {
  const particles = Array.from({ length: 28 });
  const { scrollY } = useScroll();

  // Create parallax effects for different layers
  const parallax1 = useTransform(scrollY, (value) => value * 0.3);
  const parallax2 = useTransform(scrollY, (value) => value * 0.5);
  const parallax3 = useTransform(scrollY, (value) => value * 0.7);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Parallax particle layers */}
      <motion.div style={{ y: parallax1 }} className="absolute inset-0">
        {particles.map((_, index) => {
          if (index % 3 !== 0) return null;
          return (
            <span
              key={`layer1-${index}`}
              className="absolute rounded-full bg-cyan-300/20 blur-sm animate-pulseGlow"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          );
        })}
      </motion.div>

      <motion.div style={{ y: parallax2 }} className="absolute inset-0">
        {particles.map((_, index) => {
          if (index % 3 !== 1) return null;
          return (
            <span
              key={`layer2-${index}`}
              className="absolute rounded-full bg-cyan-300/25 blur-md animate-pulseGlow"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 7}s`,
              }}
            />
          );
        })}
      </motion.div>

      <motion.div style={{ y: parallax3 }} className="absolute inset-0">
        {particles.map((_, index) => {
          if (index % 3 !== 2) return null;
          return (
            <span
              key={`layer3-${index}`}
              className="absolute rounded-full bg-violet-300/20 blur-lg animate-pulseGlow"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Animated Grid Background */}
      <motion.div
        style={{ y: useTransform(scrollY, (value) => value * 0.2) }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20"
      />

      {/* Gradient Glow Orbs */}
      <motion.div
        style={{ y: useTransform(scrollY, (value) => value * 0.15) }}
        className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollY, (value) => value * 0.25) }}
        className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
      />
    </div>
  );
}
