// Shared TypeScript types

export interface BoardContext {
  sessionId: string
  studentId: string
  timestamp: Date
  elements: BoardElement[]
  currentActivity?: string
}

export interface BoardElement {
  id: string
  type: 'text' | 'drawing' | 'image' | 'animation' | 'character'
  content: any
  position: Position
  metadata?: Record<string, any>
}

export interface Position {
  x: number
  y: number
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  age: number
  grade: string
}

export interface Session {
  id: string
  studentId: string
  subject: string
  topic: string
  startTime: Date
  endTime?: Date
  status: 'active' | 'paused' | 'completed' | 'cancelled'
}
