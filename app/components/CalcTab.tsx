'use client'

import { Project, Benefit, Cost, calcE, eColor, eLabel, uid } from '@/types'
import ItemRow from './ItemRow'
import LeversPanel from './LeversPanel'

interface Props {
  project: Project
  onUpdate: (p: Project) => void
}

export default function CalcTab({ project, onUpdate }: Props) {
  const { bSum, cSum, E } = calcE(project)
  const color = eColor(E)
  const label = eLabel(E)
  const total = bSum + cSum || 1

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
        { id: uid(), label: 'Nuevo beneficio', probability: 0.5, value: 50, tooltip: '' },
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
        { id: uid(), label: 'Nuevo costo', probability: 0.5, cost: 50, tooltip: '' },
      ],
    })

  return (
    <div
      style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Project name */}
      <div>
        <input
          type="text"
          value={project.name}
          onChange={(e) => updateName(e.target.value)}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '28px',
            fontStyle: 'italic',
            color: '#e2e2e2',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            borderBottom: '1px solid transparent',
            paddingBottom: '4px',
            width: '100%',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#2a2a2a')}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          placeholder="Nombre del proyecto"
        />
      </div>

      {/* E display card */}
      <div
        style={{
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '16px',
          padding: '32px',
        }}
      >
        {/* Big E number */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '72px',
              fontWeight: 600,
              color,
              lineHeight: 1,
              transition: 'color 0.3s',
            }}
          >
            {E > 0 ? '+' : ''}
            {E.toFixed(1)}
          </div>
          <div
            style={{
              marginTop: '12px',
              fontSize: '15px',
              color: '#888',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {label}
          </div>
        </div>

        {/* Progress bar: bSum vs cSum */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              height: '8px',
              borderRadius: '4px',
              background: '#2a2a2a',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: `${(bSum / total) * 100}%`,
                background: '#8ec9a0',
                borderRadius: '4px 0 0 4px',
                transition: 'width 0.3s ease',
              }}
            />
            <div
              style={{
                width: `${(cSum / total) * 100}%`,
                background: '#e8716b',
                borderRadius: '0 4px 4px 0',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-ibm-mono)',
              color: '#666',
            }}
          >
            <span style={{ color: '#8ec9a0' }}>beneficios {bSum.toFixed(1)}</span>
            <span style={{ color: '#e8716b' }}>costos {cSum.toFixed(1)}</span>
          </div>
        </div>

        {/* Formula */}
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-ibm-mono)',
            fontSize: '14px',
            color: '#555',
          }}
        >
          E = {bSum.toFixed(1)} − {cSum.toFixed(1)} ={' '}
          <span style={{ color }}>{E > 0 ? '+' : ''}{E.toFixed(1)}</span>
        </div>
      </div>

      {/* Benefits */}
      <section>
        <SectionHeader title="Beneficios" color="#8ec9a0" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {project.benefits.map((b) => (
            <ItemRow
              key={b.id}
              type="benefit"
              id={b.id}
              label={b.label}
              probability={b.probability}
              valueOrCost={b.value}
              tooltip={b.tooltip}
              onLabelChange={(v) => updateBenefit({ ...b, label: v })}
              onProbChange={(v) => updateBenefit({ ...b, probability: v })}
              onValueChange={(v) => updateBenefit({ ...b, value: v })}
              onTooltipChange={(v) => updateBenefit({ ...b, tooltip: v })}
              onRemove={() => removeBenefit(b.id)}
            />
          ))}
        </div>
        <AddButton onClick={addBenefit} label="agregar beneficio" />
      </section>

      {/* Costs */}
      <section>
        <SectionHeader title="Costos" color="#e8716b" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {project.costs.map((c) => (
            <ItemRow
              key={c.id}
              type="cost"
              id={c.id}
              label={c.label}
              probability={c.probability}
              valueOrCost={c.cost}
              tooltip={c.tooltip}
              onLabelChange={(v) => updateCost({ ...c, label: v })}
              onProbChange={(v) => updateCost({ ...c, probability: v })}
              onValueChange={(v) => updateCost({ ...c, cost: v })}
              onTooltipChange={(v) => updateCost({ ...c, tooltip: v })}
              onRemove={() => removeCost(c.id)}
            />
          ))}
        </div>
        <AddButton onClick={addCost} label="agregar costo" />
      </section>

      {/* Levers panel */}
      <LeversPanel project={project} />
    </div>
  )
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '3px', height: '18px', background: color, borderRadius: '2px' }} />
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
        {title}
      </h2>
    </div>
  )
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '10px',
        background: 'none',
        border: '1px dashed #2a2a2a',
        borderRadius: '8px',
        padding: '8px 16px',
        color: '#555',
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: 'var(--font-dm-sans)',
        transition: 'all 0.15s',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#c9a84c'
        e.currentTarget.style.borderColor = '#c9a84c40'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#555'
        e.currentTarget.style.borderColor = '#2a2a2a'
      }}
    >
      + {label}
    </button>
  )
}
