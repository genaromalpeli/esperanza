'use client'

import { Project, Lang } from '@/types'
import { tr } from '@/app/translations'

interface Props {
  project: Project
  lang: Lang
}

interface LeverItem {
  label: string
  impact: number
  type: 'benefit' | 'cost'
}

export default function LeversPanel({ project, lang }: Props) {
  const t = tr(lang)

  const items: LeverItem[] = [
    ...project.benefits.map((b) => ({
      label: b.standardId ? (t.standardBenefits[b.standardId]?.label ?? b.label) : b.label,
      impact: b.probability * b.value,
      type: 'benefit' as const,
    })),
    ...project.costs.map((c) => ({
      label: c.standardId ? (t.standardCosts[c.standardId]?.label ?? c.label) : c.label,
      impact: c.probability * c.cost,
      type: 'cost' as const,
    })),
  ].sort((a, b) => b.impact - a.impact)

  if (items.length === 0) return null

  const maxImpact = items[0]?.impact ?? 1

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '4px', height: '20px', background: 'var(--purple)', borderRadius: '2px' }} />
        <h2
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {t.sectionLevers}
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'var(--font-dm-sans)' }}>
          {t.leversSubtitle}
        </span>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {items.map((item, i) => {
          const color = item.type === 'benefit' ? 'var(--green)' : 'var(--coral)'
          const pct = (item.impact / maxImpact) * 100

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-light)',
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
                  color: 'var(--text)',
                  width: '180px',
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
                    inset: 0,
                    background: 'var(--border)',
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
                  color: color,
                  width: '36px',
                  textAlign: 'right',
                  flexShrink: 0,
                  fontWeight: 600,
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
