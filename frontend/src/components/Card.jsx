export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-[#151622] border border-white/5 rounded-xl p-5 ${className}`}>
      {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
      {subtitle && <p className="text-xs text-gray-500 mt-0.5 mb-3">{subtitle}</p>}
      {children}
    </div>
  )
}
