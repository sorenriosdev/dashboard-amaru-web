'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react' // Opcional: para ícono de carga

export default function LoginPage() {
  const router = useRouter()
  
  // 1. CORRECCIÓN: Agregamos el estado isLoading
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Guardamos Token falso
      localStorage.setItem('token', 'mock-token-123')
      
      // 2. CORRECCIÓN: Usamos formData.email en lugar de email
      if (formData.email.includes('admin')) {
        localStorage.setItem('userRole', 'admin')
      } else {
        localStorage.setItem('userRole', 'medico') 
      }

      // Pequeño delay para que se sienta real la carga (opcional)
      await new Promise(resolve => setTimeout(resolve, 1000))

      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 font-bold text-2xl mb-4 shadow-lg">
            A
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AMARU</h1>
          <p className="text-blue-100">Sistema de Gestión Hospitalaria</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                placeholder="admin@amaru.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              💡 Tip: Usa <b>admin@...</b> para ver rol Administrador
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}