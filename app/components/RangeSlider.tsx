'use client'

interface Props {
  value: number
  min: number
  max: number
  step: number
  color: string
  onChange: (v: number) => void
}

export default function RangeSlider({ value, min, max, step, color, onChange }: Props) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{
        width: '100%',
        background: `linear-gradient(to right, ${color} ${pct}%, var(--border) ${pct}%)`,
      }}
    />
  )
}
