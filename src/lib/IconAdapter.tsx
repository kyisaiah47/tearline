export type IconName = string;

/** Text-only compatibility for older shared consumers; no icon artwork. */
export default function AgentShellIcon({ name, className }: { name: string; className?: string }) {
  return <span className={className}>{name}</span>;
}
