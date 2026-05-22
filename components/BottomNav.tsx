'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    label: 'Home',
    href: '/',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    highlight: false,
  },
  {
    label: 'Inzichten',
    href: '/inzichten',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    highlight: false,
  },
  {
    label: 'Analyse',
    href: '/analyse',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    highlight: true,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      aria-label="Mobiele navigatie"
    >
      {/* Blur achtergrond */}
      <div className="absolute inset-0 bg-[#F5F0E8]/95 backdrop-blur-md border-t border-[#E8E0D4]" />

      <div className="relative flex items-center justify-around px-2 pt-2 pb-4">
        {items.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)

          if (item.highlight && !isActive) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 min-w-[64px] py-1 px-3 rounded-xl transition-all"
              >
                <div className="bg-[#C4603A] rounded-full p-2" style={{ color: 'white' }}>
                  {item.icon(false)}
                </div>
                <span className="text-[10px] font-medium text-[#C4603A]">
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 min-w-[64px] py-1 px-3 rounded-xl transition-all"
              style={{ color: isActive ? '#1C3A2A' : '#8A9E8E' }}
            >
              <span>{item.icon(isActive)}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 rounded-full bg-[#1C3A2A]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
