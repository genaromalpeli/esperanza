'use client'

import { useState } from 'react'
import { Lang } from '@/types'
import { tr } from '@/app/translations'
import RangeSlider from './RangeSlider'

interface Props {
  type: 'benefit' | 'cost'
  id: string
  standardId?: string
  label: string
  probability: number
  valueOrCost: number
  tooltip: string
  lang: Lang
  onLabelChange: (v: string) => void
  onProbChange: (v: number) => void
  onValueChange: (v: number) => void
  onTooltipChange: (v: string) => void
  onRemove: () => void
}

export default function ItemRow({
  type,
  standardId,
  label,
  probability,
  valueOrCost,
  tooltip,
  lang,
  onLabelChange,
  onProbChange,
  onValueChange,
  onTooltipChange,
  onRemove,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [editingTooltip, setEditingTooltip] = useState(false)

  const t = tr(lang)
  const isStandard = !!standardId

  const resolvedLabel = isStandard
    ? type === 'benefit'
      ? t.standardBenefits[standardId!]?.label ?? label
      : t.standardCosts[standardId!]?.label ?? label
    : label

  const resolvedTooltip = isStandard
    ? type === 'benefit'
      ? t.standardBenefits[standardId!]?.tooltip ?? ''
      : t.standardCosts[standardId!]?.tooltip ?? ''
    : tooltip

  const accentColor = type === 'benefit' ? 'var(--green)' : 'var(--coral)'
  const accentBg = type === 'benefit' ? 'var(--green-light)' : 'var(--coral-light)'
  const impact = probability * valueOrCost
  const valueLabel = type === 'benefit' ? t.labelValue : t.labelCost
  const probLabel = type === 'benefit' ? t.labelProbability : t.labelProbabilityCost

  return (
    <div
      style={{
        background: 'var(--bg)',
        borderRadius: '12px',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: '1px solid var(--border)',
      }}
    >
      {/* Top row: tooltip icon + label + impact + delete */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Tooltip icon */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => {
              if (!isStandard) {
                setEditingTooltip((v) => !v)
                setShowTooltip(false)
              }
            }}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isStandard ? 'default' : 'pointer',
              color: 'var(--text-light)',
              fontSize: '11px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ?
          </button>

          {showTooltip && resolvedTooltip && (
            <div
              style={{
                position: 'absolute',
                left: '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 12px',
                maxWidth: '260px',
                minWidth: '180px',
                fontSize: '12px',
                color: 'var(--text-mid)',
                lineHeight: 1.6,
                zIndex: 100,
                pointerEvents: 'none',
                fontFamily: 'var(--font-dm-sans)',
                boxShadow: 'var(--shadow)',
              }}
            >
              {resolvedTooltip}
            </div>
          )}
        </div>

        {/* Label */}
        {isStandard ? (
          <div
            style={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text)',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {resolvedLabel}
          </div>
        ) : (
          <input
            type="text"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'var(--font-dm-sans)',
              minWidth: 0,
            }}
            placeholder={type === 'benefit' ? t.newBenefitLabel : t.newCostLabel}
          />
        )}

        {/* Impact pill */}
        <div
          style={{
            background: accentBg,
            color: accentColor,
            borderRadius: '20px',
            padding: '3px 10px',
            fontFamily: 'var(--font-ibm-mono)',
            fontSize: '13px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {impact.toFixed(1)}
        </div>

        {/* Delete */}
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-light)',
            fontSize: '18px',
            lineHeight: 1,
            padding: '2px 4px',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--coral)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-light)')}
          title="Remove"
        >
          ×
        </button>
      </div>

      {/* Custom tooltip editor */}
      {!isStandard && editingTooltip && (
        <div style={{ paddingLeft: '28px' }}>
          <textarea
            value={tooltip}
            onChange={(e) => onTooltipChange(e.target.value)}
            placeholder={t.tooltipEditHint}
            style={{
              width: '100%',
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 10px',
              color: 'var(--text)',
              fontSize: '12px',
              fontFamily: 'var(--font-dm-sans)',
              resize: 'vertical',
              minHeight: '60px',
              outline: 'none',
              lineHeight: 1.5,
            }}
          />
        </div>
      )}

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '28px' }}>
        <SliderRow
          label={probLabel}
          value={probability}
          min={0}
          max={1}
          step={0.01}
          display={`${Math.round(probability * 100)}%`}
          color={accentColor}
          lowLabel={lang === 'es' ? 'Improbable' : 'Unlikely'}
          highLabel={lang === 'es' ? 'Casi Seguro' : 'Almost Sure'}
          onChange={onProbChange}
        />
        <SliderRow
          label={valueLabel}
          value={valueOrCost}
          min={0}
          max={100}
          step={1}
          display={valueOrCost.toString()}
          color={accentColor}
          onChange={onValueChange}
        />
      </div>
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  color,
  lowLabel,
  highLabel,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  color: string
  lowLabel?: string
  highLabel?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontFamily: 'var(--font-ibm-mono)',
            fontWeight: 600,
            color: color,
          }}
        >
          {display}
        </span>
      </div>
      <RangeSlider value={value} min={min} max={max} step={step} color={color} onChange={onChange} />
      {lowLabel && highLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-light)', fontFamily: 'var(--font-dm-sans)' }}>
            {lowLabel}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)', fontFamily: 'var(--font-dm-sans)' }}>
            {highLabel}
          </span>
        </div>
      )}
    </div>
  )
}
