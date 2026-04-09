'use client'

import { Project, Lang, calcE, eColor } from '@/types'
import { tr } from '@/app/translations'

interface Props {
  projects: Project[]
  lang: Lang
  onSelect: (id: string) => void
}

export default function CompareTab({ projects, lang, onSelect }: Props) {
  const t = tr(lang)
  const sorted = [...projects]
    .map((p) => ({ project: p, ...calcE(p) }))
    .sort((a, b) => b.E - a.E)

  const maxAbsE = Math.max(...sorted.map((s) => Math.abs(s.E)), 1)

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        {sorted.map(({ project, E, bSum, cSum }, i) => {
          const color = eColor(E)
          const isBest = i === 0
          const total = bSum + cSum || 1

          return (
            <div
              key={project.id}
              onClick={() => onSelect(project.id)}
              style={{
                background: '#141414',
                border: isBest ? `1px solid ${color}40` : '1px solid #222',
                borderRadius: '14px',
                padding: '24px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = color + '60'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = isBest ? color + '40' : '#222'
              }}
            >
              {isBest && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '16px',
                    background: color,
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {t.bestBadge}
                </div>
              )}

              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  fontSize: '18px',
                  color: '#e2e2e2',
                  marginBottom: '12px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.name}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '40px',
                  fontWeight: 600,
                  color,
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {E > 0 ? '+' : ''}
                {E.toFixed(1)}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <MiniBar label="B" value={bSum} total={total} color="#8ec9a0" />
                <MiniBar label="C" value={cSum} total={total} color="#e8716b" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Ranking */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#666',
            marginBottom: '20px',
          }}
        >
          {t.rankingTitle}
        </h2>
        <div
          style={{
            background: '#141414',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {sorted.map(({ project, E }) => {
            const color = eColor(E)
            const pct = (Math.abs(E) / maxAbsE) * 45

            return (
              <div key={project.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '130px',
                    flexShrink: 0,
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '13px',
                    color: '#aaa',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.name}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', height: '20px' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {E < 0 && (
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '8px',
                          background: color,
                          borderRadius: '4px 0 0 4px',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '2px', height: '20px', background: '#333', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    {E >= 0 && (
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '8px',
                          background: color,
                          borderRadius: '0 4px 4px 0',
                        }}
                      />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '13px',
                    color,
                    width: '52px',
                    flexShrink: 0,
                  }}
                >
                  {E > 0 ? '+' : ''}
                  {E.toFixed(1)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MiniBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = (value / total) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '10px', color: '#444', width: '12px' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '10px', color: '#555', width: '28px', textAlign: 'right' }}>
        {value.toFixed(0)}
      </span>
    </div>
  )
}
