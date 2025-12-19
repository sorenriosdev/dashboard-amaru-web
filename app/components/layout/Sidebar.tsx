'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Clock, 
  Users, 
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  ClipboardList,
  BarChart3,
  UserCircle
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface SidebarProps {
  userRole: 'admin' | 'medico' | 'personal'
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export default function Sidebar({ userRole, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAdminOpen, setIsAdminOpen] = useState(true)

  // TU MENÚ ESTÁ BIEN ASÍ, NO NECESITAS CAMBIAR NADA AQUÍ
  const mainMenuItems = [
    { icon: LayoutDashboard, label: 'Home', href: '/dashboard', badge: null },
    { icon: Clock, label: 'Turno', href: '/dashboard/asistencia', badge: 3 },
    { icon: Calendar, label: 'Horarios', href: '/dashboard/horarios', badge: null },
    { icon: ClipboardList, label: 'Citas', href: '/dashboard/citas', badge: null }, 
  ]

  const adminMenuItems = [
    { icon: Users, label: 'Médicos', href: '/dashboard/admin/medicos' },
    { icon: Users, label: 'Otro personal', href: '/dashboard/admin/personal' },
    { icon: Users, label: 'Pacientes', href: '/dashboard/pacientes' },
    { icon: BarChart3, label: 'Indicadores', href: '/dashboard/admin/indicadores' },
    { icon: Bell, label: 'Notificaciones', href: '/dashboard/admin/notificaciones', badge: 10 },
    { icon: ClipboardList, label: 'Historial', href: '/dashboard/admin/historial' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    
    // CORRECCIÓN AQUÍ: La ruta correcta es /auth/login
    router.push('/auth/login')
  }

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 h-screen bg-[#BDD6F8] transition-all duration-300 ease-in-out z-40 flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-blue-300/30">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-md">
                U
              </div>
              <span className="text-xl font-bold text-gray-800">AMARU</span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 hover:bg-blue-200/50 rounded-lg transition-colors"
            >
              <PanelLeftClose className="h-5 w-5 text-gray-700" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mx-auto p-2 hover:bg-blue-200/50 rounded-lg transition-colors"
          >
            <PanelLeftOpen className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="mx-4 my-6 rounded-xl bg-white/40 backdrop-blur-sm p-4 border border-blue-300/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <UserCircle className="h-7 w-7" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Dr. Kiran Patel</p>
              <p className="text-xs text-gray-600 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="mx-auto my-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
            <UserCircle className="h-7 w-7" />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {mainMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 relative',
                isActive 
                  ? 'bg-white text-blue-600 shadow-md font-medium' 
                  : 'text-gray-700 hover:bg-white/40',
                isCollapsed && 'justify-center'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Admin Section */}
        {userRole === 'admin' && (
          <div className="pt-4">
            {!isCollapsed ? (
              <>
                <button
                  onClick={() => setIsAdminOpen(!isAdminOpen)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-white/40 transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                  <span className="flex-1 font-medium">Administración</span>
                  {isAdminOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {isAdminOpen && (
                  <div className="mt-1 space-y-1 ml-4">
                    {adminMenuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-200',
                            isActive 
                              ? 'bg-white text-blue-600 shadow-md font-medium' 
                              : 'text-gray-600 hover:bg-white/40'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="h-3 w-3 text-gray-400" />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            ) : (
              <button
                className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-gray-700 hover:bg-white/40 transition-all duration-200"
                title="Administración"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-blue-300/30">
        <button 
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200',
            isCollapsed && 'justify-center'
          )}
          title={isCollapsed ? 'Cerrar Sesión' : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  )
}