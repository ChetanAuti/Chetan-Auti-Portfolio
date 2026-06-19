import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import HeroScene from './components/HeroScene';
import SectionHeading from './components/SectionHeading';
import AnimatedSection from './components/AnimatedSection';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';
import { navLinks, skills, projects, certificates, socialLinks } from './data/portfolio';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? <LoadingScreen key="loading" /> : null}
      </AnimatePresence>

      {!loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative min-h-screen overflow-hidden bg-bg text-slate-100"
        >
          <ParticleBackground />
          <Navbar links={navLinks} />

          <main className="relative z-10">
            <section id="home" className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 lg:px-10">
              <div className="grid w-full items-center gap-12 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                >
                  <div className="inline-flex rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-200 shadow-glow backdrop-blur-xl">
                    Aspiring Data Scientist 
                  </div>
                  <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                    Hi, I'm <span className="text-cyan-300">Chetan Auti</span>
                    <br />
                    Aspiring Data Scientist &
                    <span className="text-violet-300"> Machine Learning Engineer</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                    Turning data into actionable insights and building intelligent systems
                    with Machine Learning, Analytics, and AI.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#projects" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-200">
                      View Projects
                    </a>
                    <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:scale-105 hover:border-cyan-300/50 hover:bg-white/10">
                      Contact Me
                    </a>
                    <a
                      href={socialLinks.resume}
                      download
                      className="rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
      >
                       Download Resume
                     </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative"
                >
                  <HeroScene />
                </motion.div>
              </div>
            </section>

            <AnimatedSection 
              id="about" 
              title="About" 
              subtitle="A focused learner building practical intelligence systems."
            >
              <motion.p 
                className="max-w-4xl text-lg leading-8 text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                I'm Chetan Auti, an aspiring Data Scientist and Machine Learning Engineer passionate about solving real-world problems with Python, analytics, and ML workflows. I like turning messy data into insights, dashboards, and deployable applications that feel modern and useful.
              </motion.p>
            </AnimatedSection>

            <AnimatedSection 
              id="skills" 
              title="Skills" 
              subtitle="Core technologies and tools I use to explore data, build machine learning models, and create impactful applications."
            >
              <motion.div 
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {skills.map((skill, index) => (
                  <SkillCard key={skill} skill={skill} index={index} />
                ))}
              </motion.div>
            </AnimatedSection>

            <AnimatedSection 
              id="projects" 
              title="Projects" 
              subtitle="Featured projects demonstrating my expertise in Machine Learning, Data Analytics, SQL, and Business Intelligence through real-world applications and data-driven insights."
            >
              <motion.div 
                className="grid gap-6 lg:grid-cols-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.title} 
                    {...project}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatedSection>

            <AnimatedSection
              id="certificates"
              title="Certificates"
              subtitle="Professional certifications and learning milestones from DataCamp."
            >
              <motion.div 
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition"
                  >
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                      {certificate.issuer}
                    </p>

                    <h3 className="mt-3 text-xl font-bold text-white">
                      {certificate.title}
                    </h3>

                    <p className="mt-3 text-slate-300">
                      {certificate.detail}
                    </p>

                    <motion.a
                      href={certificate.pdf}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 inline-block rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-lg"
                    >
                      View Certificate
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
            <AnimatedSection
              id="contact"
              title="Contact"
              subtitle="Open to jobs, collaborations, and opportunities in Data Science, Machine Learning, and AI."
            >
              <motion.div className="space-y-6">
                <motion.div 
                  className="space-y-2 text-lg text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p>
                    📧 Email: <span className="text-white">chetanauti5@gmail.com</span>
                  </p>
                  <p>
                    📍 Location: <span className="text-white">Pune Maharashtra, India</span>
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border border-white/10 bg-white/6 px-5 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/12"
                  >
                    GitHub
                  </motion.a>

                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border border-white/10 bg-white/6 px-5 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/12"
                  >
                    LinkedIn
                  </motion.a>

                  <motion.a
                    href={socialLinks.resume}
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:shadow-lg"
                  >
                    Resume Download
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </main>
        </motion.div>
      ) : null}
    </>
  );
}

export default App;
