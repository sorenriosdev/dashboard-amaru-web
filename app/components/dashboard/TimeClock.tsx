'use client'

import { useState, useEffect } from 'react'
import { Play, Coffee, LogOut, CheckCircle2, Lock, Fingerprint } from 'lucide-react'
import { cn } from '@/app/lib/utils'

type ClockState = 'idle' | 'working' | 'break' | 'finished'
// ✅ Definimos un tipo específico para las acciones del reloj
type ClockAction = 'start' | 'break' | 'end_break' | 'finished'

export default function TimeClock() {
  const [status, setStatus] = useState<ClockState>(() => {
    if (typeof window === 'undefined') return 'idle'
    const saved = localStorage.getItem('amaru_clock_state')
    if (saved) {
      const { status: s } = JSON.parse(saved)
      return s || 'idle'
    }
    return 'idle'
  })

  const [breakTaken, setBreakTaken] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('amaru_clock_state')
    if (saved) {
      const { breakTaken: b } = JSON.parse(saved)
      return b || false
    }
    return false
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  // ✅ Cambiamos el tipo de pendingAction
  const [pendingAction, setPendingAction] = useState<ClockAction | null>(null)

  useEffect(() => {
    localStorage.setItem('amaru_clock_state', JSON.stringify({ status, breakTaken }))
  }, [status, breakTaken])

  const handleAction = (action: ClockAction) => {
    setPendingAction(action)
    setIsModalOpen(true)
  }

  const confirmAction = () => {
    if (password !== '1234') {
      alert('Error: Credenciales inválidas')
      return
    }
    
    if (pendingAction === 'start') setStatus('working')
    if (pendingAction === 'break') setStatus('break')
    if (pendingAction === 'end_break') {
      setStatus('working')
      setBreakTaken(true)
    }
    if (pendingAction === 'finished') setStatus('finished')

    setIsModalOpen(false)
    setPassword('')
  }

  if (status === 'finished') {
    return (
      <div className="bg-slate-900 rounded-3xl p-8 text-center shadow-2xl border border-slate-800">
        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <h3 className="text-white font-bold text-xl">¡Jornada Finalizada!</h3>
        <p className="text-slate-400 text-sm mt-2">Sistema cerrado correctamente.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
            <Fingerprint className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Personal Médico</p>
            <p className="font-bold">Control de Turno</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {status === 'idle' && (
          <button onClick={() => handleAction('start')} className="w-full group relative flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200">
            <Play className="h-5 w-5 fill-current" /> Marcar Entrada
          </button>
        )}

        {status === 'working' && (
          <div className="grid grid-cols-2 gap-4">
            <button 
              disabled={breakTaken}
              onClick={() => handleAction('break')}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold",
                breakTaken ? "bg-gray-50 border-gray-100 text-gray-300" : "bg-amber-50 border-amber-100 text-amber-600 hover:border-amber-300"
              )}
            >
              <Coffee className="h-6 w-6" /> {breakTaken ? 'Ya tomado' : 'Refrigerio'}
            </button>
            <button onClick={() => handleAction('finished')} className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-red-100 bg-red-50 text-red-600 hover:border-red-300 font-bold transition-all">
              <LogOut className="h-6 w-6" /> Salida
            </button>
          </div>
        )}

        {status === 'break' && (
          <button onClick={() => handleAction('end_break')} className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex flex-col items-center">
            <span className="text-xs opacity-80 uppercase mb-1">En pausa</span>
            Retornar a Labores
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex p-3 bg-blue-50 rounded-2xl text-blue-600 mb-2">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Confirmar Identidad</h3>
              <p className="text-slate-500 text-sm px-4">Por seguridad, ingresa tu contraseña para registrar el movimiento.</p>
            </div>
            <input 
              type="password" 
              autoFocus
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-center text-2xl tracking-[0.5em] focus:border-blue-500 focus:bg-white outline-none transition-all"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmAction()}
            />
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="py-4 font-bold text-slate-400 hover:text-slate-600">Cancelar</button>
              <button onClick={confirmAction} className="py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">Verificar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}