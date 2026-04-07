'use client'

import { Project, Lang, calcE } from '@/types'
import { tr, eLabel } from '@/app/translations'

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

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 6px',
          }}
        >
          {t.compareTitle}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-mid)', fontFamily: 'var(--font-dm-sans)', margin: 0 }}>
          {t.compareSubtitle}
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {sorted.map(({ project, E, bSum, cSum }, i) => {
          const eColorVar = E >= 20 ? 'var(--green)' : E >= 0 ? '#F5A623' : 'var(--coral)'
          const eBgVar = E >= 20 ? 'var(--green-light)' : E >= 0 ? '#FEF9EC' : 'var(--coral-light)'
          const isBest = i === 0
          const total = bSum + cSum || 1
          const bPct = (bSum / total) * 100
          const interpretation = eLabel(E, lang)

          return (
            <div
              key={project.id}
              onClick={() => onSelect(project.id)}
              style={{
                background: '#fff',
                borderRadius: 'var(--radius)',
                padding: '24px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                border: isBest ? `2px solid ${eColorVar}40` : '2px solid transparent',
                transition: 'transform 0.15s, box-shadow 0.15s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow)'
              }}
            >
              {/* Best badge */}
              {isBest && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    background: eColorVar,
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {t.bestBadge}
                </div>
              )}

              {/* Project name */}
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.name}
              </div>

              {/* E value */}
              <div
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '44px',
                  fontWeight: 700,
                  color: eColorVar,
                  lineHeight: 1,
                  marginBottom: '10px',
                }}
              >
                {E > 0 ? '+' : ''}{E.toFixed(1)}
              </div>

              {/* Viability badge */}
              <div
                style={{
                  display: 'inline-block',
                  background: eBgVar,
                  color: eColorVar,
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-dm-sans)',
                  marginBottom: '16px',
                }}
              >
                {interpretation}
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: 'var(--border)',
                  overflow: 'hidden',
                  display: 'flex',
                  marginBottom: '10px',
                }}
              >
                <div style={{ width: `${bPct}%`, background: 'var(--green)', transition: 'width 0.3s' }} />
                <div style={{ width: `${100 - bPct}%`, background: 'var(--coral)', transition: 'width 0.3s' }} />
              </div>

              {/* B / C values */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--font-ibm-mono)', fontWeight: 600 }}>
                  +{bSum.toFixed(1)}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--coral)', fontFamily: 'var(--font-ibm-mono)', fontWeight: 600 }}>
                  -{cSum.toFixed(1)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
