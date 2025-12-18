import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/card'
import { cn } from '@/app/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  trend?: {
    value: string
    isPositive: boolean
  }
}

export default function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  
  // Mapeo de colores para bordes y fondos sutiles
  const colorStyles = {
    blue:   'border-l-blue-500   bg-blue-50/30   text-blue-600',
    green:  'border-l-green-500  bg-green-50/30  text-green-600',
    orange: 'border-l-orange-500 bg-orange-50/30 text-orange-600',
    purple: 'border-l-purple-500 bg-purple-50/30 text-purple-600',
    red:    'border-l-red-500    bg-red-50/30    text-red-600',
  }

  return (
    <Card className={cn(
      "border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden",
      colorStyles[color].split(' ')[0] // Extrae solo la clase del borde
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
          </div>
          <div className={cn(
            "p-3 rounded-2xl shadow-sm",
            colorStyles[color] // Aplica bg y text
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <span className={cn(
              "font-medium px-2 py-0.5 rounded-full",
              trend.isPositive 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-gray-400 ml-2">vs último turno</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}