'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Activity, User, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      
      localStorage.setItem('token', 'mock-token-123')
      const assignedRole = formData.email.includes('admin') ? 'admin' : 'medico'
      localStorage.setItem('userRole', assignedRole)

      await new Promise(resolve => setTimeout(resolve, 800))

      router.replace('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg text-white mb-4">
            <Activity className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">AMARU</h1>
          <p className="text-slate-400 text-sm">Inicie sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="admin@amaru.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Ingresar'}
          </button>
        </form>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-[11px] text-blue-700 text-center font-medium">
            Tip: Solo correos con la palabra <b>admin</b> activan el panel de control.
          </p>
        </div>
      </div>
    </div>
  )
}