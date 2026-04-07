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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Sidebar — always visible, handles tab navigation */}
      <Sidebar
        projects={projects}
        activeId={activeId}
        activeTab={activeTab}
        lang={lang}
        onSelect={selectProject}
        onAdd={addProject}
        onDelete={deleteProject}
        onTab={setActiveTab}
        onToggleLang={toggleLang}
      />

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        {activeTab === 'calc' && (
          <CalcTab project={activeProject} lang={lang} onUpdate={updateProject} />
        )}
        {activeTab === 'compare' && (
          <CompareTab projects={projects} lang={lang} onSelect={selectProject} />
        )}
        {activeTab === 'why' && (
          <WhyTab lang={lang} onCalc={() => setActiveTab('calc')} />
        )}
      </main>
    </div>
  )
}
