import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

// Cargar variables de entorno
dotenv.config()

// Inicializar Express
const app: Application = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
})

const PORT = process.env.PORT || 3000

// ==================== MIDDLEWARES ====================
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ==================== ROUTES ====================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: '🎨 Backend de Pizarra IA está funcionando',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// API Info
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: '🎨 Pizarra IA Educativa API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      docs: '/api/docs (próximamente)',
    },
    websocket: {
      url: `ws://localhost:${PORT}`,
      status: 'active',
    },
  })
})

// Ruta de prueba para board context
app.get('/api/board-context/:sessionId', (req: Request, res: Response) => {
  res.json({
    sessionId: req.params.sessionId,
    message: 'Board context endpoint (próximamente con datos reales)',
    timestamp: new Date().toISOString(),
  })
})

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `La ruta ${req.method} ${req.url} no existe`,
    availableEndpoints: ['/health', '/api', '/api/board-context/:sessionId'],
  })
})

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal',
  })
})

// ==================== WEBSOCKET ====================
io.on('connection', (socket) => {
  console.log('�� Cliente WebSocket conectado:', socket.id)

  socket.on('join-session', (sessionId: string) => {
    socket.join(`session-${sessionId}`)
    console.log(`👨‍🎓 Cliente ${socket.id} se unió a sesión ${sessionId}`)
    
    socket.emit('session-joined', {
      sessionId,
      message: 'Conectado a la sesión exitosamente',
    })
  })

  socket.on('board-update', (data) => {
    console.log('🎨 Actualización de pizarra recibida:', data)
    // Broadcast a todos en la sesión
    socket.to(`session-${data.sessionId}`).emit('board-updated', data)
  })

  socket.on('disconnect', () => {
    console.log('❌ Cliente WebSocket desconectado:', socket.id)
  })
})

// ==================== START SERVER ====================
httpServer.listen(PORT, () => {
  console.log('')
  console.log('========================================')
  console.log('🚀 BACKEND SERVIDOR INICIADO')
  console.log('========================================')
  console.log(`📡 Servidor HTTP: http://localhost:${PORT}`)
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`📚 API info: http://localhost:${PORT}/api`)
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log('========================================')
  console.log('')
})

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  process.exit(1)
})

export { app, httpServer, io }
