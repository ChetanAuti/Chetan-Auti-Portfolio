import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  liveDemo?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  liveDemo,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ delay: (index || 0) * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition duration-300"
    >
      <div className="flex h-full flex-col">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-4 flex-1 text-slate-300">{description}</p>

        {/* Tech Stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100 transition"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.a
            href={github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-cyan-300/10"
          >
            View Project
          </motion.a>

          {liveDemo && (
            <motion.a
              href={liveDemo}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-lg"
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
