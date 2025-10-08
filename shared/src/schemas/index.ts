import { z } from 'zod'

// Zod schemas for validation

export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
})

export const BoardElementSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'drawing', 'image', 'animation', 'character']),
  content: z.any(),
  position: PositionSchema,
  metadata: z.record(z.any()).optional(),
})

export const BoardContextSchema = z.object({
  sessionId: z.string(),
  studentId: z.string(),
  timestamp: z.date(),
  elements: z.array(BoardElementSchema),
  currentActivity: z.string().optional(),
})
