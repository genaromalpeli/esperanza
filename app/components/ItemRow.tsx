'use client'

import { useState } from 'react'
import RangeSlider from './RangeSlider'

interface Props {
  type: 'benefit' | 'cost'
  id: string
  label: string
  probability: number
  valueOrCost: number
  tooltip: string
  onLabelChange: (v: string) => void
  onProbChange: (v: number) => void
  onValueChange: (v: number) => void
  onTooltipChange: (v: string) => void
  onRemove: () => void
}

export default function ItemRow({
  type,
  label,
  probability,
  valueOrCost,
  tooltip,
  onLabelChange,
  onProbChange,
  onValueChange,
  onTooltipChange,
  onRemove,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [editingTooltip, setEditingTooltip] = useState(false)
  const impact = probability * valueOrCost
  const accentColor = type === 'benefit' ? '#8ec9a0' : '#e8716b'

  return (
    <div
      style={{
        background: '#141414',
        border: '1px solid #222',
        borderRadius: '10px',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Top row: tooltip icon + label + impact + delete */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Tooltip trigger */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onMouseEnter={(e) => {
              if (!editingTooltip) setShowTooltip(true)
              e.currentTarget.style.color = '#c9a84c'
              e.currentTarget.style.borderColor = '#c9a84c'
            }}
            onMouseLeave={(e) => {
              setShowTooltip(false)
              e.currentTarget.style.color = '#555'
              e.currentTarget.style.borderColor = '#333'
            }}
            onClick={() => {
              setEditingTooltip((v) => !v)
              setShowTooltip(false)
            }}
            style={{
              background: 'none',
              border: '1px solid #333',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#555',
              fontSize: '11px',
              fontWeight: 700,
              flexShrink: 0,
              transition: 'border-color 0.15s, color 0.15s',
            }}
            title="Ver / editar nota"
          >
            ?
          </button>

          {/* Hover tooltip */}
          {showTooltip && tooltip && (
            <div
              style={{
                position: 'absolute',
                left: '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '10px 12px',
                maxWidth: '280px',
                minWidth: '180px',
                fontSize: '12px',
                color: '#aaa',
                lineHeight: 1.5,
                zIndex: 100,
                pointerEvents: 'none',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {tooltip}
            </div>
          )}
        </div>

        {/* Label */}
        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e2e2e2',
            fontSize: '14px',
            fontFamily: 'var(--font-dm-sans)',
            minWidth: 0,
          }}
          placeholder="Nombre del ítem"
        />

        {/* Impact */}
        <div
          style={{
            fontFamily: 'var(--font-ibm-mono)',
            fontSize: '14px',
            fontWeight: 500,
            color: accentColor,
            flexShrink: 0,
            minWidth: '40px',
            textAlign: 'right',
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
            color: '#333',
            fontSize: '18px',
            lineHeight: 1,
            padding: '2px 4px',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#e8716b')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
          title="Eliminar"
        >
          ×
        </button>
      </div>

      {/* Tooltip editor */}
      {editingTooltip && (
        <div style={{ paddingLeft: '28px' }}>
          <textarea
            value={tooltip}
            onChange={(e) => onTooltipChange(e.target.value)}
            placeholder="Agregá una nota o contexto para este ítem..."
            style={{
              width: '100%',
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '6px',
              padding: '8px 10px',
              color: '#aaa',
              fontSize: '12px',
              fontFamily: 'var(--font-dm-sans)',
              resize: 'vertical',
              minHeight: '60px',
              outline: 'none',
              lineHeight: 1.5,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#444')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
          />
        </div>
      )}

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '28px' }}>
        <SliderRow
          label="probabilidad"
          value={probability}
          min={0}
          max={1}
          step={0.01}
          display={`${Math.round(probability * 100)}%`}
          color={accentColor}
          onChange={onProbChange}
        />
        <SliderRow
          label={type === 'benefit' ? 'valor' : 'costo'}
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
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          fontSize: '11px',
          color: '#555',
          fontFamily: 'var(--font-ibm-mono)',
          letterSpacing: '0.04em',
          width: '80px',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1 }}>
        <RangeSlider value={value} min={min} max={max} step={step} color={color} onChange={onChange} />
      </div>
      <span
        style={{
          fontSize: '12px',
          fontFamily: 'var(--font-ibm-mono)',
          color: '#888',
          width: '36px',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {display}
      </span>
    </div>
  )
}
