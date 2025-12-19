'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import Button from '@/app/components/ui/button'
import { 
  Clock, 
  Coffee, 
  LogOut, 
  Lock, 
  Play, 
  PauseCircle, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Tipos
export type AttendanceType = 'entrada' | 'refrigerio_inicio' | 'refrigerio_fin' | 'salida'

interface TimeClockProps {
  onRegister: (type: AttendanceType) => void
}

export default function TimeClock({ onRegister }: TimeClockProps) {
  // Estado
  const [time, setTime] = useState(new Date())
  const [status, setStatus] = useState<'idle' | 'working' | 'break' | 'finished'>('idle')
  const [breakTaken, setBreakTaken] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Fecha actual formateada
  const todayDate = time.toLocaleDateString('es-PE', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAction = (type: AttendanceType) => {
    setError(null)

    if (!password.trim()) {
      setError('Ingrese su contraseña para validar')
      return
    }

    if (type === 'refrigerio_inicio' && breakTaken) {
      setError('El refrigerio ya fue tomado en este turno')
      return
    }

    // Ejecutar acción
    onRegister(type)
    setPassword('') // Limpiar seguridad

    // Máquina de estados
    if (type === 'entrada') setStatus('working')
    if (type === 'refrigerio_inicio') setStatus('break')
    if (type === 'refrigerio_fin') {
      setStatus('working')
      setBreakTaken(true)
    }
    if (type === 'salida') setStatus('finished')
  }

  return (
    <div className="space-y-6">
      {/* CARD 1: BIENVENIDA (Rectángulo largo) */}
      <Card className="border-none shadow-lg overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8">
          <div className="flex items-center justify-between text-white">
            {/* Izquierda: Bienvenida y Fecha */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
              <p className="text-base text-blue-50 capitalize font-medium">{todayDate}</p>
            </div>
            
            {/* Derecha: Hora Actual */}
            <div className="text-right">
              <div className="text-5xl font-bold tracking-tight tabular-nums">
                {time.toLocaleTimeString('es-PE', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                }).replace(/\s/, '\u00A0')}
              </div>
              <p className="text-sm text-blue-50 mt-2 font-medium">Hora actual</p>
            </div>
          </div>
        </div>
      </Card>

      {/* CARD 2: ACCIONES RÁPIDAS - Sistema de Marcación */}
      <Card className="border-none shadow-lg bg-white overflow-hidden rounded-2xl">
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Acciones Rápidas
          </h2>
        </div>

        <CardContent className="p-8">
          {status === 'finished' ? (
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-xl mb-1">¡Jornada Finalizada!</h3>
                <p className="text-green-700 text-sm">Su asistencia ha sido registrada correctamente.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-md mx-auto w-full">
              {/* Input Password */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-500" /> 
                  Ingrese su Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value)
                      setError(null)
                    }}
                    placeholder="••••••••"
                    className="w-full h-14 px-5 rounded-xl border-2 border-slate-200 bg-white text-center text-xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-300 placeholder:font-normal"
                  />
                </div>
                
                {/* Mensaje de Error */}
                {error && (
                  <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-4 rounded-xl font-medium border border-red-100 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-2">
                {status === 'idle' && (
                  <Button 
                    onClick={() => handleAction('entrada')}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <Clock className="mr-3 h-6 w-6" /> 
                    Marcar Entrada
                  </Button>
                )}

                {status === 'working' && (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-green-800 font-semibold text-center flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Turno en curso
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={() => handleAction('refrigerio_inicio')}
                        disabled={breakTaken}
                        className={`h-14 font-bold border-2 bg-white text-slate-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 rounded-xl transition-all ${breakTaken ? 'opacity-40 cursor-not-allowed' : 'border-slate-200'}`}
                      >
                        <Coffee className="mr-2 h-5 w-5" /> 
                        {breakTaken ? 'Ya tomado' : 'Refrigerio'}
                      </Button>
                      
                      <Button 
                        onClick={() => handleAction('salida')}
                        className="h-14 font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg shadow-red-200 transition-all hover:scale-[1.02]"
                      >
                        <LogOut className="mr-2 h-5 w-5" /> 
                        Salida
                      </Button>
                    </div>
                  </>
                )}

                {status === 'break' && (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-orange-800 font-semibold text-center flex items-center justify-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Refrigerio en curso
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => handleAction('refrigerio_fin')}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-xl shadow-orange-200 transition-all hover:scale-[1.02]"
                    >
                      <PauseCircle className="mr-3 h-6 w-6" /> 
                      Terminar Refrigerio
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}