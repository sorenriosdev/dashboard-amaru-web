// app/dashboard/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Verificar si hay token (autenticación simple)
    const token = localStorage.getItem('token')
    
    if (!token) {
      // Si no hay token, redirigir al login
      router.push('/login')
    }
  }, [router])

  // TODO: Obtener el rol del usuario desde tu API
  // Cambiar 'medico' por 'admin' para ver el menú de administración
  const userRole = 'admin' // Opciones: 'admin' | 'medico' | 'personal'

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