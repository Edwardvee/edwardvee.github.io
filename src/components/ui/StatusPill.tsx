interface StatusPillProps {
  status: string;
  location: string;
}

export function StatusPill({ status, location }: StatusPillProps) {
  return (
    <div className="inline-flex flex-col gap-8 border border-ink px-16 py-8 text-label text-ink sm:flex-row sm:items-center sm:gap-24">
      <span className="flex items-center gap-8">
        <span
          className="inline-block size-8 bg-ink"
          aria-hidden="true"
        />
        {status}
      </span>
      <span className="opacity-100 sm:border-l sm:border-ink sm:pl-24">
        {location}
      </span>
    </div>
  );
}
