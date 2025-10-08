// Shared constants

export const APP_NAME = 'Pizarra IA Educativa'
export const API_VERSION = 'v1'

export const SUBJECTS = {
  MATHEMATICS: 'matematicas',
  SCIENCE: 'ciencias',
  LANGUAGE: 'lengua',
  SOCIAL_STUDIES: 'estudios-sociales',
} as const

export const LEARNING_STYLES = {
  VISUAL: 'visual',
  AUDITORY: 'auditory',
  KINESTHETIC: 'kinesthetic',
} as const

export const AGENT_TYPES = {
  LIDER: 'lider',
  ANALISTA: 'analista',
  DIDACTICO: 'didactico',
  EMOCIONAL: 'emocional',
  GENERADOR: 'generador',
  SUPERVISOR: 'supervisor',
} as const
