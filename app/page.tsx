'use client'

import { useState, useCallback } from 'react'
import { Project, TabId, Lang, uid } from '@/types'
import { tr, STANDARD_BENEFIT_IDS, STANDARD_COST_IDS } from '@/app/translations'
import Sidebar from './components/Sidebar'
import CalcTab from './components/CalcTab'
import CompareTab from './components/CompareTab'
import WhyTab from './components/WhyTab'

function createDefaultProject(name: string): Project {
  return {
    id: uid(),
    name,
    benefits: STANDARD_BENEFIT_IDS.map((sid) => ({
      id: uid(),
      standardId: sid,
      label: '',
      probability: sid === 'economic_income' ? 0.4 : sid === 'sense_energy' ? 0.65 : 0.45,
      value: sid === 'economic_income' ? 80 : sid === 'sense_energy' ? 70 : 65,
      tooltip: '',
    })),
    costs: STANDARD_COST_IDS.map((sid) => ({
      id: uid(),
      standardId: sid,
      label: '',
      probability: sid === 'frustration' ? 0.5 : sid === 'lost_time' ? 0.55 : 0.5,
      cost: sid === 'frustration' ? 45 : sid === 'lost_time' ? 35 : 30,
      tooltip: '',
    })),
  }
}

const initialProject = createDefaultProject('Example Project')

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [projects, setProjects] = useState<Project[]>([initialProject])
  const [activeId, setActiveId] = useState<string>(initialProject.id)
  const [activeTab, setActiveTab] = useState<TabId>('calc')

  const t = tr(lang)
  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0]

  const updateProject = useCallback((updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }, [])

  const addProject = useCallback(() => {
    const newProject = createDefaultProject(t.defaultProjectName)
    setProjects((prev) => [...prev, newProject])
    setActiveId(newProject.id)
    setActiveTab('calc')
  }, [t.defaultProjectName])

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

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'es' : 'en'))
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* App header */}
      <header
        style={{
          borderBottom: '1px solid #1e1e1e',
          padding: '0 20px',
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
          {t.headerMono}
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
          {t.headerItalic}{' '}
          <span style={{ color: '#c9a84c' }}>{t.headerHope}</span>
        </span>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#666',
            fontSize: '11px',
            fontFamily: 'var(--font-ibm-mono)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#c9a84c'
            e.currentTarget.style.borderColor = '#c9a84c'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666'
            e.currentTarget.style.borderColor = '#2a2a2a'
          }}
        >
          {t.switchLang}
        </button>
      </header>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar — always visible */}
        <Sidebar
          projects={projects}
          activeId={activeId}
          lang={lang}
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
          <TabNav activeTab={activeTab} onTab={setActiveTab} lang={lang} />

          <div style={{ flex: 1, overflow: 'auto', padding: '0 0 80px 0' }}>
            {activeTab === 'calc' && (
              <CalcTab project={activeProject} lang={lang} onUpdate={updateProject} />
            )}
            {activeTab === 'compare' && (
              <CompareTab projects={projects} lang={lang} onSelect={selectProject} />
            )}
            {activeTab === 'why' && (
              <WhyTab lang={lang} onCalc={() => setActiveTab('calc')} />
            )}
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
        {t.footer}
      </footer>
    </div>
  )
}

function TabNav({
  activeTab,
  onTab,
  lang,
}: {
  activeTab: TabId
  onTab: (t: TabId) => void
  lang: Lang
}) {
  const t = tr(lang)
  const tabs: { id: TabId; label: string }[] = [
    { id: 'calc', label: t.tabCalc },
    { id: 'compare', label: t.tabCompare },
    { id: 'why', label: t.tabWhy },
  ]

  return (
    <nav
      style={{
        display: 'flex',
        borderBottom: '1px solid #2a2a2a',
        background: '#0e0e0e',
        padding: '0 24px',
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTab(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '16px 20px',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '14px',
            fontWeight: activeTab === tab.id ? 600 : 400,
            color: activeTab === tab.id ? '#e2e2e2' : '#666',
            borderBottom: activeTab === tab.id ? '2px solid #c9a84c' : '2px solid transparent',
            transition: 'all 0.15s ease',
            marginBottom: '-1px',
          }}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
