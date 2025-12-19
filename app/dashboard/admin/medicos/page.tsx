'use client'

import Header from '@/app/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Users, Search, Clock, AlertTriangle, CheckCircle2, Stethoscope, ShieldCheck } from 'lucide-react'

// Basado en tabla 'usuarios' y 'asistencia_personal'
const MEDICOS_MOCK = [
  { 
    id: 'u-101', 
    nombre: 'Kiran', 
    apellido: 'Patel', 
    especialidad: 'Cardiología', 
    dni: '72839405',
    asistencia: {
      entrada: '07:55:00',
      salida: '--:--:--',
      estado: 'ASISTENCIA' // Enum de tu DB
    },
    faltas_semana: 0 
  },
  { 
    id: 'u-102', 
    nombre: 'Sarah', 
    apellido: 'Smith', 
    especialidad: 'Pediatría', 
    dni: '45671234',
    asistencia: {
      entrada: '08:15:00',
      salida: '16:00:00',
      estado: 'TARDANZA' 
    },
    faltas_semana: 1 
  }
]

export default function MedicosAdminPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Panel Administrativo de Médicos" breadcrumb="Admin / Médicos" />
      <div className="p-6 lg:p-10 space-y-6">
        
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> Control de Cuerpo Médico
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Buscar por DNI o Apellido" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Médico (Especialidad)</th>
                  <th className="px-6 py-4">Documento (DNI)</th>
                  <th className="px-6 py-4">Entrada Hoy</th>
                  <th className="px-6 py-4 text-center">Faltas Semanales</th>
                  <th className="px-6 py-4">Estado Asistencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MEDICOS_MOCK.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                          {m.nombre[0]}{m.apellido[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">Dr. {m.nombre} {m.apellido}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{m.especialidad}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600">{m.dni}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {m.asistencia.entrada}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${m.faltas_semana > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                        {m.faltas_semana}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                        m.asistencia.estado === 'ASISTENCIA' ? 'bg-green-50 text-green-700 border-green-100' : 
                        m.asistencia.estado === 'TARDANZA' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                        'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {m.asistencia.estado === 'ASISTENCIA' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {m.asistencia.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}