'use client'

import Header from '@/app/components/layout/Header'
import { Card } from '@/app/components/ui/card'
import { ShieldCheck, History, DatabaseZap } from 'lucide-react'

export default function HistorialPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Historial de Auditoría" breadcrumb="Admin / Logs" />
      
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center p-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20 scale-150"></div>
            <div className="relative h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Registro de Seguridad Activo</h2>
          <p className="text-slate-400 mt-3 max-w-sm text-sm leading-relaxed">
            Estamos monitoreando cada acción en tiempo real bajo la normativa de protección de datos de salud.
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-12">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <History className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase">Estado Auditoría</p>
              <p className="text-sm font-bold text-green-600 uppercase mt-1 tracking-widest">Encriptado</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <DatabaseZap className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase">Log Retención</p>
              <p className="text-sm font-bold text-slate-700 mt-1">90 Días</p>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-12">
            Sistema Amaru • v1.1 Audit Engine
          </p>
        </Card>
      </div>
    </div>
  )
}