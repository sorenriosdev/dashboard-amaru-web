'use client'

import Header from '@/app/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Search, ShieldAlert, BadgeCheck, MoreHorizontal, UserCog } from 'lucide-react'

// Mapeo: usuarios.rol (RECEPCIONISTA, ADMIN) + asistencia_personal
const PERSONAL_MOCK = [
  { id: 'u-201', nombre: 'Juana', apellido: 'López', rol: 'RECEPCIONISTA', entrada: '06:58:12', salida: '--:--:--', estado: 'ASISTENCIA', faltas: 0 },
  { id: 'u-202', nombre: 'Marcos', apellido: 'Díaz', rol: 'ADMIN', entrada: '07:05:45', salida: '15:00:20', estado: 'TARDANZA', faltas: 1 },
  { id: 'u-203', nombre: 'Roberto', apellido: 'Gómez', rol: 'RECEPCIONISTA', entrada: '--:--:--', salida: '--:--:--', estado: 'FALTA', faltas: 2 },
]

export default function PersonalAdminPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Personal Administrativo" breadcrumb="Admin / Personal" />
      <div className="p-6 lg:p-10 space-y-6">
        
        <Card className="border-none shadow-md bg-white overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between bg-white py-6">
            <CardTitle className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <UserCog className="w-5 h-5 text-purple-600" /> Registro de Actividad Laboral
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Buscar por nombre o cargo..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-center">ID</th>
                  <th className="px-6 py-4">Colaborador / Rol</th>
                  <th className="px-6 py-4">Entrada</th>
                  <th className="px-6 py-4">Salida</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-center">Inasistencias</th>
                  <th className="px-6 py-4 text-right">Opciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERSONAL_MOCK.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-center font-mono text-xs text-slate-400">{p.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold border border-purple-100">
                          {p.nombre[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{p.nombre} {p.apellido}</p>
                          <p className="text-[10px] font-bold text-slate-400 tracking-tighter">{p.rol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600 tracking-tight">{p.entrada}</td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600 tracking-tight">{p.salida}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black border ${
                        p.estado === 'ASISTENCIA' ? 'bg-green-50 text-green-700 border-green-100' : 
                        p.estado === 'TARDANZA' ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {p.estado === 'ASISTENCIA' ? <BadgeCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`font-bold text-xs ${p.faltas > 0 ? 'text-red-500' : 'text-slate-300'}`}>{p.faltas}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
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