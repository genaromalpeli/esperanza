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
        maxWidth: '680px',
        margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: '38px',
          fontWeight: 700,
          color: '#e2e2e2',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {t.whyTitle1}{' '}
        <span style={{ color: '#c9a84c' }}>{t.whyHope}</span>
        {t.whyTitle2}
      </h1>

      {/* Personal story */}
      <div
        style={{
          background: '#141414',
          borderLeft: '3px solid #c9a84c',
          borderRadius: '0 12px 12px 0',
          padding: '24px 28px',
        }}
      >
        {t.whyStory.map((para, i) => (
          <p
            key={i}
            style={{
              margin: i < t.whyStory.length - 1 ? '0 0 14px' : 0,
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#ccc',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Laplace definition */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '16px',
          }}
        >
          {t.whyLaplaceTitle}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#aaa', fontFamily: 'var(--font-dm-sans)', margin: 0 }}>
          <em style={{ color: '#e2e2e2' }}>&ldquo;{t.whyLaplaceBody}&rdquo;</em>
        </p>
      </div>

      {/* Equation */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '20px',
          }}
        >
          {t.whyEquationTitle}
        </h2>

        <div
          style={{
            background: '#141414',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '28px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '22px',
              color: '#c9a84c',
              textAlign: 'center',
              marginBottom: '24px',
              letterSpacing: '0.02em',
            }}
          >
            E = Σ P(i)·V(i) − Σ P(j)·C(j)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {t.whyVarItems.map(({ sym, desc }) => (
              <div key={sym} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '13px',
                    color: '#c9a84c',
                    width: '44px',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}
                >
                  {sym}
                </span>
                <span style={{ fontSize: '14px', color: '#888', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.5 }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#666', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.6, margin: 0 }}>
          {t.whyEquationNote}
        </p>
      </div>

      {/* Levers */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#e2e2e2',
            marginBottom: '20px',
          }}
        >
          {t.whyLeversTitle}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {t.whyLevers.map(({ sym, title, desc }) => (
            <div
              key={sym}
              style={{
                background: '#141414',
                border: '1px solid #222',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '13px',
                  color: '#c9a84c',
                  width: '44px',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}
              >
                {sym}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#e2e2e2',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, fontFamily: 'var(--font-dm-sans)' }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: '28px',
            fontSize: '16px',
            color: '#e2e2e2',
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#c9a84c' }}>{t.whyHope.charAt(0).toUpperCase() + t.whyHope.slice(1)}</span>{' '}
          {t.whyClosing.replace(/^(hope|esperanza)\s*/i, '')}
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onCalc}
          style={{
            background: '#c9a84c',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'var(--font-dm-sans)',
            cursor: 'pointer',
            letterSpacing: '0.01em',
            transition: 'background 0.15s, transform 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#d4b460'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {t.whyCTA}
        </button>
      </div>
    </div>
  )
}
