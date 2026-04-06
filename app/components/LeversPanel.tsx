'use client'

import { Project } from '@/types'

interface Props {
  project: Project
}

interface LeverItem {
  label: string
  impact: number
  type: 'benefit' | 'cost'
}

export default function LeversPanel({ project }: Props) {
  const items: LeverItem[] = [
    ...project.benefits.map((b) => ({
      label: b.label,
      impact: b.probability * b.value,
      type: 'benefit' as const,
    })),
    ...project.costs.map((c) => ({
      label: c.label,
      impact: c.probability * c.cost,
      type: 'cost' as const,
    })),
  ].sort((a, b) => b.impact - a.impact)

  if (items.length === 0) return null

  const maxImpact = items[0]?.impact ?? 1

  return (
    <section>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{ width: '3px', height: '18px', background: '#c9a84c', borderRadius: '2px' }}
        />
        <h2
          style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Palancas
        </h2>
        <span
          style={{ fontSize: '12px', color: '#444', fontFamily: 'var(--font-dm-sans)' }}
        >
          · ordenadas por impacto
        </span>
      </div>

      <div
        style={{
          background: '#141414',
          border: '1px solid #222',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {items.map((item, i) => {
          const color = item.type === 'benefit' ? '#8ec9a0' : '#e8716b'
          const pct = (item.impact / maxImpact) * 100

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: '#555',
                  fontFamily: 'var(--font-ibm-mono)',
                  width: '16px',
                  flexShrink: 0,
                  textAlign: 'right',
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#aaa',
                  width: '160px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {item.label}
              </div>
              <div style={{ flex: 1, position: 'relative', height: '6px' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#222',
                    borderRadius: '3px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${pct}%`,
                    background: color,
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '12px',
                  color,
                  width: '36px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {item.impact.toFixed(1)}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
