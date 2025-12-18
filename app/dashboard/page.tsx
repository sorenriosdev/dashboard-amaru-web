import Header from '@/app/components/layout/Header'
import StatCard from '@/app/components/dashboard/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Users, Calendar, Clock, Activity } from 'lucide-react'

export default function DashboardPage() {
  // Datos mock - reemplazar con datos reales del backend
  const todayAppointments = [
    { id: 1, time: '09:00', patient: 'María García', type: 'Consulta General' },
    { id: 2, time: '10:30', patient: 'Juan Pérez', type: 'Control' },
    { id: 3, time: '14:00', patient: 'Ana López', type: 'Emergencia' },
    { id: 4, time: '16:00', patient: 'Carlos Ruiz', type: 'Seguimiento' },
  ]

  return (
    <div>
      <Header title="Dashboard" breadcrumb="Dashboard" />
      
      <div className="p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pacientes Hoy"
            value="12"
            icon={Users}
            color="blue"
            trend={{ value: '+8% vs ayer', isPositive: true }}
          />
          <StatCard
            title="Consultas Completadas"
            value="8"
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Próximas Citas"
            value="4"
            icon={Calendar}
            color="orange"
          />
          <StatCard
            title="Horas Trabajadas"
            value="6.5"
            icon={Clock}
            color="purple"
          />
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoy - {new Date().toLocaleDateString('es-PE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-semibold">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Marcar Asistencia</h3>
              <p className="text-sm text-blue-100">Registra tu entrada o salida</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Nueva Consulta</h3>
              <p className="text-sm text-green-100">Registrar nueva consulta</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Ver Horarios</h3>
              <p className="text-sm text-purple-100">Consulta tu calendario</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}