'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import Button from '@/app/components/ui/button'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface TimeSlot {
  time: string
  patient?: {
    name: string
    type: string
    status: 'confirmed' | 'pending' | 'completed'
  }
}

export default function HorariosPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data - reemplazar con datos del backend
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  
  const schedule: Record<number, TimeSlot[]> = {
    1: [ // Lunes
      { time: '08:00', patient: { name: 'María García', type: 'Consulta', status: 'confirmed' } },
      { time: '09:00', patient: { name: 'Juan Pérez', type: 'Control', status: 'confirmed' } },
      { time: '10:00' },
      { time: '11:00', patient: { name: 'Ana López', type: 'Emergencia', status: 'pending' } },
      { time: '14:00', patient: { name: 'Carlos Ruiz', type: 'Seguimiento', status: 'completed' } },
      { time: '15:00' },
      { time: '16:00', patient: { name: 'Laura Torres', type: 'Consulta', status: 'confirmed' } },
    ],
    2: [ // Martes
      { time: '08:00' },
      { time: '09:00', patient: { name: 'Pedro Sánchez', type: 'Control', status: 'confirmed' } },
      { time: '10:00' },
      { time: '11:00' },
      { time: '14:00', patient: { name: 'Sofia Medina', type: 'Consulta', status: 'confirmed' } },
      { time: '15:00' },
      { time: '16:00' },
    ],
  }

  const statusColors = {
    confirmed: 'bg-green-100 border-green-300 text-green-700',
    pending: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    completed: 'bg-gray-100 border-gray-300 text-gray-600',
  }

  const statusLabels = {
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    completed: 'Completada',
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  return (
    <div>
      <Header title="Mi Horario" breadcrumb="Horarios" />
      
      <div className="p-8 space-y-6">
        {/* Week Navigator */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Semana del {currentDate.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
                </h2>
                <p className="text-sm text-gray-600">Horario semanal de consultas</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Hoy
                </Button>
                <Button variant="outline" size="sm" onClick={goToNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-sm text-gray-600">Citas esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Confirmadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900">40h</p>
              <p className="text-sm text-gray-600">Horas programadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Calendario Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => {
                const daySchedule = schedule[index + 1] || []
                const isToday = index === new Date().getDay() - 1
                
                return (
                  <div
                    key={day}
                    className={`rounded-lg border p-4 ${
                      isToday ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-gray-600">{day}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {index + 1}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {daySchedule.length > 0 ? (
                        daySchedule.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className={`rounded-md border-2 p-2 text-xs ${
                              slot.patient
                                ? statusColors[slot.patient.status]
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <p className="font-semibold mb-1">{slot.time}</p>
                            {slot.patient ? (
                              <>
                                <p className="font-medium truncate">
                                  {slot.patient.name}
                                </p>
                                <p className="text-[10px] mt-1">
                                  {slot.patient.type}
                                </p>
                              </>
                            ) : (
                              <p className="text-gray-400">Disponible</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-gray-400">Sin horario</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-700">Estado:</span>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-100 border-2 border-green-300" />
                <span className="text-sm text-gray-600">Confirmada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-yellow-100 border-2 border-yellow-300" />
                <span className="text-sm text-gray-600">Pendiente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-100 border-2 border-gray-300" />
                <span className="text-sm text-gray-600">Completada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-white border-2 border-gray-200" />
                <span className="text-sm text-gray-600">Disponible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}