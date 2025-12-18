// types/index.ts - Crear en la RAÍZ del proyecto
// User & Authentication
export type UserRole = 'admin' | 'medico' | 'personal'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  specialization?: string
  department?: string
}

// Attendance
export type AttendanceType = 'entrada' | 'refrigerio_inicio' | 'refrigerio_fin' | 'salida'
export type AttendanceStatus = 'not_started' | 'working' | 'break' | 'finished'

export interface AttendanceRecord {
  id: string
  userId: string
  type: AttendanceType
  timestamp: Date
  notes?: string
  location?: string
}

// Patients
export type PatientStatus = 'active' | 'inactive' | 'critical'

export interface Patient {
  id: string
  firstName: string
  lastName: string
  dni: string
  dateOfBirth: Date
  age: number
  gender: 'M' | 'F' | 'other'
  phone: string
  email?: string
  address: string
  currentDiagnosis?: string
  assignedDoctorId?: string
  status: PatientStatus
  createdAt: Date
  updatedAt: Date
}

// Appointments
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type AppointmentType = 'consulta' | 'control' | 'emergencia' | 'cirugia' | 'otro'

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: Date
  startTime: string
  endTime: string
  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string
  room?: string
}

// Dashboard Stats
export interface DashboardStats {
  todayPatients: number
  completedConsultations: number
  upcomingAppointments: number
  hoursWorked: number
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}