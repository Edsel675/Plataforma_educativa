import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

console.log('')
console.log('========================================')
console.log('🤖 AI SERVICES INITIALIZED')
console.log('========================================')
console.log('📊 Multi-agent system ready')
console.log('🧠 Available agents:')
console.log('   • Líder (Orchestrator)')
console.log('   • Analista (Learning Analyzer)')
console.log('   • Didáctico (Teaching Expert)')
console.log('   • Emocional (Emotional Support)')
console.log('   • Generador (Content Generator)')
console.log('   • Supervisor (Quality Control)')
console.log('========================================')
console.log('')

// Verificar API Key de OpenAI
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  OPENAI_API_KEY no está configurada')
  console.warn('   Configura tu API key en el archivo .env')
} else {
  console.log('✅ OpenAI API Key configurada')
  
  // Inicializar cliente de OpenAI
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  
  console.log('✅ Cliente de OpenAI inicializado')
}

// Aquí se inicializarán los agentes
export {}
