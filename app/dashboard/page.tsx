'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import StatCard from '@/app/components/dashboard/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { 
  Users, 
  Activity, 
  BedDouble, 
  Stethoscope, 
  AlertCircle, 
  Calendar, 
  ChevronRight,
  UserCheck,
  TrendingUp,
  MapPin
} from 'lucide-react'

export default function DashboardPage() {
  const [formattedDate] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new Date().toLocaleDateString('es-PE', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Panel General" breadcrumb="Dashboard" />
      
      <div className="p-6 lg:p-10 space-y-10">
        {/* FILA DE STATS - ALTA VISIBILIDAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Ocupación" value="85%" icon={BedDouble} color="orange" trend={{ value: 'Crítico', isPositive: false }} />
          <StatCard title="En Espera" value="12" icon={Users} color="purple" trend={{ value: 'Triaje Alto', isPositive: false }} />
          <StatCard title="Atenciones" value="24" icon={Activity} color="green" trend={{ value: '+4 hoy', isPositive: true }} />
          <StatCard title="Urgencias" value="03" icon={AlertCircle} color="red" trend={{ value: 'Activas', isPositive: false }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLUMNA IZQUIERDA: OPERATIVA (Col 8) */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-[0_8px_40px_rgba(0,0,0,0.02)] bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Agenda de Hoy</CardTitle>
                  <p className="text-slate-400 text-sm mt-1 capitalize font-medium">{formattedDate || 'Cargando...'}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Calendar className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {[
                    { t: '09:00 AM', p: 'Mónica Silva', d: 'Neurología - Control', st: 'Confirmado' },
                    { t: '10:30 AM', p: 'Roberto Gómez', d: 'Gastroenterología', st: 'En Sala' },
                    { t: '11:15 AM', p: 'Lucía Méndez', d: 'Pediatría - Vacunación', st: 'Pendiente' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-5 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group cursor-pointer">
                      <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl whitespace-nowrap">{item.t}</div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.p}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{item.d}</p>
                      </div>
                      <div className="hidden md:block">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          item.st === 'Confirmado' ? 'bg-green-100 text-green-600' : 
                          item.st === 'En Sala' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {item.st}
                        </span>
                      </div>
                      <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-300 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm transition-all">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* COLUMNA DERECHA: GESTIÓN Y MÉTRICAS (Col 4) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* CARD 1: ACCESO RÁPIDO (ESTILO PREMIUM) */}
            <div className="group cursor-pointer bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                <Stethoscope className="h-24 w-24" />
              </div>
              <div className="relative z-10">
                <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.25em] mb-4">Acción Inmediata</p>
                <h4 className="text-2xl font-bold mb-6 leading-tight">Iniciar Nueva<br/>Consulta Médica</h4>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-xs shadow-lg hover:bg-blue-50 transition-colors uppercase tracking-widest">
                  Comenzar
                </button>
              </div>
            </div>

            {/* CARD 2: PERSONAL EN TURNO (NUEVO VALOR) */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white p-6">
              <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-800">Médicos de Guardia</CardTitle>
                <UserCheck className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {[
                  { n: 'Dra. Rios', e: 'Activa', c: 'Cardiología' },
                  { n: 'Dr. Smith', e: 'Activo', c: 'UCI' }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                    <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {doc.n.substring(4, 6)}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-700">{doc.n}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{doc.c}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CARD 3: DISPONIBILIDAD DE RECURSOS (NUEVO VALOR) */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white p-6">
              <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-800">Recursos Críticos</CardTitle>
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0 space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Camas Hospital</span>
                    <span className="text-slate-800">18/24</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-bold text-blue-700">Sede Principal - Sector A</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}