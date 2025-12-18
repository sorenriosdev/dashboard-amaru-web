'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import StatCard from '@/app/components/dashboard/StatCard'
import TimeClock from '@/app/components/dashboard/TimeClock'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Users, Activity, BedDouble, Stethoscope, AlertCircle, Calendar } from 'lucide-react'

export default function DashboardPage() {
  // ✅ Lazy initialization: calcula la fecha una sola vez al montar
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
        {/* FILA DE STATS CON DISEÑO MEJORADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Ocupación" value="85%" icon={BedDouble} color="orange" trend={{ value: 'Crítico', isPositive: false }} />
          <StatCard title="En Espera" value="12" icon={Users} color="purple" trend={{ value: 'Triaje Alto', isPositive: false }} />
          <StatCard title="Atenciones" value="24" icon={Activity} color="green" trend={{ value: '+4 hoy', isPositive: true }} />
          <StatCard title="Urgencias" value="03" icon={AlertCircle} color="red" trend={{ value: 'Activas', isPositive: false }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* AGENDA - LADO IZQUIERDO */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-[0_8px_40px_rgba(0,0,0,0.03)] bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Agenda de Hoy</CardTitle>
                  <p className="text-slate-400 text-sm mt-1 capitalize">{formattedDate || 'Cargando...'}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Calendar className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {[
                    { t: '09:00 AM', p: 'Mónica Silva', d: 'Neurología - Control' },
                    { t: '10:30 AM', p: 'Roberto Gómez', d: 'Gastroenterología' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                      <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">{item.t}</div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.p}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                      </div>
                      <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all">
                        →
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LADO DERECHO - RELOJ Y ACCIONES */}
          <div className="lg:col-span-4 space-y-8">
            <TimeClock />

            {/* BOTÓN DE ACCIÓN RÁPIDA ESTILO "CARD" */}
            <div className="group cursor-pointer bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                <Stethoscope className="h-24 w-24" />
              </div>
              <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">Acceso Rápido</p>
              <h4 className="text-2xl font-bold mb-4 leading-tight">Nueva<br/>Consulta Médica</h4>
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg">Comenzar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}