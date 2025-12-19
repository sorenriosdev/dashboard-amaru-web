'use client'

import Header from '@/app/components/layout/Header'
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card'
import { BarChart3, TrendingUp, Users, ClipboardCheck, Activity, Star } from 'lucide-react'

const ProgressBar = ({ value, color }: { value: number, color: string }) => (
  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
    <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: `${value}%` }} />
  </div>
)

export default function IndicadoresPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Indicadores de Gestión" breadcrumb="Admin / KPIs" />
      <div className="p-6 lg:p-10 space-y-8">
        
        {/* Métricas basadas en uso_mensual_hospital */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm p-6 bg-white">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ClipboardCheck className="w-6 h-6"/></div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">+5.2%</span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Citas Mensuales</p>
              <h3 className="text-3xl font-black text-slate-800">1,284</h3>
            </div>
          </Card>

          <Card className="border-none shadow-sm p-6 bg-white">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Users className="w-6 h-6"/></div>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">Nuevo Hospital</span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pacientes Nuevos</p>
              <h3 className="text-3xl font-black text-slate-800">156</h3>
            </div>
          </Card>

          <Card className="border-none shadow-sm p-6 bg-white">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl"><Star className="w-6 h-6"/></div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Satisfacción NPS</p>
              <h3 className="text-3xl font-black text-slate-800">8.9<span className="text-sm text-slate-300">/10</span></h3>
            </div>
          </Card>

          <Card className="border-none shadow-sm p-6 bg-white">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Activity className="w-6 h-6"/></div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ocupación UCI</p>
              <h3 className="text-3xl font-black text-slate-800">72%</h3>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-md bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" /> Eficiencia por Especialidad
              </CardTitle>
            </CardHeader>
            <div className="space-y-6 mt-4">
              {[
                { label: 'Cardiología', value: 85, color: 'bg-blue-500' },
                { label: 'Gastroenterología', value: 62, color: 'bg-purple-500' },
                { label: 'Pediatría', value: 94, color: 'bg-green-500' },
                { label: 'Traumatología', value: 48, color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600 uppercase">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color={item.color} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-md bg-white p-8 flex flex-col justify-center items-center text-center">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Tendencia Semanal</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-xs">
              El flujo de pacientes ha incrementado un 15% en comparación a la semana anterior.
            </p>
            <button className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
              Generar Reporte PDF
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}