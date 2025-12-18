'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import Button from '@/app/components/ui/button'
import { Clock, Coffee, LogOut as LogOutIcon, FileText } from 'lucide-react'
import { formatTime } from '@/app/lib/utils'

type AttendanceStatus = 'not_started' | 'working' | 'break' | 'finished'
type AttendanceType = 'entrada' | 'refrigerio_inicio' | 'refrigerio_fin' | 'salida'

interface AttendanceRecord {
  type: AttendanceType
  time: Date
  notes?: string
}

export default function AsistenciaPage() {
  const [status, setStatus] = useState<AttendanceStatus>('not_started')
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [showNotes, setShowNotes] = useState(false)
  const [currentNotes, setCurrentNotes] = useState('')

  const markAttendance = (type: AttendanceType) => {
    const record: AttendanceRecord = {
      type,
      time: new Date(),
      notes: currentNotes || undefined
    }

    setRecords([...records, record])
    setCurrentNotes('')
    setShowNotes(false)

    // Actualizar estado
    if (type === 'entrada') setStatus('working')
    if (type === 'refrigerio_inicio') setStatus('break')
    if (type === 'refrigerio_fin') setStatus('working')
    if (type === 'salida') setStatus('finished')
  }

  const getActionButton = () => {
    switch (status) {
      case 'not_started':
        return {
          label: 'Marcar Entrada',
          icon: Clock,
          color: 'primary' as const,
          action: () => markAttendance('entrada')
        }
      case 'working':
        return {
          label: 'Iniciar Refrigerio',
          icon: Coffee,
          color: 'secondary' as const,
          action: () => markAttendance('refrigerio_inicio')
        }
      case 'break':
        return {
          label: 'Fin de Refrigerio',
          icon: Clock,
          color: 'primary' as const,
          action: () => markAttendance('refrigerio_fin')
        }
      default:
        return null
    }
  }

  const actionButton = getActionButton()

  const typeLabels: Record<AttendanceType, string> = {
    entrada: 'Entrada',
    refrigerio_inicio: 'Inicio Refrigerio',
    refrigerio_fin: 'Fin Refrigerio',
    salida: 'Salida'
  }

  return (
    <div>
      <Header title="Control de Asistencia" breadcrumb="Asistencia" />
      
      <div className="p-8 space-y-6">
        {/* Status Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {status === 'not_started' && 'Bienvenido'}
                  {status === 'working' && 'En Turno'}
                  {status === 'break' && 'En Refrigerio'}
                  {status === 'finished' && 'Turno Finalizado'}
                </h2>
                <p className="text-blue-100">
                  {new Date().toLocaleDateString('es-PE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">
                  {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm text-blue-100 mt-1">Hora actual</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actionButton && (
                <Button
                  variant={actionButton.color}
                  size="lg"
                  className="w-full h-20 text-lg"
                  onClick={actionButton.action}
                >
                  <actionButton.icon className="mr-3 h-6 w-6" />
                  {actionButton.label}
                </Button>
              )}

              {status === 'working' && (
                <Button
                  variant="danger"
                  size="lg"
                  className="w-full h-20 text-lg"
                  onClick={() => markAttendance('salida')}
                >
                  <LogOutIcon className="mr-3 h-6 w-6" />
                  Marcar Salida
                </Button>
              )}

              {status !== 'finished' && (
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <FileText className="h-4 w-4" />
                  Agregar observaciones
                </button>
              )}

              {showNotes && (
                <textarea
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  placeholder="Ej: Llegada tardía por tráfico, permiso médico, etc."
                  className="w-full h-24 rounded-lg border p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              )}
            </CardContent>
          </Card>

          {/* Today's Records */}
          <Card>
            <CardHeader>
              <CardTitle>Registros de Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Aún no hay registros para hoy</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {records.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        {record.type === 'entrada' && <Clock className="h-5 w-5" />}
                        {record.type.includes('refrigerio') && <Coffee className="h-5 w-5" />}
                        {record.type === 'salida' && <LogOutIcon className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">
                            {typeLabels[record.type]}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatTime(record.time)}
                          </p>
                        </div>
                        {record.notes && (
                          <p className="text-sm text-gray-500 mt-1">{record.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        {records.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Día</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hora de Entrada</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {records.find(r => r.type === 'entrada') 
                      ? formatTime(records.find(r => r.type === 'entrada')!.time)
                      : '--:--'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tiempo de Refrigerio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {records.find(r => r.type === 'refrigerio_inicio') && 
                     records.find(r => r.type === 'refrigerio_fin')
                      ? '30 min' // Calcular diferencia real
                      : '--'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hora de Salida</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {records.find(r => r.type === 'salida')
                      ? formatTime(records.find(r => r.type === 'salida')!.time)
                      : '--:--'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}