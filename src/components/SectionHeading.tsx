export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/80">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{subtitle}</h2>
    </div>
  );
}
