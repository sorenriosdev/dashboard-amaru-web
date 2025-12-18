// app/components/dashboard/StatCard.tsx
'use client'

import { LucideIcon } from 'lucide-react'
import { Card } from '@/app/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'orange' | 'purple'
  href?: string
  onClick?: () => void
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue',
  href,
  onClick 
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
  }

  const isInteractive = href || onClick

  const content = (
    <Card className={`p-6 transition-all duration-200 ${
      isInteractive 
        ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0' 
        : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <p className={`mt-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>

        <div className={`rounded-xl p-3 transition-colors duration-200 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )

  if (href) {
    return <a href={href} className="group block">{content}</a>
  }

  if (onClick) {
    return <button onClick={onClick} className="group block w-full text-left">{content}</button>
  }

  return content
}