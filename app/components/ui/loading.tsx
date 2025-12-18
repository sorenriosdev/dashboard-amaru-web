import { Loader2 } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export default function Loading({ size = 'md', text, fullScreen }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-blue-600', sizeClasses[size])} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return content
}

// Loading skeleton para tablas
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-lg border p-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 animate-pulse rounded bg-gray-200" style={{ width: '60%' }} />
            <div className="h-3 animate-pulse rounded bg-gray-200" style={{ width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// Loading skeleton para cards
export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="space-y-3">
        <div className="h-4 animate-pulse rounded bg-gray-200" style={{ width: '40%' }} />
        <div className="h-8 animate-pulse rounded bg-gray-200" style={{ width: '60%' }} />
        <div className="h-3 animate-pulse rounded bg-gray-200" style={{ width: '30%' }} />
      </div>
    </div>
  )
}