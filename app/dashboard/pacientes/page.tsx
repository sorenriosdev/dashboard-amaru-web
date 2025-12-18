'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import Button from '@/app/components/ui/button'
import { Search, Filter, Eye, FileText, Calendar } from 'lucide-react'

interface Patient {
  id: number
  name: string
  dni: string
  age: number
  lastVisit: string
  nextAppointment?: string
  diagnosis: string
  status: 'active' | 'inactive' | 'critical'
}

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | Patient['status']>('all')

  // Mock data - reemplazar con datos del backend
  const patients: Patient[] = [
    {
      id: 1,
      name: 'María García López',
      dni: '12345678',
      age: 45,
      lastVisit: '2024-12-15',
      nextAppointment: '2024-12-20',
      diagnosis: 'Hipertensión',
      status: 'active'
    },
    {
      id: 2,
      name: 'Juan Carlos Pérez',
      dni: '87654321',
      age: 62,
      lastVisit: '2024-12-14',
      diagnosis: 'Diabetes Tipo 2',
      status: 'active'
    },
    {
      id: 3,
      name: 'Ana María Torres',
      dni: '45678912',
      age: 38,
      lastVisit: '2024-12-10',
      nextAppointment: '2024-12-18',
      diagnosis: 'Control prenatal',
      status: 'active'
    },
  ]

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.dni.includes(searchTerm)
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    critical: 'bg-red-100 text-red-700'
  }

  const statusLabels = {
    active: 'Activo',
    inactive: 'Inactivo',
    critical: 'Crítico'
  }

  return (
    <div>
      <Header title="Mis Pacientes" breadcrumb="Pacientes" />
      
      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Total Pacientes</p>
                <p className="text-4xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Activos</p>
                <p className="text-4xl font-bold text-green-600">
                  {patients.filter(p => p.status === 'active').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Citas Pendientes</p>
                <p className="text-4xl font-bold text-blue-600">
                  {patients.filter(p => p.nextAppointment).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o DNI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 rounded-lg border pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | Patient['status'])}
                    className="h-10 rounded-lg border px-4 focus:border-blue-500 focus:outline-none"
                  >
                  <option value="all">Todos</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                  <option value="critical">Críticos</option>
                </select>
                
                <Button variant="outline" size="md">
                  <Filter className="h-4 w-4 mr-2" />
                  Más filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Pacientes</CardTitle>
              <Button variant="primary" size="sm">
                + Nuevo Paciente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Paciente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">DNI</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Edad</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Diagnóstico</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Última Visita</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Próxima Cita</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{patient.dni}</td>
                      <td className="py-4 px-4 text-gray-600">{patient.age}</td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{patient.diagnosis}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(patient.lastVisit).toLocaleDateString('es-PE')}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {patient.nextAppointment 
                          ? new Date(patient.nextAppointment).toLocaleDateString('es-PE')
                          : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                          {statusLabels[patient.status]}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Ver perfil">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Historia clínica">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Agendar cita">
                            <Calendar className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}