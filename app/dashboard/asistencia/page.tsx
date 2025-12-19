'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import TimeClock, { AttendanceType } from '@/app/components/dashboard/TimeClock'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { formatTime } from '@/app/lib/utils'
import { History, MapPin } from 'lucide-react'

// Estructura del registro
interface AttendanceRecord {
  id: number
  type: AttendanceType
  timestamp: Date
}

const TYPE_LABELS: Record<AttendanceType, string> = {
  entrada: 'Entrada Turno',
  refrigerio_inicio: 'Inicio Refrigerio',
  refrigerio_fin: 'Fin Refrigerio',
  salida: 'Salida Turno'
}

export default function AsistenciaPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  const handleRegister = (type: AttendanceType) => {
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      type,
      timestamp: new Date()
    }
    setRecords(prev => [newRecord, ...prev])
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Control de Asistencia" breadcrumb="Asistencia" />
      
      <div className="p-6 lg:p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Reloj con Bienvenida */}
        <div className="lg:col-span-5 space-y-6">
          <TimeClock onRegister={handleRegister} />
          
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-blue-900">Ubicación Segura</p>
              <p className="text-xs text-blue-700 mt-0.5">
                Terminal: PISO-2-UCI • IP: 192.168.1.45
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Historial */}
        <div className="lg:col-span-7">
          <Card className="border-none shadow-md h-full bg-white rounded-2xl">
            <CardHeader className="border-b border-slate-50 py-5 px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-700 text-lg">
                  <History className="w-5 h-5 text-slate-400" />
                  Historial del Día
                </CardTitle>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                  {records.length} eventos
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {records.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <History className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Su cronograma está vacío por ahora.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {records.map((record) => (
                    <div key={record.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`w-1.5 h-10 rounded-full ${
                          record.type === 'entrada' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' :
                          record.type === 'salida' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 
                          'bg-orange-400'
                        }`} />
                        <div>
                          <p className="font-bold text-slate-700 text-base">
                            {TYPE_LABELS[record.type]}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">
                            Verificado correctamente
                          </p>
                        </div>
                      </div>
                      <p className="font-mono font-bold text-slate-800 text-lg bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                        {formatTime(record.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}