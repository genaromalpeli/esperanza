'use client'

import { Lang } from '@/types'
import { tr } from '@/app/translations'

interface Props {
  lang: Lang
  onCalc: () => void
}

export default function WhyTab({ lang, onCalc }: Props) {
  const t = tr(lang)

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '38px',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 12px',
            lineHeight: 1.2,
          }}
        >
          {t.whyTitle1}
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-mid)', fontFamily: 'var(--font-dm-sans)', margin: 0 }}>
          {t.whyLaplaceTitle}
        </p>
      </div>

      {/* Story */}
      <div
        style={{
          background: '#fff',
          borderRadius: 'var(--radius)',
          padding: '28px 32px',
          boxShadow: 'var(--shadow)',
          borderLeft: '4px solid var(--purple)',
        }}
      >
        {t.whyStory.map((para, i) => (
          <p
            key={i}
            style={{
              margin: i < t.whyStory.length - 1 ? '0 0 14px' : 0,
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--text)',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Formula card */}
      <div
        style={{
          background: 'var(--purple)',
          borderRadius: 'var(--radius)',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-ibm-mono)',
            fontSize: '24px',
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: '24px',
          }}
        >
          E = Σ P(i)·V(i) − Σ P(j)·C(j)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          {t.whyVarItems.map(({ sym, desc }) => (
            <div key={sym} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  width: '44px',
                  flexShrink: 0,
                  paddingTop: '1px',
                }}
              >
                {sym}
              </span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.5 }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Laplace definition */}
      <div
        style={{
          background: '#fff',
          borderRadius: 'var(--radius)',
          padding: '28px 32px',
          boxShadow: 'var(--shadow)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '20px',
            color: 'var(--text)',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          {t.whyEquationTitle}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text-mid)', fontFamily: 'var(--font-dm-sans)', margin: 0 }}>
          <em>&ldquo;{t.whyLaplaceBody}&rdquo;</em>
        </p>
      </div>

      {/* Levers */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: 'var(--text)',
            margin: '0 0 16px',
          }}
        >
          {t.whyLeversTitle}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {t.whyLevers.map(({ sym, title, desc }) => {
            const colors: Record<string, { bg: string; text: string }> = {
              'P(i)': { bg: 'var(--green-light)', text: 'var(--green)' },
              'V(i)': { bg: 'var(--purple-light)', text: 'var(--purple)' },
              'P(j)': { bg: 'var(--coral-light)', text: 'var(--coral)' },
              'C(j)': { bg: '#FFF8EC', text: '#E09B20' },
            }
            const c = colors[sym] ?? { bg: 'var(--purple-light)', text: 'var(--purple)' }

            return (
              <div
                key={sym}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    background: c.bg,
                    color: c.text,
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    marginBottom: '10px',
                  }}
                >
                  {sym}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.6, fontFamily: 'var(--font-dm-sans)' }}>
                  {desc}
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-mid)', fontFamily: 'var(--font-dm-sans)', marginTop: '24px', lineHeight: 1.6 }}>
          {t.whyEquationNote}
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onCalc}
          style={{
            background: 'var(--purple)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'var(--font-dm-sans)',
            cursor: 'pointer',
            transition: 'opacity 0.15s, transform 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.88'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {t.whyCTA}
        </button>
      </div>
    </div>
  )
}
