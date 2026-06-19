import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollTrigger } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AnimatedSection({
  id,
  title,
  subtitle,
  children,
}: AnimatedSectionProps) {
  const isVisible = useScrollTrigger(0.15);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <section
      id={id}
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute -inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl"
      />

      <motion.div
        variants={containerVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="relative z-10">
          <motion.h2
            className="text-4xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Content with staggered animations */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-12"
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
