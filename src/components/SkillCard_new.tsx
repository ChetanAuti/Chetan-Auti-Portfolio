import { motion } from 'framer-motion';

interface SkillCardProps {
  skill: string;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const containerVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.5,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 px-5 py-4 text-center text-white shadow-glow backdrop-blur-xl transition duration-300 hover:border-cyan-300/50 cursor-pointer">
        <span className="font-semibold text-slate-100">
          {skill}
        </span>
      </div>
    </motion.div>
  );
}
