'use client'

import { useState, useCallback } from 'react'
import { Project, TabId, uid } from '@/types'
import Sidebar from './components/Sidebar'
import CalcTab from './components/CalcTab'
import CompareTab from './components/CompareTab'
import WhyTab from './components/WhyTab'

const EXAMPLE_BENEFIT_TOOLTIP = (label: string) =>
  `Ejemplo de beneficio: "${label}". Podés renombrar este ítem, ajustar su probabilidad y valor, o eliminarlo y agregar los tuyos propios.`

const EXAMPLE_COST_TOOLTIP = (label: string) =>
  `Ejemplo de costo/riesgo: "${label}". Podés renombrar este ítem, ajustar su probabilidad y magnitud, o eliminarlo y agregar los tuyos propios.`

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'vefy',
    name: 'Vefy',
    benefits: [
      {
        id: 'b1',
        label: 'Ingreso económico',
        probability: 0.35,
        value: 90,
        tooltip:
          'El dinero concreto que este proyecto puede generarte. ¿Podría cubrir gastos, darte independencia o ser una fuente de ingresos real en los próximos meses?',
      },
      {
        id: 'b2',
        label: 'Sentido / energía',
        probability: 0.7,
        value: 80,
        tooltip:
          'La motivación y energía vital que el proyecto despierta en vos. ¿Te hace sentir vivo? ¿Le encontrás un propósito más allá del resultado económico?',
      },
      {
        id: 'b3',
        label: 'Posicionamiento futuro',
        probability: 0.4,
        value: 75,
        tooltip:
          'Las puertas que este proyecto puede abrirte aunque hoy no genere dinero: reputación, contactos, aprendizaje transferible, presencia en el mercado.',
      },
    ],
    costs: [
      {
        id: 'c1',
        label: 'Frustración',
        probability: 0.5,
        cost: 40,
        tooltip:
          'El costo emocional si el proyecto no sale como esperás. ¿Cuánto te afecta personalmente el fracaso en este caso puntual?',
      },
      {
        id: 'c2',
        label: 'Tiempo perdido',
        probability: 0.6,
        cost: 30,
        tooltip:
          'Las horas y semanas que invertirías y que no podrías recuperar si el proyecto no funciona. ¿Es un costo alto para vos en este momento de tu vida?',
      },
      {
        id: 'c3',
        label: 'Dispersión',
        probability: 0.55,
        cost: 35,
        tooltip:
          'El foco que perdés de otros proyectos o prioridades al dedicarle energía a este. ¿Cuánto te cuesta la distracción en tu contexto actual?',
      },
    ],
  },
  {
    id: 'ejemplo',
    name: 'Proyecto Ejemplo',
    benefits: [
      {
        id: 'eb1',
        label: 'Ingreso económico',
        probability: 0.4,
        value: 80,
        tooltip: EXAMPLE_BENEFIT_TOOLTIP('Ingreso económico'),
      },
      {
        id: 'eb2',
        label: 'Sentido / energía',
        probability: 0.65,
        value: 70,
        tooltip: EXAMPLE_BENEFIT_TOOLTIP('Sentido / energía'),
      },
      {
        id: 'eb3',
        label: 'Posicionamiento futuro',
        probability: 0.45,
        value: 65,
        tooltip: EXAMPLE_BENEFIT_TOOLTIP('Posicionamiento futuro'),
      },
    ],
    costs: [
      {
        id: 'ec1',
        label: 'Frustración',
        probability: 0.5,
        cost: 45,
        tooltip: EXAMPLE_COST_TOOLTIP('Frustración'),
      },
      {
        id: 'ec2',
        label: 'Tiempo perdido',
        probability: 0.55,
        cost: 35,
        tooltip: EXAMPLE_COST_TOOLTIP('Tiempo perdido'),
      },
      {
        id: 'ec3',
        label: 'Dispersión / desenfoque',
        probability: 0.5,
        cost: 30,
        tooltip: EXAMPLE_COST_TOOLTIP('Dispersión / desenfoque'),
      },
    ],
  },
]

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [activeId, setActiveId] = useState<string>('vefy')
  const [activeTab, setActiveTab] = useState<TabId>('calc')

  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0]

  const updateProject = useCallback((updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }, [])

  const addProject = useCallback(() => {
    const newProject: Project = {
      id: uid(),
      name: 'Nuevo proyecto',
      benefits: [],
      costs: [],
    }
    setProjects((prev) => [...prev, newProject])
    setActiveId(newProject.id)
    setActiveTab('calc')
  }, [])

  const deleteProject = useCallback(
    (id: string) => {
      setProjects((prev) => {
        const next = prev.filter((p) => p.id !== id)
        if (next.length === 0) return prev
        if (activeId === id) setActiveId(next[0].id)
        return next
      })
    },
    [activeId],
  )

  const selectProject = useCallback((id: string) => {
    setActiveId(id)
    setActiveTab('calc')
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* App header */}
      <header
        style={{
          borderBottom: '1px solid #1e1e1e',
          padding: '0 24px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#0a0a0a',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ibm-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            opacity: 0.8,
          }}
        >
          Calculadora Laplace
        </span>
        <span style={{ color: '#2a2a2a', fontSize: '14px' }}>·</span>
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#aaa',
          }}
        >
          Calculá tu{' '}
          <span style={{ color: '#c9a84c' }}>esperanza</span>
        </span>
      </header>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Sidebar — always visible */}
        <Sidebar
          projects={projects}
          activeId={activeId}
          onSelect={selectProject}
          onAdd={addProject}
          onDelete={deleteProject}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          {/* Tab nav */}
          <TabNav activeTab={activeTab} onTab={setActiveTab} />

          {/* Tab content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '0 0 80px 0' }}>
            {activeTab === 'calc' && (
              <CalcTab project={activeProject} onUpdate={updateProject} />
            )}
            {activeTab === 'compare' && (
              <CompareTab projects={projects} onSelect={selectProject} />
            )}
            {activeTab === 'why' && <WhyTab onCalc={() => setActiveTab('calc')} />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #1e1e1e',
          padding: '12px 24px',
          textAlign: 'center',
          color: '#333',
          fontFamily: 'var(--font-ibm-mono)',
          fontSize: '11px',
          letterSpacing: '0.02em',
        }}
      >
        E = Σ P(i)·V(i) − Σ P(j)·C(j) · Laplace, Théorie analytique des probabilités
      </footer>
    </div>
  )
}

function TabNav({ activeTab, onTab }: { activeTab: TabId; onTab: (t: TabId) => void }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'calc', label: 'Calculá' },
    { id: 'compare', label: 'Comparar' },
    { id: 'why', label: '¿Por qué?' },
  ]

  return (
    <nav
      style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid #2a2a2a',
        background: '#0e0e0e',
        padding: '0 24px',
        flexShrink: 0,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '16px 20px',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '14px',
            fontWeight: activeTab === t.id ? 600 : 400,
            color: activeTab === t.id ? '#e2e2e2' : '#666',
            borderBottom: activeTab === t.id ? '2px solid #c9a84c' : '2px solid transparent',
            transition: 'all 0.15s ease',
            marginBottom: '-1px',
          }}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
