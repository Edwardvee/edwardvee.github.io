interface RuleProps {
  className?: string;
}

export function Rule({ className = "" }: RuleProps) {
  return <hr className={`m-0 border-0 border-t border-ink ${className}`} />;
}
