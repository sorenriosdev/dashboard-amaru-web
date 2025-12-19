'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/layout/Sidebar'

type UserRole = 'admin' | 'medico' | 'personal'

// Estado consolidado para evitar renders múltiples
interface AuthSession {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  role: UserRole | null
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const [session, setSession] = useState<AuthSession>({
    status: 'loading',
    role: null
  })

  useEffect(() => {
    // Envolvemosla lógica en una función asíncrona 
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const storedRole = localStorage.getItem('userRole') as UserRole

      if (!token || !storedRole) {
        // Redirigir primero
        router.replace('/auth/login')
        // Luego actualizar el estado (opcional, ya que redirige)
        setSession({ status: 'unauthenticated', role: null })
      } else {
        // Actualizar estado de autenticación
        setSession({
          status: 'authenticated',
          role: storedRole
        })
      }
    }

    checkAuth()
  }, [router])

  // 1. Mientras carga
  if (session.status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // 2. Si no es válido
  if (session.status === 'unauthenticated' || !session.role) {
    return null
  }

  // 3. Render final (Solo cuando ya sabemos que es Admin o Medico)
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar 
        userRole={session.role}
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {children}
      </main>
    </div>
  )
}