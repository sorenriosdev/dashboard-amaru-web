'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/layout/Sidebar'

type UserRole = 'admin' | 'medico' | 'personal'

// Función helper para obtener el rol de forma segura
function getUserRole(): UserRole {
  if (typeof window === 'undefined') return 'medico'
  
  const storedRole = localStorage.getItem('userRole')
  if (storedRole === 'admin' || storedRole === 'medico' || storedRole === 'personal') {
    return storedRole as UserRole
  }
  return 'medico'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  // Inicializamos el estado con una función lazy para leer del localStorage
  const [userRole, setUserRole] = useState<UserRole>(getUserRole)

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
    }
    // Ya no necesitamos setUserRole aquí porque se inicializa correctamente
  }, [router])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userRole={userRole} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <main 
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isCollapsed ? '80px' : '256px' }}
      >
        {children}
      </main>
    </div>
  )
}