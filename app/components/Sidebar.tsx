'use client'

import { Project, Lang, calcE, eColor } from '@/types'
import { tr } from '@/app/translations'

interface Props {
  projects: Project[]
  activeId: string
  lang: Lang
  onSelect: (id: string) => void
  onAdd: () => void
  onDelete: (id: string) => void
}

export default function Sidebar({ projects, activeId, lang, onSelect, onAdd, onDelete }: Props) {
  const t = tr(lang)

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        background: '#111111',
        borderRight: '1px solid #2a2a2a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Label + New button at top */}
      <div style={{ padding: '14px 8px 8px' }}>
        <div
          style={{
            padding: '0 8px 8px',
            fontSize: '11px',
            fontFamily: 'var(--font-ibm-mono)',
            color: '#555',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {t.sidebarLabel}
        </div>
        <button
          onClick={onAdd}
          style={{
            width: '100%',
            padding: '9px',
            background: 'none',
            border: '1px dashed #2a2a2a',
            borderRadius: '8px',
            color: '#555',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'var(--font-dm-sans)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#c9a84c'
            e.currentTarget.style.borderColor = '#c9a84c40'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#555'
            e.currentTarget.style.borderColor = '#2a2a2a'
          }}
        >
          {t.sidebarNew}
        </button>
      </div>

      {/* Projects list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 8px' }}>
        {projects.map((p) => {
          const { E } = calcE(p)
          const color = eColor(E)
          const isActive = p.id === activeId

          return (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: isActive ? '#1e1e1e' : 'transparent',
                border: isActive ? '1px solid #2a2a2a' : '1px solid transparent',
                marginBottom: '2px',
                transition: 'background 0.1s',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#e2e2e2' : '#aaa',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '110px',
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-ibm-mono)',
                    color,
                    marginTop: '2px',
                  }}
                >
                  E = {E > 0 ? '+' : ''}
                  {E.toFixed(1)}
                </div>
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
                    color: '#444',
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
    </aside>
  )
}
