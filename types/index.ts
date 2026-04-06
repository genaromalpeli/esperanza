export interface Benefit {
  id: string
  label: string
  probability: number // 0–1
  value: number // 0–100
  tooltip: string
}

export interface Cost {
  id: string
  label: string
  probability: number // 0–1
  cost: number // 0–100
  tooltip: string
}

export interface Project {
  id: string
  name: string
  benefits: Benefit[]
  costs: Cost[]
}

export type TabId = 'calc' | 'compare' | 'why'

export function calcE(project: Project): { bSum: number; cSum: number; E: number } {
  const bSum = project.benefits.reduce((acc, b) => acc + b.probability * b.value, 0)
  const cSum = project.costs.reduce((acc, c) => acc + c.probability * c.cost, 0)
  return { bSum, cSum, E: bSum - cSum }
}

export function eColor(E: number): string {
  if (E > 40) return '#52d9c8'
  if (E > 0) return '#8ec9a0'
  if (E > -40) return '#e8c56d'
  return '#e8716b'
}

export function eLabel(E: number): string {
  if (E > 40) return 'Vale mucho la pena jugar este juego.'
  if (E > 0) return 'Vale la pena intentarlo.'
  if (E > -40) return 'Esperanza frágil. Revisá las palancas.'
  return 'Esperanza negativa. ¿Qué podés cambiar?'
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}
