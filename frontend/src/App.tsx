import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white flex items-center justify-center p-8">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              🎨 Pizarra IA Educativa
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              Plataforma de aprendizaje con IA multi-agente
            </p>
            <p className="text-lg text-gray-400">
              Frontend configurado y listo para desarrollo 🚀
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-600/20 border border-green-500 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold mb-2">Frontend</h3>
              <p className="text-sm text-gray-300">React + Vite + TypeScript</p>
            </div>
            
            <div className="bg-blue-600/20 border border-blue-500 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Backend</h3>
              <p className="text-sm text-gray-300">Node.js + Express + Prisma</p>
            </div>
            
            <div className="bg-purple-600/20 border border-purple-500 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Services</h3>
              <p className="text-sm text-gray-300">Multi-agente OpenAI</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">🎯 Próximos Pasos</h2>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Configurar variables de entorno (.env)</li>
              <li>• Iniciar bases de datos (docker-compose up -d)</li>
              <li>• Ejecutar migraciones de Prisma</li>
              <li>• Comenzar a codear la pizarra interactiva</li>
            </ul>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
