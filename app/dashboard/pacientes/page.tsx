'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import { Card, CardContent } from '@/app/components/ui/card'
import { 
  Search, 
  User, 
  Droplets, 
  Phone, 
  Activity, 
  ArrowRight, 
  AlertCircle,
  FileText
} from 'lucide-react'

// Mock Data basado en tus tablas: usuarios + pacientes
const PACIENTES_DB = [
  { 
    usuario_id: 'u-501',
    nombre: 'Carlos', 
    apellido: 'Ruiz Milla',
    dni: '12345678', 
    tipo_sangre: 'O+', 
    alergias: 'Penicilina',
    antecedentes: 'Hipertensión controlada',
    telefono: '987-654-321',
    total_citas: 5 
  }
]

export default function PacientesPage() {
  const [query, setQuery] = useState('')

  // Simulación de búsqueda por DNI (Como pediste para Admin)
  const result = PACIENTES_DB.find(p => p.dni === query)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Gestión de Pacientes" breadcrumb="Pacientes" />
      
      <div className="p-6 lg:p-10 space-y-8 max-w-6xl mx-auto">
        
        {/* BUSCADOR DNI */}
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 text-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Consultar Paciente</h2>
            <p className="text-slate-400 text-sm">Ingrese el DNI para recuperar la Historia Clínica</p>
          </div>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              maxLength={8}
              placeholder="DNI del paciente..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-mono focus:border-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>

        {/* VISTA DE RESULTADOS */}
        {result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Perfil Básico */}
            <Card className="lg:col-span-1 border-none shadow-xl bg-white p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[32px] bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg">
                <User className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 leading-tight">{result.nombre} {result.apellido}</h3>
              <p className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mt-4 border border-blue-100">
                DNI: {result.dni}
              </p>
              
              <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Citas</p>
                  <p className="text-lg font-black text-slate-700">{result.total_citas}</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Seguro</p>
                  <p className="text-lg font-black text-slate-700">SIS</p>
                </div>
              </div>
            </Card>

            {/* Ficha Clínica (Columnas SQL) */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm bg-white p-8 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Grupo Sanguíneo</p>
                      <p className="text-lg font-bold text-slate-700">{result.tipo_sangre}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Alergias</p>
                      <p className="text-base font-bold text-slate-700">{result.alergias || 'Ninguna'}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 col-span-1 md:col-span-2 border-t border-slate-50 pt-6">
                    <div className="h-12 w-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Antecedentes Médicos</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">{result.antecedentes}</p>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 pt-4">
                     <button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all group">
                       Acceder a Historia Clínica Completa
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>

                </div>
              </Card>
            </div>
          </div>
        ) : (
          query.length > 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No se encontró ningún registro para el DNI: {query}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}