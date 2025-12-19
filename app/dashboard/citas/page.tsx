'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Video, 
  UserCheck, 
  Activity, // Corregido: Importación agregada
  Search,
  MapPin,
  ClipboardCheck
} from 'lucide-react'

// Mapeo de Enums de tu SQL: estado_cita y tipo_cita
const CITAS_MOCK = [
  { 
    id: 'CIT-001', 
    paciente_nombre: 'Mariana', 
    paciente_apellido: 'López',
    fecha_cita: '2023-12-18', 
    hora_cita: '09:00', 
    tipo_cita: 'VIRTUAL', 
    estado_cita: 'CONFIRMADA', 
    motivo: 'Control post-operatorio' 
  },
  { 
    id: 'CIT-002', 
    paciente_nombre: 'Carlos', 
    paciente_apellido: 'Ruiz',
    fecha_cita: '2023-12-18', 
    hora_cita: '10:30', 
    tipo_cita: 'PRESENCIAL', 
    estado_cita: 'EN_SALA_ESPERA', 
    motivo: 'Consulta general' 
  }
]

export default function CitasPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Agenda Médica" breadcrumb="Citas" />
      <div className="p-6 lg:p-10 space-y-6">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600" />
            Próximas Citas
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Filtrar citas..." className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="grid gap-4">
          {CITAS_MOCK.map((cita) => (
            <Card key={cita.id} className="border-none shadow-sm bg-white hover:shadow-md transition-all cursor-pointer overflow-hidden border-l-4 border-l-blue-500">
              <div className="flex flex-col md:flex-row md:items-center p-5 gap-6">
                
                {/* Paciente Info */}
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-base">{cita.paciente_nombre} {cita.paciente_apellido}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{cita.motivo}</p>
                  </div>
                </div>

                {/* Data Temporal y Tipo */}
                <div className="flex-1 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Calendar className="w-4 h-4 text-blue-500" /> {cita.fecha_cita}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium border-l border-slate-200 pl-6">
                    <Clock className="w-4 h-4 text-blue-500" /> {cita.hora_cita}
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                    {cita.tipo_cita === 'VIRTUAL' ? (
                      <Video className="w-4 h-4 text-purple-500" />
                    ) : (
                      <MapPin className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-600 uppercase">
                      {cita.tipo_cita}
                    </span>
                  </div>
                </div>

                {/* Estado y Acciones */}
                <div className="flex items-center gap-4">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${
                     cita.estado_cita === 'CONFIRMADA' ? 'bg-green-50 text-green-700 border-green-100' : 
                     cita.estado_cita === 'EN_SALA_ESPERA' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                     'bg-blue-50 text-blue-700 border-blue-100'
                   }`}>
                     {cita.estado_cita.replace('_', ' ')}
                   </span>
                   <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                     <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}