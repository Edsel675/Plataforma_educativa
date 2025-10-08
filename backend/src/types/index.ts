// Global types for backend

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface BoardContext {
  sessionId: string
  studentId: string
  timestamp: Date
  currentActivity?: string
  elements: BoardElement[]
}

export interface BoardElement {
  id: string
  type: 'text' | 'drawing' | 'image' | 'animation' | 'character'
  content: any
  position: { x: number; y: number }
  metadata?: Record<string, any>
}

export interface SessionData {
  id: string
  studentId: string
  subject: string
  topic: string
  startTime: Date
  status: 'active' | 'paused' | 'completed'
}
