type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#ff4d4d]">{label}</p>
      <h2 className="text-3xl font-semibold leading-tight text-[#f5f5f5] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-[#bdbdbd] sm:text-base">{description}</p>
    </div>
  );
}
