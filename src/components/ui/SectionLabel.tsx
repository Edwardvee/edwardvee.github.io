interface SectionLabelProps {
  index: string;
  label: string;
}

export function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <div className="flex items-baseline gap-16 text-label text-ink">
      <span>{index}</span>
      <span>{label}</span>
    </div>
  );
}
