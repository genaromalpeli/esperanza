'use client'

import { Project, TabId, Lang, calcE } from '@/types'
import { tr } from '@/app/translations'

interface Props {
  projects: Project[]
  activeId: string
  activeTab: TabId
  lang: Lang
  onSelect: (id: string) => void
  onAdd: () => void
  onDelete: (id: string) => void
  onTab: (t: TabId) => void
  onToggleLang: () => void
}

export default function Sidebar({
  projects,
  activeId,
  activeTab,
  lang,
  onSelect,
  onAdd,
  onDelete,
  onTab,
  onToggleLang,
}: Props) {
  const t = tr(lang)

  const navItems: { id: TabId; label: string; icon: string }[] = [
    { id: 'calc', label: t.tabCalc, icon: '⊞' },
    { id: 'compare', label: t.tabCompare, icon: '▐▐' },
    { id: 'why', label: t.tabWhy, icon: '?' },
  ]

  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '24px 20px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '16px',
            flexShrink: 0,
          }}
        >
          ⊞
        </div>
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--purple)',
          }}
        >
          Soft &amp; Táctil
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'var(--purple)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-mid)',
                width: '100%',
                textAlign: 'left',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', opacity: isActive ? 1 : 0.6 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '16px 12px' }} />

      {/* Projects label */}
      <div
        style={{
          padding: '0 20px 8px',
          fontSize: '11px',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
        }}
      >
        {t.sidebarLabel}
      </div>

      {/* Projects list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
        {projects.map((p) => {
          const { E } = calcE(p)
          const isActive = p.id === activeId
          const dotColor = E >= 20 ? 'var(--green)' : E >= 0 ? '#F5A623' : 'var(--coral)'

          return (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                cursor: 'pointer',
                background: isActive ? 'var(--purple-light)' : 'transparent',
                marginBottom: '2px',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: dotColor,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  flex: 1,
                  fontSize: '14px',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--purple)' : 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {p.name}
              </div>

              {projects.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(p.id)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-light)',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '2px 4px',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                  title="Delete"
                >
                  ×
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Add project button */}
      <div style={{ padding: '12px 8px' }}>
        <button
          onClick={onAdd}
          style={{
            width: '100%',
            padding: '10px',
            background: 'none',
            border: '1.5px dashed var(--border)',
            borderRadius: '10px',
            color: 'var(--text-mid)',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'var(--font-dm-sans)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--purple)'
            e.currentTarget.style.color = 'var(--purple)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-mid)'
          }}
        >
          + {t.sidebarNew}
        </button>
      </div>

      {/* Language toggle */}
      <div style={{ padding: '0 8px 20px' }}>
        <button
          onClick={onToggleLang}
          style={{
            width: '100%',
            padding: '8px',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-light)',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-dm-sans)',
            letterSpacing: '0.04em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--purple)'
            e.currentTarget.style.color = 'var(--purple)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-light)'
          }}
        >
          {t.switchLang}
        </button>
      </div>
    </aside>
  )
}
