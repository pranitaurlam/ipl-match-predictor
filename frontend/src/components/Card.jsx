export default function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <div
      className={`bg-[var(--surface-card)] border border-[var(--border-hairline)] rounded-2xl p-5 transition-colors hover:border-[var(--border-hover)] ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between mb-0.5">
          {title && <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">{title}</h3>}
          {action}
        </div>
      )}
      {subtitle && <p className="text-xs text-[var(--text-muted)] mb-3">{subtitle}</p>}
      {children}
    </div>
  )
}
