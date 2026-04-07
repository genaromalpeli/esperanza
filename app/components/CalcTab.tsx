'use client'

import { Project, Benefit, Cost, Lang, calcE, uid } from '@/types'
import { tr, eLabel } from '@/app/translations'
import ItemRow from './ItemRow'

interface Props {
  project: Project
  lang: Lang
  onUpdate: (p: Project) => void
}

export default function CalcTab({ project, lang, onUpdate }: Props) {
  const t = tr(lang)
  const { bSum, cSum, E } = calcE(project)
  const interpretation = eLabel(E, lang)
  const total = bSum + cSum || 1
  const bPct = (bSum / total) * 100
  const cPct = (cSum / total) * 100

  const eColorVar = E >= 20 ? 'var(--green)' : E >= 0 ? '#F5A623' : 'var(--coral)'
  const eBgVar = E >= 20 ? 'var(--green-light)' : E >= 0 ? '#FEF9EC' : 'var(--coral-light)'

  const updateName = (name: string) => onUpdate({ ...project, name })

  const updateBenefit = (b: Benefit) =>
    onUpdate({ ...project, benefits: project.benefits.map((x) => (x.id === b.id ? b : x)) })
  const removeBenefit = (id: string) =>
    onUpdate({ ...project, benefits: project.benefits.filter((x) => x.id !== id) })
  const addBenefit = () =>
    onUpdate({
      ...project,
      benefits: [
        ...project.benefits,
        { id: uid(), label: t.newBenefitLabel, probability: 0.5, value: 50, tooltip: '' },
      ],
    })

  const updateCost = (c: Cost) =>
    onUpdate({ ...project, costs: project.costs.map((x) => (x.id === c.id ? c : x)) })
  const removeCost = (id: string) =>
    onUpdate({ ...project, costs: project.costs.filter((x) => x.id !== id) })
  const addCost = () =>
    onUpdate({
      ...project,
      costs: [
        ...project.costs,
        { id: uid(), label: t.newCostLabel, probability: 0.5, cost: 50, tooltip: '' },
      ],
    })

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: '24px',
        padding: '32px',
        minHeight: '100%',
        alignItems: 'start',
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Project name */}
        <input
          type="text"
          value={project.name}
          onChange={(e) => updateName(e.target.value)}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '28px',
            fontStyle: 'italic',
            fontWeight: 700,
            color: 'var(--text)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            borderBottom: '2px solid transparent',
            paddingBottom: '4px',
            width: '100%',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          placeholder={t.projectPlaceholder}
        />

        {/* Benefits card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius)',
            padding: '24px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <SectionHeader title={t.sectionBenefits} color="var(--green)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {project.benefits.map((b) => (
              <ItemRow
                key={b.id}
                type="benefit"
                id={b.id}
                standardId={b.standardId}
                label={b.label}
                probability={b.probability}
                valueOrCost={b.value}
                tooltip={b.tooltip}
                lang={lang}
                onLabelChange={(v) => updateBenefit({ ...b, label: v })}
                onProbChange={(v) => updateBenefit({ ...b, probability: v })}
                onValueChange={(v) => updateBenefit({ ...b, value: v })}
                onTooltipChange={(v) => updateBenefit({ ...b, tooltip: v })}
                onRemove={() => removeBenefit(b.id)}
              />
            ))}
          </div>
          <AddButton onClick={addBenefit} label={t.addBenefit} color="var(--green)" />
        </div>

        {/* Costs card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius)',
            padding: '24px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <SectionHeader title={t.sectionCosts} color="var(--coral)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {project.costs.map((c) => (
              <ItemRow
                key={c.id}
                type="cost"
                id={c.id}
                standardId={c.standardId}
                label={c.label}
                probability={c.probability}
                valueOrCost={c.cost}
                tooltip={c.tooltip}
                lang={lang}
                onLabelChange={(v) => updateCost({ ...c, label: v })}
                onProbChange={(v) => updateCost({ ...c, probability: v })}
                onValueChange={(v) => updateCost({ ...c, cost: v })}
                onTooltipChange={(v) => updateCost({ ...c, tooltip: v })}
                onRemove={() => removeCost(c.id)}
              />
            ))}
          </div>
          <AddButton onClick={addCost} label={t.addCost} color="var(--coral)" />
        </div>
      </div>

      {/* RIGHT COLUMN — sticky result card */}
      <div style={{ position: 'sticky', top: '32px' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius)',
            padding: '28px',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-dm-sans)',
              marginBottom: '16px',
            }}
          >
            {t.resultsLabel}
          </div>

          {/* E value */}
          <div
            style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '64px',
              fontWeight: 700,
              color: eColorVar,
              lineHeight: 1,
              marginBottom: '12px',
            }}
          >
            {E > 0 ? '+' : ''}
            {E.toFixed(1)}
          </div>

          {/* Viability badge */}
          <div
            style={{
              display: 'inline-block',
              background: eBgVar,
              color: eColorVar,
              borderRadius: '20px',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-dm-sans)',
              marginBottom: '24px',
            }}
          >
            {interpretation}
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                height: '8px',
                borderRadius: '4px',
                background: 'var(--border)',
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: `${bPct}%`,
                  background: 'var(--green)',
                  transition: 'width 0.3s ease',
                }}
              />
              <div
                style={{
                  width: `${cPct}%`,
                  background: 'var(--coral)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: 'var(--font-dm-sans)', marginBottom: '2px' }}>
                  {t.weightedBenefit}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-ibm-mono)' }}>
                  +{bSum.toFixed(1)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: 'var(--font-dm-sans)', marginBottom: '2px' }}>
                  {t.weightedCost}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--coral)', fontFamily: 'var(--font-ibm-mono)' }}>
                  -{cSum.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '13px',
              color: 'var(--text-mid)',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            E = {bSum.toFixed(1)} − {cSum.toFixed(1)} ={' '}
            <span style={{ color: eColorVar, fontWeight: 700 }}>
              {E > 0 ? '+' : ''}{E.toFixed(1)}
            </span>
          </div>

          {/* Save button */}
          <button
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--purple)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--font-dm-sans)',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {t.saveResults}
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '4px', height: '20px', background: color, borderRadius: '2px' }} />
      <h2
        style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--text)',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        {title}
      </h2>
    </div>
  )
}

function AddButton({ onClick, label, color }: { onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '14px',
        background: 'none',
        border: `1.5px dashed ${color}60`,
        borderRadius: '8px',
        padding: '8px 16px',
        color: color,
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 500,
        transition: 'all 0.15s',
        width: '100%',
        opacity: 0.7,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
    >
      + {label}
    </button>
  )
}
