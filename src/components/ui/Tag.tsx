interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex border border-ink px-8 py-4 text-label text-ink">
      {children}
    </span>
  );
}
