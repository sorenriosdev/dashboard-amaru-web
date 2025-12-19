'use client'

import Header from '@/app/components/layout/Header'
import { Card, CardContent } from '@/app/components/ui/card'
import { Bell, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'

const NOTIFS = [
  { id: 1, type: 'alert', title: 'Stock Crítico', desc: 'Insumos de bioseguridad por debajo del 10% en Almacén Central.', time: 'Hace 5 min' },
  { id: 2, type: 'info', title: 'Actualización de Sistema', desc: 'El módulo de Triaje se actualizará hoy a las 23:00 hrs.', time: 'Hace 2 horas' },
  { id: 3, type: 'success', title: 'Backup Completado', desc: 'La copia de seguridad de Historias Clínicas se realizó con éxito.', time: 'Hace 12 horas' },
]

export default function NotificacionesAdminPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Notificaciones del Sistema" breadcrumb="Admin / Alertas" />
      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
            <Bell className="w-5 h-5" /> Bandeja de Entrada
          </h2>
          <button className="text-xs font-bold text-blue-600 hover:underline">Marcar todas como leídas</button>
        </div>

        {NOTIFS.map((n) => (
          <Card key={n.id} className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group">
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${
                n.type === 'alert' ? 'bg-red-50 text-red-600' :
                n.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-600'
              }`}>
                {n.type === 'alert' ? <AlertTriangle className="w-5 h-5"/> : n.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <Info className="w-5 h-5"/>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{n.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}